const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

// id, nome, descricao, turno, professor_id

const TurmaModel = sequelize.define(
    'TurmaModel',
    {
      // Model attributes are defined here
      cod_turma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        validate: {
            isNumeric:{
                msg: 'É permitido apenas números'
            }
        }
      },

      fk_cod_curso:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'curso',
            key: 'cod_curso'
        }
      },

      turno: {
        type: DataTypes.STRING(10),
        allowNull: false,
      }

    },
    {
      tableName: 'turma',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em'
    },
  );

  module.exports = TurmaModel;