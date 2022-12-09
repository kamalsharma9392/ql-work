import { Sequelize } from "sequelize";
import db from "../db/config.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail:true
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default Users;