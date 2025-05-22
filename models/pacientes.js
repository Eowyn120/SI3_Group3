const conexion = require("../conexion")

module.exports = {
    pacientes(idNutricionista){
        return new Promise ((resolve, reject) =>{
            conexion.query('SELECT * FROM paciente WHERE nutricionistas_id = ?',
                [idNutricionista], (resultados, err) =>{
                    if (err) reject(err)
                    else resolve(resultados)
                }
            )
        })
    },
    pacienteId(idPaciente){
        return new Promise ((resolve, reject) =>{
            conexion.query('SELECT paciente.*,patologia.* FROM paciente,patologia WHERE id =?, patologia.id = paciente.patologia_id',
                [idPaciente], (resultados, err) =>{
                    if (err) reject(err)
                    else resolve(resultados)
                }
            )
        })
    },

}