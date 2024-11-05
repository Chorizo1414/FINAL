import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import './CreateProjectForm.css';

const CreateProjectForm = () => {
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
  const navigate = useNavigate();

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
      await axios.post('${apiUrl}/api/projects/add-project', formData);
      alert('Proyecto agregado exitosamente');
      navigate('/projects');
    } catch (error) {
      console.error('Error al agregar el proyecto:', error);
      alert('Hubo un error al agregar el proyecto');
    }
  };

  const handleCancel = () => {
    navigate('/projects'); // Redirige a la página de proyectos
  };

  return (
    <div className="create-project-form">
      <h2>Agregar Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
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
        <label>
          Fecha de vencimiento:
          <input
            type="date"
            name="fecha_vencimiento"
            value={formData.fecha_vencimiento}
            onChange={handleChange}
          />
        </label>
        <select name="prioridad" value={formData.prioridad} onChange={handleChange}>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <input
          type="text"
          name="asignado_a"
          value={formData.asignado_a}
          onChange={handleChange}
          placeholder="Asignado a"
        />
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          placeholder="Categoría"
        />
        <input
          type="number"
          name="costo_proyecto"
          value={formData.costo_proyecto}
          onChange={handleChange}
          placeholder="Costo del Proyecto"
          required
        />
        <div className="button-group">
          <button type="submit">Crear Proyecto</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
