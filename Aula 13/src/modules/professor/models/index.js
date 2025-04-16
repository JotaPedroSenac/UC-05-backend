const {DataTypes} = require('sequelize');
const sequelize = require('../../../config/configDb')

const Professor = sequelize.define('Professor', {
    matricula:{
        type: DataTypes.CHAR(8),
        primaryKey: true,
        validate:{
            is:{
                // regex da matricula (letra + 7 numeros)
                args: /^[A-Za-z][0-9]{7}$/,
                msg: 'A matricula deve começar com uma letra e ter 7 numeros'
            }
        }
    } ,
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            args:[100]
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Forneça um email válido'
            }
        }
        
    },
    senha: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        validate: {
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{10}$/,
            msg: 'A senha deve ter exatamente 10 caracteres e conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
        }
    }
})

module.exports = Professor