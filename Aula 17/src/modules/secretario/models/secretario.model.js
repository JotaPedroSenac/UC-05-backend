const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');


const SecretarioModel = sequelize.define(
    'SecretarioModel',
    {
      // Model attributes are defined here
      matricula: {
        type: DataTypes.CHAR(5),
        primaryKey: true,
        validate: {
            is:{
                args:/^[a-zA-Z]+[0-9]{4}$/,
                msg: 'A matrícula deve começar com uma letra e ter exatamente quatro números em seguida.'
            }
        }
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
            isAlpha: {
                msg: 'É permitido apenas letras'
            }
        }
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate:{
            isEmail:{
                args:/^[a-zA-Z0-9._%+-]+@rn\.senac\.br$/,
                msg: 'E-mail inválido! o email deve pertencer ao domínio @rn.senac.br'
            }
        }
      },
      senha: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            len:{
                args: [8,12],
                msg: 'A senha deve ter no minimo 8 caracteres e no maximo 12'
            },
            is:{
                args:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                msg: 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial (como !@#$%^&*).'
            }
        }

      }
    },
    {
      tableName: 'secretario',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em'
    },
  );

  module.exports = SecretarioModel;