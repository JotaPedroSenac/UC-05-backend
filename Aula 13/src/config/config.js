// para iniciar as migrations: npx sequelize-cli init
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
        username: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NOME,
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORTA,
        dialect: 'postgres', // Substitua pelo dialeto do seu banco de dados
        logging: true // Define se os logs de SQL serão exibidos
    },
    test: {

    },
    production: {

    }
}