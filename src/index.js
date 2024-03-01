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

server.post('/adddogs', async(req, res) =>{

    const data = req.body;

    const {nameDog, raceDog, ageDog, genderDog, descriptionDog} = data;

    const conexDataBase = await getDB();

    const sql  = 'INSERT INTO dogs (nameDog, raceDog, ageDog, genderDog, descriptionDog) values (?, ?, ?, ?, ?)';

    const [result] = await conexDataBase.query(sql, [ nameDog, raceDog, ageDog, genderDog, descriptionDog
    ]);

    res.json({seccess: true, message: 'New Dogs'});

})

server.put('/dogs', async(req, res) =>{
    const conexDataBase = await getDB();

    const idDogs = req.body;
    const id = req.params.id;
    const {nameDog, raceDog, ageDog, genderDog, descriptionDog} = idDogs;

    let sql = 'UPDATE dogs set nameDog = ?, raceDog = ?,  ageDog = ?, genderDog = ?, descriptionDog = ? WHERE  id = ?';

    const [result] = await conexDataBase.query(sql, [
        nameDog, raceDog, ageDog, genderDog, descriptionDog
    ]);

    conexDataBase.end();
    res.json({seccess: true, message: 'New We have updated our list of puppies'});
})

server.delete ('/dogs', async(req, res) =>{
    const conexDataBase = await getDB();
    const id = req.query.id;
    const sql = 'DELETE FROM dogs WHERE id = ?';
    const [result] = await conexDataBase.query(sql, [id]);

    res.json({result});
})