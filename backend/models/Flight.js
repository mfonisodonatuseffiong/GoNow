module.exports = (sequelize, DataTypes) => {
    const Flight = sequelize.define('Flight', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      flightNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
  
    Flight.associate = (models) => {
      Flight.hasMany(models.Booking, {
        foreignKey: 'flightId',
        as: 'bookings'
      });
    };
  
    return Flight;
  };
  