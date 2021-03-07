const express = require("express");
const app = express ();
// const HTTP_PORT = 8080;
const HTTP_PORT = process.argv[3];
const http = require ("http").createServer();
const Map = require('./src/test_js/map');
const Lista = require('./src/test_js/lista');
const Container = require('./src/test_js/container');
const Listamosse = require('./src/test_js/listamosse');
const net = require('net');
const SERVER_PORT = 1723;

const io = require("socket.io")(http, {
    cors: {
    //   origin: "http://localhost:4200",
        origin: `http://localhost:${process.argv[2]}`,
        methods: ["GET", "POST"]
    }
});

let map = new Map();
let mosse = new Listamosse();
let lista = new Lista();

//da modificare x, y, dir
let x = 0, y = 0, dir = 0;
let stopped = false;
/*
dir:
0 = su
1 = destra
2 = giu`
3 = sinistra
*/



let c = new Container();

  //-----------------------------CLIENT---------------------------------

var client = net.connect(SERVER_PORT, 'localhost', ()=>{
    console.log('connected to server');
    client.write("UNIT\n");
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
        switch(cmd[0]){
            case "ALIVE": 
                client.write(c.getDatiESvuota("POS," + x + "," + y + "," + dir)); 
                //io.emit("mappa", map.getMap());
                
                break;
            case "MAP":
                
                map.createMap(cmd[1], cmd[2], cmd[3]);
                //io.emit("mappa", map.getMap());
                
                break;
            case "PATH":
                mosse.createMosse(cmd[1]);
                console.log("PATH"+cmd[1]);
            
                break;
            case "STOP":
                if (cmd[1] == '0') {
                    stopped = true;
                } else {
                    for (let k = 0; k < cmd[1]; k++) {
                        mosse.aggiungiMossa('S');
                    }
                }
                break;
            case "START":
                stopped = false;
                break;
            case "LIST":
                for (let i = 0; i < cmd[1].length; i++) {
                    lista.addPOI(cmd[1][i]);
                }
                io.emit("lista", lista.getLista());
                /* io.on("connection", (socket) => {
                    socket.emit("lista", lista.getLista());
                }); */

                break;     
            default: 
                console.log("Unrecognized message from server");
        }
    }
    if (!stopped) {
        
        io.emit("frecce", mosse.getMossa());
        //io.emit("mappa", map.getMap());
        
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

function sendSth(){
    prompt.get(['first', 'last'], (err, res)=>{
        if (err) { return onErr(err); }
        client.write(res.first+" "+res.last+'\n');
    });    
}

function onErr(err) {
    console.log(err);
    return 1;
}


io.on("connection", (socket) => {
    socket.emit("pulsante");
    console.log("mostra il pulsante");
    // socket.emit("mappa", map.getMap());
    socket.emit("lista", lista.getLista());
    // console.log("connected someone");
    //}, 10000, socket);
    

    // socket.emit("frecce", "M");
    //socket.emit("mappa", map.getMap());
    socket.on("updateposition", (data) => {
        let pos = data.toString().split(",");
        x = pos[0];
        y = pos[1];
        dir = pos[2];
    });
    
    socket.on("mappa", () => {
        socket.emit("mappa", map.getMap());
    });
    socket.on("comeback", () => {
        c.aggiungiComando("PATH"); //PATH -> taskfinite -> gestito da server
        c.aggiungiComando("MAP");
    });
    //---guida manuale------
    socket.on("up", () => {
        console.log("up richiamato");
    });
    socket.on("down", () => {
        console.log("down richiamato");
    });
    socket.on("right", () => {
        console.log("right richiamato");
    });
    socket.on("left", () => {
        console.log("left richiamato");
    });
    socket.on("start", () => {
        console.log("start richiamato");
    });
    socket.on("stop", () => {
        console.log("stop richiamato");
    });
    socket.on("automatica", () => {
        console.log("automatica richiamato");
    });
    socket.on("manuale", () => {
        console.log("manuale richiamato");
    });
    
    //task
    socket.on("taskcompletata", () => {
        c.aggiungiComando("PATH");
        c.aggiungiComando("MAP"); 
    });


});

http.listen(HTTP_PORT, () => {
    console.log("server is listening" + HTTP_PORT);
})