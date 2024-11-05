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


  exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM projects WHERE id = $1', [id]);
      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Proyecto eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Proyecto no encontrado' });
      }
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
      res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
  };
  


  exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const {
      titulo,
      descripcion,
      completada,
      fecha_vencimiento,
      prioridad,
      asignado_a,
      categoria,
      costo_proyecto,
    } = req.body;
  
    try {
      const result = await pool.query(
        `UPDATE projects SET titulo = $1, descripcion = $2, completada = $3, fecha_vencimiento = $4, prioridad = $5, asignado_a = $6, categoria = $7, costo_proyecto = $8 WHERE id = $9 RETURNING *`,
        [titulo, descripcion, completada, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto, id]
      );
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Proyecto actualizado correctamente', project: result.rows[0] });
      } else {
        res.status(404).json({ error: 'Proyecto no encontrado' });
      }
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
      res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
  };
  
