import { DataTypes } from "sequelize";

const Loan = (sequelize) => {
  const Loan = sequelize.define("loans", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    borrowDate: {
      type: DataTypes.DATE,
    },
    returnDate: {
      type: DataTypes.DATE,
    },
  });

  Loan.associate = function (models) {
    Loan.belongsTo(models.User, {
      foreignKey: "userId",
      as: "owner",
    });
    Loan.belongsToMany(models.Book, {
      through: "LoanBook",
      foreignKey: "loanId",
      otherKey: "bookId",
      as: "books",
    });
    // Loan.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' })
  };
  return Loan;
};

export default Loan;
