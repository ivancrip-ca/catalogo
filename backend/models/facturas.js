import { DataTypes } from "sequelize";
import db from '../config/db.js';

//Se define el modelo de la tabla de sql
const Facturas = db.define('facturas', {
    Fact_Id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Fact_Total:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    Fact_SubTotal:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    Fact_CliId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    //Se evita la creacion de los campos createdAt y updatedAt
    timestamps: false 
})

export default Facturas