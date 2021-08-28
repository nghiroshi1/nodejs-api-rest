const mariadb = require('mariadb');

const pool = mariadb.createPool({
     host: 'localhost', 
     //port: 3306,
     user:'root', 
     password: 'root',
     connectionLimit: 2,
     database:'agenda-petshop'
});

module.exports = pool