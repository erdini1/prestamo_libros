import { DataTypes } from "sequelize";

const User = (sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        role: {
            type: DataTypes.ENUM(['ADMIN', 'USER']),
            defaultValue: 'USER',
        },
        password: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, { timestamps: true })

    User.associate = function (models) {
        User.hasMany(models.Loan, {
            foreignKey: 'userId',
            as: 'loans',
        });
    }
    return User
}
export default User