// server
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");


const server = express();
server.use(cors());
server.use(express.json());
const port = 4000; 



async function getDB() {
    const conex = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Diany3101',
      database: 'dogs_db',
    });
    conex.connect();
    return conex;
}

server.listen(port, () => {
    console.log(`El servidor se esta ejecutando en el puerto ${port}`);
  });


server.get('/dogs', async(req, res) => {
    const conexDataBase = await getDB();

    const dogsSQL = "select * from dogs";

    const [result] = await conexDataBase.query(dogsSQL);

    res.json({result});
})

server.post('/dogs', async(req, res) =>{

    const data = req.body;

    const {nombreMascota, razaMascota, edadMascota, sexoMascota, descripcionMascota} = data;

    const conexDataBase = await getDB();

    const sql  = "insert intro dogs (nameDog, raceDog, ageDog, genderDog, descriptionDog) values (?, ?, ?, ?, ?)";

    const [result] = await conexDataBase.query(sql, [ nombreMascota, razaMascota, edadMascota, sexoMascota, descripcionMascota
    ]);

    res.json({result});

})