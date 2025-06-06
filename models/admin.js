const conexion = require("../conexion")

module.exports = {
    login(user){
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT id, password FROM admin WHERE user = ?`,
                [user], (err, resultados)=>{
                    if (err) reject(err);
                    else resolve(resultados);
                });
        })
    },
    obtenerPatologia(){
        return new Promise((resolve, reject)=>{
            conexion.query('SELECT * FROM patologia', (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        })
    },
    obtenerPatologiaId(id){
        return new Promise((resolve, reject)=>{
            conexion.query('SELECT * FROM patologia WHERE id = ?',
                [id], (err, resultados)=>{
                    if (err) reject(err);
                    else resolve(resultados);
                });
        })
    },
    insertarPatologia(nombre){
        return new Promise((resolve, reject)=>{
            conexion.query('INSERT INTO patologia (nombre) VALUES (?)',
                [nombre], (err, resultados)=>{
                    if (err) reject(err);
                    else resolve(resultados);
                })
        })
    },
    editarPatologia(id, nombre){
        return new Promise((resolve, reject)=>{
            conexion.query('UPDATE patologia SET nombre = ? WHERE id = ?', 
                [nombre, id], (err, resultados)=>{
                   if (err) reject(err);
                   else resolve(resultados); 
                });
        })
    },
    eliminarPatologia(id){
        return new Promise((resolve, reject)=>{
            conexion.query('DELETE FROM patologia WHERE id = ?',
                [id], (err, resultados)=>{
                    if(err) reject(err);
                    else resolve(resultados);
                })
        })
    },
    obtenerImc(){
        return new Promise ((resolve, reject)=>{
            conexion.query('SELECT * FROM imc', (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        })
    },
    obtenerImcId(id){
        return new Promise ((resolve, reject)=>{
            conexion.query('SELECT * from imc WHERE id = ?',
                [id], (err, resultados)=>{
                    if (err) reject(err);
                    else resolve(resultados);
                });
        })
    },
    insertarImc(status, min, max){
        return new Promise((resolve, reject)=>{
            conexion.query('INSERT INTO imc (status, min, max) VALUES (?, ?, ?)',
                [status, min, max], (err, resultados)=>{
                    if (err) reject(err);
                    else resolve(resultados);
                })
        })
    },
    editarImc(id, status, min, max){
        return new Promise((resolve, reject)=>{
            conexion.query('UPDATE imc SET status = ?, min = ?, max = ? WHERE id = ?', 
                [status, min, max, id], (err, resultados)=>{
                   if (err) reject(err);
                   else resolve(resultados); 
                });
        })
    },
    eliminarImc(id){
        return new Promise((resolve, reject)=>{
            conexion.query('DELETE FROM imc WHERE id = ?',
                [id], (err, resultados)=>{
                    if(err) reject(err);
                    else resolve(resultados);
                })
        })
    },
    obtenerCondicion(){
        return new Promise ((resolve, reject)=>{
            conexion.query('SELECT * FROM condicion', (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        })
    },
    obtenerCondicionId(id){
        return new Promise ((resolve, reject)=>{
            conexion.query('SELECT * FROM condicion WHERE id = ?', 
                [id], (err, resultados)=>{
                    if (err) reject(err);
                    else resolve(resultados);
                });
        })
    },
    insertarCondicion(nombre, multiplicador){
        return new Promise((resolve, reject)=>{
            conexion.query('INSERT INTO condicion (nombre, multiplicador) VALUES (?, ?)',
                [nombre, multiplicador], (err, resultados)=>{
                    if (err) reject(err);
                    else resolve(resultados);
                })
        })
    },
    editarCondicion(id, nombre, multiplicador){
        return new Promise((resolve, reject)=>{
            conexion.query('UPDATE condicion SET nombre = ?, multiplicador = ? WHERE id = ?', 
                [nombre, multiplicador, id], (err, resultados)=>{
                   if (err) reject(err);
                   else resolve(resultados); 
                });
        })
    },
    eliminarCondicion(id){
        return new Promise((resolve, reject)=>{
            conexion.query('DELETE FROM condicion WHERE id = ?',
                [id], (err, resultados)=>{
                    if(err) reject(err);
                    else resolve(resultados);
                })
        })
    },
    obtenerNutricionista(){
        return new Promise ((resolve, reject)=>{
            conexion.query('SELECT * FROM nutricionistas', (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        })
    },
    
}