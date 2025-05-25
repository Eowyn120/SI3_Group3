require('dotenv').config(); // Permite cargar variables de entorno desde un archivo .env
const mysql = require('mysql'); // ¡Importante! Usamos el paquete 'mysql', no 'mysql2'

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",    // El host de tu base de datos (XAMPP usa localhost)
    user: process.env.DB_USER || "root",       // El usuario de MySQL (por defecto en XAMPP es root)
    password: process.env.DB_PASSWORD || "", // La contraseña de MySQL (por defecto en XAMPP es vacía)
    database: process.env.DB_NAME || "nutricode", // El nombre de tu base de datos
    connectionLimit: 10                          // Límite de conexiones simultáneas al pool
});

module.exports = pool; // Exportamos el pool de conexiones directamente


/*require ('dotenv').config();
const mysql = require ('mysql');

module.exports = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "nutricode"
});*/