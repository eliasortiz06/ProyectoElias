var users = require("./users.json");
var coleccion = require("./coleccion.json");

function validateUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    return user || null; 
}

function getColeccion(){
    return coleccion;
}

module.exports = {
    validateUser,
    getColeccion
}