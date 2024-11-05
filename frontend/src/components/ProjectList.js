import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import './ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('${apiUrl}/api/projects/all-projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    navigate('/checkout', { state: { titulo: project.titulo, costo_proyecto: project.costo_proyecto } });
  };

  const handleAddProject = () => {
    navigate('/create-project');
  };

  const handleEditProject = (project) => {
    navigate('/edit-project', { state: project });
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/delete-project/${id}`);
      alert('Proyecto eliminado correctamente');
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
      alert('Hubo un error al eliminar el proyecto');
    }
  };

  return (
    <div className="project-list">
      <h2>Lista de Proyectos</h2>
      <button onClick={handleAddProject} className="add-project-button">
        Agregar Proyecto
      </button>
      <div className="project-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.titulo}</h3>
            <p>{project.descripcion}</p>
            <p>Prioridad: {project.prioridad}</p>
            <p>Fecha de vencimiento: {project.fecha_vencimiento}</p>
            <p>Costo del proyecto: ${project.costo_proyecto}</p>
            <button 
              className="buy-button"
              onClick={() => handleProjectClick(project)}
            >
              Comprar
            </button>
            <button 
              className="edit-button"
              onClick={() => handleEditProject(project)}
            >
              Modificar
            </button>
            <button 
              className="delete-button"
              onClick={() => handleDeleteProject(project.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
