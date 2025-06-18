const conexion = require("../conexion")

module.exports = {
    registrar(nombre, apellido, email, password, preg_seg, resp_seg) {
        return new Promise((resolve, reject) => {
            conexion.query(`INSERT INTO nutricionistas (nombres, apellidos, email, password, preg_seg, resp_seg) VALUES (?, ?, ?, ?, ?, ?)`,
                [nombre, apellido, email, password, preg_seg, resp_seg], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },
    login(email) { // El parámetro es 'email' porque así lo buscas en la consulta
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT id, nombres, password FROM nutricionistas WHERE email = ?`, // <-- ¡Añadimos 'nombres' aquí!
                [email], (err, resultados) => {
                    if (err) {
                        console.error("Error en la consulta de login:", err); // Añade un log para depuración
                        reject(err);
                    } else {
                        resolve(resultados);
                    }
                });
        });
    },
}