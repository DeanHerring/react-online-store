const Sequelize = require("sequelize");
const sequelize = new Sequelize("internetM", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

const Product = sequelize.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: "not_found.jpg",
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    price: {
      type: Sequelize.DOUBLE(10, 2),
      allowNull: false,
    },
    rating: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    producer: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    available: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    delivery: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: JSON.stringify({
        pickup: false,
        nova_poshta: false,
      }),
    },
    votes: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    category: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createAt: false,
    updateAt: false,
  }
);

// Синхронизация с БД

// sequelize
//   .sync({ force: true })
//   .then(() => console.log("[MODEL] Product: Success"))
//   .catch(() => console.log("[MODEL] Product: Error"));

module.exports = Product;