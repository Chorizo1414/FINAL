// models/Project.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  completada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fecha_vencimiento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  prioridad: {
    type: DataTypes.ENUM('baja', 'media', 'alta'),
    defaultValue: 'media',
  },
  asignado_a: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  costo_proyecto: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Project;
