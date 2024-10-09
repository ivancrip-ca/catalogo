import { DataTypes } from "sequelize";
import db from '../config/db.js';

//Se define el modelo de la tabla de sql
const Productos = db.define('productos', {
    Pro_Id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Pro_Nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Pro_Descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Pro_Precio:{
        type: DataTypes.DECIMAL,
        allowNull: false
    }
},{
    //Se evita la creacion de los campos createdAt y updatedAt
    timestamps: false 
})

export default Productos