const conexion = require("../conexion")

module.exports = {
    obtenerImc(){
        return new Promise ((resolve, reject) =>{
            conexion.query('SELECT imc.id AS id_imc, imc.status AS status_imc, imc.min, imc.max FROM imc', 
            (err, resultados) =>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
}