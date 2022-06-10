const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('country', {
   key:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://img2.freepng.es/20180221/uhw/kisspng-earth-planet-youtube-life-god-planet-earth-5a8e25d036ad62.653111381519265232224.jpg"
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "undefined",
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false, 
      defaultValue: "undefined",
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    googleMaps:{
      type: DataTypes.STRING,
      allowNull: true
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: false,
  });
};
