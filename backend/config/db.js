
//Se importa la libreria de sql
import  Sequelize from "sequelize";
//Se importa la libreria que evita datos sensibles
import dotenv from 'dotenv';

//Se llama el archivo .env donde se encuentran esos datos
dotenv.config({path: '.env'})

//Se realiza la conexión
const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASSWORD ?? '', {
    host: process.env.BD_HOST,
    port: '3306',
    dialect: 'mysql',
    define:{
        timestamps: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

export default db