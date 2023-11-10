import { DataTypes } from "sequelize";

const Book = (sequelize) => {
    const Book = sequelize.define("books", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
        genre: {
            type: DataTypes.STRING,
        },
        paginas: {
            type: DataTypes.INTEGER,
        },
        summary: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM(['Available', 'Borrowed']),
            defaultValue: 'Available',
        }
    }, { timestamps: true })

    Book.associate = function (models) {
        Book.hasMany(models.Loan, { foreignKey: 'bookId', as: 'loans' })
    }
    return Book
}

export default Book