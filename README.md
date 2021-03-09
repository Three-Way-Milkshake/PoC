# PoC
Proof of Concept - PORTACS

# Running
## Needed
- jdk >=14
- node >= 12.16.3
- npm >= 7.6
- angular gli >= 11.2.1
## Server
- cd in [server](./server) folder
- run `./gradlew run`

## Client
- For units: cd in [client](./client) folder
- for responsabile: cd in [responsabile](./responsabile) folder
-  need a separate window for each command


| instance | Node | Angular |
| --- |--- |---|
| **unit 1** | `node index.js 4201 8081 0 0` | `ng s --port 4201 -c dev1` |
| **unit 2** | `node index.js 4202 8082 4 0` | `ng s --port 4202 -c dev2` |
| **unit 2** | `node index.js 4203 8083 4 8` | `ng s --port 4203 -c dev3` |
| **responsabile** | `node index.js 4300 8090` | `ng s --port 4300` |
