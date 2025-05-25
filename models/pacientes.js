const conexion = require("../conexion"); // Asegúrate que esta ruta sea correcta

module.exports = {
    pacientes(idNutricionista){
        return new Promise ((resolve, reject) =>{
            conexion.query('SELECT * FROM paciente WHERE nutricionistas_id = ?',
                [idNutricionista], (err, resultados) =>{ // ¡Importante: el orden del callback es (error, resultados)!
                    if (err) reject(err);
                    else resolve(resultados);
                }
            );
        });
    },
    pacienteId(idPaciente){
        return new Promise ((resolve, reject) =>{
            // Corrección: el callback es (err, resultados)
            // Y la consulta puede ser más específica para la patología
            conexion.query('SELECT paciente.*, patologia.nombre AS nombre_patologia FROM paciente JOIN patologia ON paciente.patologia_id = patologia.id WHERE paciente.id = ?',
                [idPaciente], (err, resultados) =>{ // ¡Ajustado: (err, resultados)!
                    if (err) reject(err);
                    else {
                        if (resultados.length === 0) {
                            return reject(new Error('Paciente no encontrado')); // Manejo de paciente no encontrado
                        }
                        resolve(resultados[0]); // Devuelve el primer (y único) resultado
                    }
                }
            );
        });
    },
};



/*const conexion = require("../conexion")

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

}*/