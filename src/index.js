// server
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");


const server = express();
server.use(cors());
server.use(express.json());
const port = 4000; 



async function getDB() {
    const dataBase = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Diany3101',
      database: 'dogs',
    });
    await dataBase.connect();
    return dataBase;
}

server.listen(port, () => {
    console.log(`El servidor se esta ejecutando en el puerto ${port}`);
  });