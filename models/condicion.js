const conexion = require("../conexion")

module.exports = {
    obtenerCondicion(){
        return new Promise ((resolve, reject) =>{
            conexion.query('SELECT condicion.id AS id_condicion, condicion.nombre AS nombre_condicion, condicion.multiplicador FROM condicion', 
            (err, resultados) =>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
}