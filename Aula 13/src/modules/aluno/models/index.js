const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDb');

const Aluno = sequelize.define(
  'Aluno',
  {
    // Model attributes are defined here
    // inicia pelas tabelas pais (não tem fk)
    matricula: {
      type: DataTypes.CHAR(5),
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
        validate:{
            isEmail:{
                msg: 'Forneça um e-mail valido!'
            },
            len: {
                args: [10,60],
                msg: 'O email deve ter no mínimo 10 caracteres e no máximo 60!'
            }
        }
    },
    senha: {
        type: DataTypes.STRING(8),
        allowNull: false,
        validate:{
            len:{
                args: [10],
                msg: 'A senha deve ter 10 caracteres'
            }
        }
    },
    turma_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: 
    }
  },
  {
    // Other model options go here
    tableName: 'aluno',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  },
);

module.exports = Aluno;