import { DataTypes } from "sequelize";
import db from '../config/db.js';

//Se define el modelo de la tabla de sql
const Clientes = db.define('clientes', {
    Cli_Id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Cli_Nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Cli_RFC:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    //Se evita la creacion de los campos createdAt y updatedAt
    timestamps: false 
})

export default Clientes