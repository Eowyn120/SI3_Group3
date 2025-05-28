const conexion = require("../conexion"); // Asegúrate que esta ruta sea correcta

module.exports = {
    obtenerPatologia(){
        return new Promise((resolve, reject)=>{
            conexion.query('SELECT * FROM patologia', (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        })
    },
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
            conexion.query('SELECT paciente.*, patologia.nombre AS nombre_patologia FROM paciente INNER JOIN patologia ON paciente.patologia_id = patologia.id WHERE paciente.id = ?',
                [idPaciente], (err, resultados) =>{ // ¡Ajustado: (err, resultados)!
                    if (err) reject(err);
                    else {
                        resolve(resultados); 
                    }
                }
            );
        });
    },
    agregarPaciente(nombres, apellidos, cedula, edad, fecha_nacimiento, telefono, email, direccion, sexo, ant_familiares, alergias, ant_personales, ant_psicologicos, patologia_id, nutricionistas_id){
        return new Promise ((resolve, reject)=>{
            conexion.query('INSERT INTO paciente (nombres, apellidos, cedula, edad, fecha_de_nacimiento, telefono, correo, direccion, condicion, ant_familiares, alergias, ant_personales, ant_psicologicos, patologia_id, nutricionistas_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [nombres, apellidos, cedula, edad, fecha_nacimiento, telefono, email, direccion, sexo, ant_familiares, alergias, ant_personales, ant_psicologicos, patologia_id, nutricionistas_id], (err, resultados) =>{
                    if (err) reject(err);
                    else resolve(resultados);
                }
            )
        })
    },
    editarPaciente(nombres, apellidos, cedula, edad, fecha_nacimiento, telefono, email, direccion, sexo, ant_familiares, alergias, ant_personales, ant_psicologicos, id){
        return new Promise ((resolve, reject)=>{
            conexion.query('UPDATE paciente SET nombres = ?, apellidos = ?, cedula = ?, edad = ?, fecha_de_nacimiento = ?, telefono = ?, correo = ?, direccion = ?, condicion = ?, ant_familiares = ?, alergias = ?, ant_personales = ?, ant_psicologicos = ? WHERE id = ?', 
                [nombres, apellidos, cedula, edad, fecha_nacimiento, telefono, email, direccion, sexo, ant_familiares, alergias, ant_personales, ant_psicologicos, id], (err, resultados)=>{
                    if (err) reject(err);
                    else resolve(resultados);
            })
        })
    },
    antecendentes(){
        return new Promise ((resolve, reject) =>{
            conexion.query('SELECT condicion.id AS id_condicion, condicion.nombre AS nombre_condicion FROM condicion UNION SELECT patologia.id AS id_patologia, patologia.nombre AS nombre_patologia FROM patologia UNION SELECT imc.id AS id_imc, imc.status AS status_imc', 
            (err, resultados) =>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    seguimiento(id_paciente){
        return new Promise ((resolve, reject)=>{
            conexion.query('SELECT seguimiento.*, imc.status, condicion.nombre FROM seguimiento INNER JOIN imc ON seguimiento.imc_id = imc.id INNER JOIN condicion ON seguimiento.condicion_id = condicion.id WHERE seguimiento.paciente_id = ?',
                [id_paciente], (err, resultados)=>{
                    if (err) reject(err);
                    else resolve(resultados);
                })
        })
    },
    seguimientoId(id){
        return new Promise ((resolve, reject)=>{
            conexion.query('SELECT seguimiento.*, imc.status, condicion.nombre FROM seguimiento INNER JOIN imc ON seguimiento.imc_id = imc.id INNER JOIN condicion ON seguimiento.condicion_id = condicion.id WHERE seguimiento.id = ?',
                [id], (err, resultados) =>{
                    if (err) reject(err);
                    else resolve(resultados);
                }
            )
        })
    },
    agregarSeguimiento(peso, talla, imc, req_calorico, paciente_id, imc_id, condicion_id){
        return new Promise ((resolve, reject) =>{
            conexion.query('INSERT INTO seguimiento (peso, talla, imc, req_calorico, paciente_id, imc_id, condicion_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [peso, talla, imc, req_calorico, paciente_id, imc_id, condicion_id], (err, resultados)=>{
                    if (err) reject(err);
                    else resolve(resultados);
                }
            )
        })
    },

};
