// import dependencie
const sqlite3 = require("sqlite3").verbose();

// Creat db object
const db = new sqlite3.Database("./src/database/database.db");

db.serialize(() => {
  //create table
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)
  
  // //insert data
  // const query = `
  //   INSERT INTO places(
  //     image,
  //     name, 
  //     address,
  //     address2,
  //     state,
  //     city,
  //     items
  //   ) VALUES(?,?,?,?,?,?,?);
  // `;

  // const values = [
  //   "https://images.unsplash.com/photo-1542739674-b449a8938b59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
  //   "Paper",
  //   "Guilherme Gembala, Jardim America",
  //   "Numero 260",
  //   "Santa Catarina",
  //   "Rio Do Sul",
  //   "Residuos eletronicos, lampadas"
  // ];

  // function afterInsertData(err) {
  //   if(err) {
  //     return console.log(err);
  //   } 

  //   console.log("Cadastrado com sucesso");
  //   console.log(this);
  // }
  
  // db.run(query, values, afterInsertData);

  // fetch data
  // db.all(`SELECT * FROM places`, function(err, rows){
  //   if(err) {
  //     return console.log(err);
  //   } 
  //   console.log("Here are the registers");
  //   console.log(rows);
  // })

  //delete data
  // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
  //   if(err) {
  //     return console.log(err);
  //   } 
  //   console.log("Registry deleted");  
  // });
});

module.exports = db;