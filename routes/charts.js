// routes/charts.js
const express = require('express');
const router = express.Router();
const pool = require('../conexion'); // Asegúrate de que la ruta sea correcta a tu archivo conexion.js

// Función auxiliar para asegurar que la respuesta siempre sea un array
const ensureArray = (data) => {
    if (Array.isArray(data)) {
        return data;
    }
    // Si no es un array (ej. es un objeto individual), lo envolvemos en uno.
    return [data];
};


// Ruta para obtener pacientes agrupados por edad
// --- Ruta para datos de edad ---
router.get('/data/pacientes-por-edad', async (req, res) => {
    try {
        const rows = await pool.query( // SIN desestructuración []
            'SELECT edad, COUNT(*) AS total FROM paciente GROUP BY edad ORDER BY edad ASC'
        );
        console.log('Datos de edad obtenidos del MySQL (AHORA SÍ):', rows); // Para verificar
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener datos de edad:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// --- Ruta para datos de sexo ---
router.get('/data/pacientes-por-sexo', async (req, res) => {
    try {
        const rows = await pool.query( // SIN desestructuración []
            'SELECT condicion AS sexo, COUNT(*) AS total FROM paciente GROUP BY condicion'
        );
        console.log('Datos de sexo obtenidos del MySQL (AHORA SÍ):', rows); // Para verificar
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener datos de sexo:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// --- Ruta para datos de patología ---
router.get('/data/pacientes-por-patologia', async (req, res) => {
    try {
        const rows = await pool.query( // SIN desestructuración []
            `SELECT p.nombre AS patologia, COUNT(pa.id) AS total
            FROM paciente pa
            JOIN patologia p ON pa.patologia_id = p.id
            GROUP BY p.nombre
            ORDER BY total DESC
        `);
        console.log('Datos de patología obtenidos del MySQL (AHORA SÍ):', rows); // Para verificar
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener datos de patología:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// --- Ruta para Total de Consultas por Sexo ---
router.get('/consultas-por-sexo', async (req, res) => {
    try {
        const rows = await pool.query(`
            SELECT
                p.condicion AS sexo,
                COUNT(s.id) AS total_consultas
            FROM
                seguimiento s
            JOIN
                paciente p ON s.paciente_id = p.id
            GROUP BY
                p.condicion
            ORDER BY
                p.condicion;
        `);
        console.log('Datos de consultas por sexo:', rows);
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener datos de consultas por sexo:', err);
        res.status(500).json({ error: 'Error interno del servidor', message: err.sqlMessage || 'Error desconocido' });
    }
});

// --- Ruta para Total de Consultas por IMC Status ---
router.get('/consultas-por-imc', async (req, res) => {
    try {
        const rows = await pool.query(`
            SELECT
                i.status AS estado_imc,
                COUNT(s.id) AS total_consultas
            FROM
                seguimiento s
            JOIN
                imc i ON s.imc_id = i.id
            GROUP BY
                i.status
            ORDER BY
                total_consultas DESC;
        `);
        console.log('Datos de consultas por IMC:', rows);
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener datos de consultas por IMC:', err);
        res.status(500).json({ error: 'Error interno del servidor', message: err.sqlMessage || 'Error desconocido' });
    }
});


// --- Ruta para Total de Pacientes vs. Total de Consultas ---
router.get('/pacientes-y-consultas-totales', async (req, res) => {
    try {
        // Consulta para el total de pacientes
        const totalPacientesResult = await pool.query('SELECT COUNT(*) AS total_pacientes FROM paciente');
        const totalPacientes = totalPacientesResult[0].total_pacientes; // Accedemos al primer elemento del array y luego a la propiedad

        // Consulta para el total de consultas
        const totalConsultasResult = await pool.query('SELECT COUNT(*) AS total_consultas FROM seguimiento');
        const totalConsultas = totalConsultasResult[0].total_consultas; // Accedemos al primer elemento del array y luego a la propiedad

        // Enviamos ambos datos como un objeto JSON
        res.json({ total_pacientes: totalPacientes, total_consultas: totalConsultas });
    } catch (err) {
        console.error('Error al obtener el total de pacientes y consultas:', err);
        res.status(500).json({ error: 'Error interno del servidor', message: err.sqlMessage || 'Error desconocido' });
    }
});


module.exports = router;