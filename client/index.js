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
let lista = new Lista(); //dei POI

//da modificare x, y, dir
// let x = 0, y = 0, dir = 0;
let x = process.argv[4], y = process.argv[5], dir = 2;
let stopped = false;
let canCheckAuto = false;
let requestButton = false;

let manualDriving = false;
let manualStop = true; //false si muove
let manualDrivingList = new Listamosse();

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
             
                
                break;
            case "MAP":
                
                map.createMap(cmd[1], cmd[2], cmd[3]);
                
                break;
            case "PATH":
                canCheckAuto = true;
                mosse.createMosse(cmd[1]);
                console.log("PATH"+cmd[1]);
            
                break;
            case "STOP":
                console.log("Va bene sto fermo");
                if (cmd[1] == '0') {
                    stopped = true;
                } else {
                    for (let k = 0; k < parseInt(cmd[1]); k++) {
                        mosse.addMove('S');
                    }
                }
                break;
            case "START":
                stopped = false;
                break;
            case "LIST":
                for (let z = 0; z < cmd[1].length; z++) {
                    lista.addPOI(cmd[1][z]);
                }
                io.emit("lista", lista.getLista());

                break;     
            default: 
                console.log("Unrecognized message from server");
        }
    }
    //muovere il muletto in automatic driving
    if (!manualDriving && !stopped) {
        changePosition(mosse.getMove());
    }
    //task completata
    if (!manualDriving && mosse.isEmpty() && canCheckAuto) { // automatica
        io.emit("completedtaskbutton");
        canCheckAuto = false;
    } 
    if (manualDriving && map.getCell(x, y) == lista.getFirstPOI()){ //manuale
        io.emit("completedtaskbutton");
    }
    client.write(c.getDatiESvuota("POS," + x + "," + y + "," + dir)); 
    client.write('\n');
    
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
    
    //console.log("mostra il pulsante");
    // socket.emit("mappa", map.getMap());
    socket.emit("lista", lista.getLista());
    
    
    socket.on("updateposition", (data) => {
        let pos = data.toString().split(",");
        x = pos[0];
        y = pos[1];
        dir=({
            N: 0,
            E: 1,
            S: 2,
            O: 3,
        }) [pos[2]];
        console.log(dir);
    });
    
    socket.on("mappa", () => {
        socket.emit("mappa", map.getMap());
    });
    socket.on("start", () => {
        c.aggiungiComando("PATH"); //PATH -> taskfinite -> gestito da server
        //c.aggiungiComando("MAP");
    });
    //---guida manuale--
   socket.on("movement", (manualMove) => { // pressione tasti provenienti dalla guida manuale
        manualDrivingList.addMove(manualMove.toString().replace(/(\r\n|\n|\r)/gm, ""));
   });
    socket.on("manualStart", () => {
        manualStop = false;
        console.log("start richiamato");
    });
    socket.on("manualStop", () => {
        manualStop = true;
        console.log("stop richiamato");
    });
    socket.on("automatica", () => {
        manualDriving = false;
        manualDrivingList.deleteAllMoves();
        c.aggiungiComando("PATH");
        console.log("guida automatica richiamato");
    });
    socket.on("manuale", () => {
        manualDriving = true;
        manualStop = true;
        console.log("guida manuale richiamato");
    });
    
    //task
    socket.on("taskcompletata", () => {
        lista.removeFirstPOI();
        io.emit("lista", lista.getLista());
        c.aggiungiComando("PATH");
        c.aggiungiComando("MAP"); 
    });


});

http.listen(HTTP_PORT, () => {
    console.log("server is listening" + HTTP_PORT);
})

function changePosition(mossa){
    switch(mossa) {
      case "R":
        if      (dir == 0) dir = 1;
        else if (dir == 3) dir = 0;
        else if (dir == 2) dir = 3;
        else if (dir == 1) dir = 2;
        

        break;
        case "L":
          if      (dir == 0) dir = 3;
          else if (dir == 3) dir = 2;
          else if (dir == 2) dir = 1;
          else if (dir == 1) dir = 0;
          
          break;
        case "T":
          if      (dir == 0) dir = 2;
          else if (dir == 3) dir = 1;
          else if (dir == 2) dir = 0;
          else if (dir == 1) dir = 3;
          
          break;
        case "S":
          //fermo non fa niente
          break;
        case "M":
          if        (dir == 0) {
            y--;
          } else if (dir == 2) {
            y++;
          } else if (dir == 1) {
            x++;
          } else if (dir == 3) {
            x--;
          }
          break;
    }
    io.emit("updatemap", x+","+y+","+dir);
    io.emit("arrows", mossa);
}

setInterval(() => {
    if (manualDriving) {
        let tempMove = manualDrivingList.getLastInsertMove();
        manualDrivingList.deleteAllMoves();
        if (!manualStop) {
            changePosition(tempMove === undefined ? "M" : tempMove);
        }
    }
}, 1000);