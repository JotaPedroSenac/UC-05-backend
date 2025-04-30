const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

// id, nome, descricao, turno, professor_id

const CursoModel = sequelize.define(
    'CursoModel',
    {
      // Model attributes are defined here
      cod_curso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        validate: {
            isNumeric:{
                msg: 'É permitido apenas números'
            }
        }
      },

      nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      descricao: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

    },
    {
      tableName: 'turma',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em'
    },
  );

  module.exports = CursoModel;