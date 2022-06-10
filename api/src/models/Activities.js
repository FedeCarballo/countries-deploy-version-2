const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('activities', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    difficulty:{
        type: DataTypes.ENUM("1","2","3","4","5"),
        allowNull: false
    },
    duration:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    season: {
        type: DataTypes.ENUM('Summer', 'Autum','Winter','Spring'),
        allowNull:false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://www.vistazo.com/vistazo/sites/default/files/field/image/2015/12/12/confused-travolta-meme.jpg"
    }
  },
  {
    timestamps: false,
  });
};
