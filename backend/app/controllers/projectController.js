// controllers/projectController.js
const pool = require('../config/db');

exports.createProject = async (req, res) => {
  const {
    titulo,
    descripcion,
    completada = false,
    fecha_vencimiento,
    prioridad = 'media',
    asignado_a,
    categoria,
    costo_proyecto,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO projects (titulo, descripcion, completada, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [titulo, descripcion, completada, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto]
    );

    res.status(201).json({
      message: 'Proyecto creado exitosamente',
      project: result.rows[0],
    });
  } catch (error) {
    console.error('Error al crear el proyecto:', error);
    res.status(500).json({
      message: 'Error al crear el proyecto',
    });
  }
};


exports.getAllProjects = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM projects');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
      res.status(500).json({ message: 'Error al obtener los proyectos' });
    }
  };