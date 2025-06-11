const conexion = require("../conexion")

module.exports = {
    obtenerSeguimiento(idPaciente) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT 
                    seguimiento.fecha, 
                    seguimiento.motivo, 
                    seguimiento.peso, 
                    seguimiento.talla, 
                    seguimiento.imc, 
                    seguimiento.req_calorico,  -- Añadi eto
                    imc.status, 
                    resultado.prescripcion 
                FROM seguimiento 
                INNER JOIN paciente ON seguimiento.paciente_id = paciente.id 
                INNER JOIN imc ON imc.id = seguimiento.imc_id 
                LEFT JOIN resultado ON resultado.seguimiento_id = seguimiento.id -- eto lo dijo gemini(Usar LEFT JOIN en caso de que no haya resultado todavía)
                WHERE seguimiento.paciente_id = ?
                ORDER BY seguimiento.fecha DESC`, // Ordena por fecha descendente
                [idPaciente], (err, resultados) => {
                    if (err) reject(err);
                    else {
                        // Formatear la fecha a 'YYYY-MM-DD' para EJS
                        const resultadosFormateados = resultados.map(r => ({
                            ...r,
                            fecha: r.fecha ? new Date(r.fecha).toISOString().slice(0, 10) : null // Formatear fecha si existe
                        }));
                        resolve(resultadosFormateados);
                    }
                }
            );
        });
    },
    // ... (Mantén las otras funciones como seguimientoId, agregarSeguimiento, etc.)
    seguimientoId(id){
        return new Promise ((resolve, reject)=>{
            conexion.query('SELECT seguimiento.*, imc.status, condicion.nombre, resultado.prescripcion, resultado.plan_nutricional, resultado.recomendaciones, proteinas.cal_proteicas, proteinas.gramaje AS gramajeProteinas, proteinas.racion AS racionProteinas, lipidos.cal_lipidos, lipidos.gramaje AS gramajeLipidos, lipidos.racion AS racionLipidos, carbohidratos.cal_carbohidratos, carbohidratos.gramaje AS gramajeCarbohidratos, carbohidratos.racion AS racionCarbohidratos FROM seguimiento INNER JOIN imc ON seguimiento.imc_id = imc.id INNER JOIN condicion ON seguimiento.condicion_id = condicion.id INNER JOIN resultado ON resultado.seguimiento_id = seguimiento.id INNER JOIN proteinas ON seguimiento.id = proteinas.seguimiento_id INNER JOIN lipidos ON seguimiento.id = lipidos.seguimiento_id INNER JOIN carbohidratos ON seguimiento.id = carbohidratos.seguimiento_id WHERE seguimiento.id = ?',
                [id], (err, resultados) =>{
                    if (err) reject(err);
                    else resolve(resultados);
                }
            )
        })
    },
    //INGRESA LOS DATOS DE LAS 5 TABLAS RELACIONADAS (SEGUIMIENTO, CARBOHIDRATOS, LIPIDOS, PROTEINAS Y RESULTADO) 
    agregarSeguimiento(fecha, motivo, peso, talla, imc, req_calorico, paciente_id, imc_id, condicion_id, cal_l, gram_l, rac_l, cal_p, gram_p, rac_p, cal_ch, gram_ch, rac_ch, prescripcion, plan_nutricional, recomendaciones){
        return new Promise ((resolve, reject) =>{
            conexion.query('INSERT INTO seguimiento (fecha, motivo, peso, talla, imc, req_calorico, paciente_id, imc_id, condicion_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [fecha, motivo, peso, talla, imc, req_calorico, paciente_id, imc_id, condicion_id], (err, resultados)=>{
                    if (err) reject(err);
                    else {
                        console.log(resultados.insertId);
                        IdSeguimiento = resultados.insertId;
                        conexion.query('INSERT INTO carbohidratos (cal_carbohidratos, gramaje, racion, seguimiento_id) VALUES (?, ?, ?, ?)',
                            [cal_ch, gram_ch, rac_ch, IdSeguimiento], (err, resultados)=>{
                                if (err) reject(err);
                                else{
                                    console.log('LLEGA A CARBOHIDRATOS');                         
                                    conexion.query('INSERT INTO proteinas (cal_proteicas, gramaje, racion, seguimiento_id) VALUES (?, ?, ?, ?)',
                                        [cal_p, gram_p, rac_p, IdSeguimiento], (err, resultados)=>{
                                            if (err) reject(err);
                                            else{
                                                console.log('LLEGA A PROTEINAS');                         
                                                conexion.query('INSERT INTO lipidos (cal_lipidos, gramaje, racion, seguimiento_id) VALUES (?, ?, ?, ?)',
                                                    [cal_l, gram_l, rac_l, IdSeguimiento], (err, resultados)=>{
                                                        if (err) reject(err);
                                                        else{
                                                            console.log('LLEGA A LIPIDOS');
                                                            conexion.query('INSERT INTO resultado (prescripcion, plan_nutricional, recomendaciones, seguimiento_id) VALUES (?, ?, ?, ?)',
                                                                [prescripcion, plan_nutricional, recomendaciones, IdSeguimiento], (err, resultados)=>{
                                                                    if(err) reject(err);
                                                                    else {
                                                                        console.log('LLEGA A RESULTADOS');
                                                                        resolve(resultados);
                                                                    }
                                                                }
                                                            )
                                                        }
                                                    }
                                                )
                                            }
                                        }
                                    )
                                }
                            }
                        )             
                    }
                }
            )
        })
    },
}
