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
            conexion.query('SELECT paciente.*, patologia.nombre AS nombre_patologia FROM paciente INNER JOIN patologia ON paciente.patologia_id = patologia.id WHERE nutricionistas_id = ?',
                [idNutricionista], (err, resultados) =>{ // ¡Importante: el orden del callback es (error, resultados)!
                    if (err) reject(err);
                    else resolve(resultados);
                }
            );
        });
    },
    pacienteId(id){
        return new Promise ((resolve, reject) =>{
            // Corrección: el callback es (err, resultados)
            // Y la consulta puede ser más específica para la patología
            conexion.query('SELECT paciente.*, patologia.nombre AS nombre_patologia FROM paciente INNER JOIN patologia ON paciente.patologia_id = patologia.id WHERE paciente.id = ?',
                [id], (err, resultados) =>{ // ¡Ajustado: (err, resultados)!
                    if (err) reject(err);
                    else {
                        resolve(resultados); 
                        console.log("llega aqui models");
                        
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
};
