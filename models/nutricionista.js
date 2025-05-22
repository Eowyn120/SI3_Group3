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
    login(email){
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT id, password FROM nutricionistas WHERE email = ?`,
                [email], (err, resultados)=>{
                    if (err) reject(err);
                    else resolve(resultados);
                });
        })
    },
}