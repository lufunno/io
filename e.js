const Pool = require("pg").Pool;
require('dotenv').config();
const client = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5432,
    database:  process.env.DB_DATABASE
});

client.connect();
console.log("connected succesfully");
//return ("connected succesfully");

function createTable(){
    client.query((`CREATE TABLE IF NOT EXISTS Visitors(
        ID SERIAL,
        Name varchar(50),
        Age int,
        dateofvisit DATE,
        timeOfVisit TIME,
        assistedBy varchar(50),
        comments varchar(100)
    )`), (err, res) =>{
        if(err){
            throw err;
        }
        console.table(res.rows);
    // return (res.rows);
        client.end();
    })
}

 createTable();

function    addNewVisitor(fullname, Age, dateOfVisit, timeOfVisit, assistedBy, comments){
    client.query(`INSERT INTO Visitors(Name, Age, dateOfVisit, timeOfVisit, assistedBy, comments)
    VALUES($1,$2,$3,$4,$5,$6);`,[fullname, Age, dateOfVisit, timeOfVisit, assistedBy, comments], 
    (err, res) => {
        if(err){
            throw err;
        }
         console.table(`Data Inserted Into Visitors Table` + '\n'+ res.rowCount);
        // return (`Data Inserted Into Visitors Table` +  + '\n'+ res.rowCount)
    });
}

 addNewVisitor('shawn carter', 25, '2020-09-10', '16:01', 'thembi khwanazi', 'Services');
 addNewVisitor('Lufuno mbedzi', 21, '2021-09-10', '16:01', 'johan carter', 'awesome');

function listAllVisitors(input){
    client.query(input, (err, res) =>{
        if(err){
            throw err;
        }

       // console.table(res.rows);
       return (res.rows);
    })
}

 listAllVisitors('SELECT Name, ID FROM Visitors;');

function    deleteAVisitor(fullname){
    client.query(`DELETE FROM Visitors WHERE Name = $1;`,[fullname] ,(err, res) => {
        if(err){
            throw err;
        }
       // console.log('deleted successfully' + res.rowCount);
       return ('deleted successfully' + res.rowCount);
    })
}

 //deleteAVisitor('shawn carter');

function updateVisitor(id, newValue, column){
    client.query(`UPDATE Visitors SET ${column} = $1 WHERE ID = $2`, [newValue, id], (err, res) => {
        if(err){
            throw err;
        }
      //  console.log('data updated successfully', res.rowCount);
      return ('data updated successfully', res.rowCount)
    });
}

// updateVisitor(1, '12:32', 'timeOfVisit');

function    viewVisitor(id){
    client.query(`SELECT * FROM Visitors WHERE ID = $1`, [id], (err, res) => {
        if(err){
            throw err;
        }
     //   console.table(res.rows);
     return(res.rows);
    });
}
 //viewVisitor(1);

function    deleteAllVisitors(){
    client.query(`DELETE FROM Visitors`, (err, res) => {
        if(err){
            throw err;
        }
        //console.log('Table cleared successfully', res.rows);
        return ('Table cleared successfully', res.rows)
    })
}

// deleteAllVisitors();

function lastVisitor(input){
    client.query(input, (err, res) =>{
        if(err){
            throw err;
        }
       // console.table(res.rows);
       return (res.rows);
    })
}


lastVisitor(`SELECT MAX( ID ) FROM Visitors;`)

module.exports = { addNewVisitor, updateVisitor, deleteAVisitor, deleteAllVisitors, viewVisitor, listAllVisitors };
