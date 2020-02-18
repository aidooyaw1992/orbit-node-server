'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    amount: DataTypes.REAL,
    paymentType: {
      type: DataTypes.ARRAY(DataTypes.ENUM),
      values: ['CASH', 'MOMO', 'CARD']
    },
    transactionNumber: DataTypes.TEXT,
    eventId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    paidDate: DataTypes.DATE
  }, {});

  Payment.associate = function(models) {};

  return Payment;
};