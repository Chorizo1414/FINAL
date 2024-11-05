import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditProjectForm.css';

const EditProjectForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state;

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    completada: false,
    fecha_vencimiento: '',
    prioridad: 'media',
    asignado_a: '',
    categoria: '',
    costo_proyecto: ''
  });

  useEffect(() => {
    if (project) {
      setFormData({
        titulo: project.titulo || '',
        descripcion: project.descripcion || '',
        completada: project.completada || false,
        fecha_vencimiento: project.fecha_vencimiento || '',
        prioridad: project.prioridad || 'media',
        asignado_a: project.asignado_a || '',
        categoria: project.categoria || '',
        costo_proyecto: project.costo_proyecto || ''
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/projects/update-project/${project.id}`, formData);
      alert('Proyecto actualizado correctamente');
      navigate('/projects');
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
      alert('Hubo un error al actualizar el proyecto');
    }
  };

  return (
    <div className="edit-project-form">
      <h2>Modificar Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />

        <label>
          Completada:
          <input
            type="checkbox"
            name="completada"
            checked={formData.completada}
            onChange={handleChange}
          />
        </label>
        
        <label>Fecha de vencimiento:</label>
        <input
          type="date"
          name="fecha_vencimiento"
          value={formData.fecha_vencimiento}
          onChange={handleChange}
        />

        <label>Prioridad:</label>
        <select name="prioridad" value={formData.prioridad} onChange={handleChange}>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

        <label>Asignado a:</label>
        <input
          type="text"
          name="asignado_a"
          value={formData.asignado_a}
          onChange={handleChange}
        />

        <label>Categoría:</label>
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        />

        <label>Costo del proyecto:</label>
        <input
          type="number"
          name="costo_proyecto"
          value={formData.costo_proyecto}
          onChange={handleChange}
          required
        />

        <button type="submit" className="save-button">Guardar Cambios</button>
        <button type="button" className="cancel-button" onClick={() => navigate('/projects')}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditProjectForm;
