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
            },
            len:{
              args:[9],
              msg: 'O código da turma deve ter 9 numeros'
            }
        }
      },

      fk_cod_curso:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric:{
            msg: 'É permitido apenas números'
        },
        len:{
          args:[4],
          msg: 'O código do curso deve ter 4 numeros'
        }
        },
        references:{
            model: 'curso',
            key: 'cod_curso'
        }
      },

      turno: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          isIn:{
            args: [['matutino', 'vespertino', 'noturno']],
            msg: 'Turno inválido'
          }
        }
      }

    },
    {
      tableName: 'turma',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em'
    },
  );

  module.exports = TurmaModel;