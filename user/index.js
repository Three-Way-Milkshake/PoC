const express = require("express");
const app = express ();
const HTTP_PORT = 8090;
const http = require ("http").createServer();
const Map = require('./js/map');
const UserInformation = require('./js/user-information');
const POIlist = require('./js/POIlist')
const net = require('net');
const SERVER_PORT = 1723;

const io = require("socket.io")(http, {
    cors: {
      origin: `http://localhost:${process.argv[2]}`,
      methods: ["GET", "POST"]
    }
});

let user = new UserInformation();
let map = new Map();
let poil = new POIlist();
let x = [];
let y = [];
let dir = [];
/*
dir:
0 = su
1 = destra
2 = giu`
3 = sinistra
*/
  //-----------------------------CLIENT---------------------------------

var client = net.connect(SERVER_PORT, 'localhost', ()=>{
    console.log('connected to server');
    client.write("RESP\n");
    client.setNoDelay();
});
client.setEncoding('utf8');
client.on('error', ()=>{
    console.log("Something went wrong with the server. Quitting.");
})

client.on('data', (data)=>{
    data = data.toString().replace(/(\r\n|\n|\r)/gm, "");
    let msg=data.toString().split(";");
    for (let i = 0; i < msg.length; i++) {
        let cmd = msg[i].split(",");
        console.log(cmd);
        switch(cmd[0]){
            case "MAP":
                
                map.createMap(cmd[1], cmd[2], cmd[3]);
                io.emit("mappa", map.getMap());
                
                break;
            case "UNI":
                let mul = "";
                for (let k = 1; k < cmd.length; k++) {
                    mul += cmd[k] + (cmd.length - k <= 1? "" : ",");
                }
                io.emit("unit", mul);
                break;
            

            default: 
                console.log("Unrecognized message from server");
        }
    }
    client.write('\n', ()=>{
        console.log("response sent");
    });
});



//-----------------------------ANGULAR---------------------------------
 
client.on('end', ()=>{ 
    console.log('disconnected from server');
});

client.on('close', ()=>{
    console.log('Socket is fully closed now.');
})

function onErr(err) {
    console.log(err);
    return 1;
}


io.on("connection", (socket) => {

    socket.on("newuserinformation", (data) => {
        console.log(data);
        let userInfo = data.toString().split(',');
        user.setInfo(userInfo[0], userInfo[1], userInfo[2]);
        socket.emit("userinformation", user.getInformation());
    });
    socket.on("getinfoaccount", () => {
        socket.emit("userinformation", user.getInformation());
    });
    socket.on("mappa", () => {
        socket.emit("mappa", map.getMap());
    });
    socket.on("poilist", () => {
        socket.emit("poilist", poil.getListString());
    })
    socket.emit("poilist", poil.getListString());
    
});

http.listen(HTTP_PORT, () => {
    console.log("server is listening" + HTTP_PORT);
})