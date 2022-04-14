const Pool = require("pg").Pool;
const pool = new Pool({
  user: "node",
  host: "localhost",
  database: "db",
  password: "pass",
  port: 5432
});

pool.connect(function(err) {
  if (err) console.log(err + "Ooops");
  else console.log("SERVER CONNECTED!");
});

const createTable = () => {
    pool.query( 'CREATE TABLE Visitors ( id SERIAL PRIMARY KEY, name VARCHAR(50), age INT, date  DATE, time TIME, assistor VARCHAR(50), comments VARCHAR(100))', (error, respond) => {
        console.log(error, respond);
    });
}

const addNewVisitor = (data) =>{
    pool.query(`INSERT INTO Visitors(name, age, date, time, assistor, comments) VALUES ($1, $2, $3, $4, $5, $6)`,
    [data.name, data.age, data.date, data.time, data.assistor, data.comments],
    (error, respond) => {
        console.log(error, respond);
    });
}

const listAllVisitors = () => {
    pool.query( "SELECT DISTINCT ID, Name FROM Visitors", (error, respond) => {
        console.log(error, respond);
    });
}

const deleteVisitor = (id) => {
    pool.query( `DELETE FROM Visitors WHERE id = ${id}`, (error, respond) => {
        console.log(error, respond);
    });
}

const updateVisitor = (data) => {
    pool.query('UPDATE Visitors SET name=($1), age=($2), date=($3), time=($4), assistor=($5), comments=($6) WHERE id=($7)',
    [data.name, data.age, data.date, data.time, data.assistant, data.comments, data.id],
    (error, results) =>{
    console.log(error, results);
  });
}

const viewVisitor = (id) => {
    pool.query(`SELECT * FROM Visitors WHERE id = ${id}`, (error, respond) => {
        console.log(error, respond);
      });
}

const deleteAllVisitors = () => {
    pool.query('DELETE FROM Visitors ', (error, respond) => {
      console.log(error, respond);
    });
  };
