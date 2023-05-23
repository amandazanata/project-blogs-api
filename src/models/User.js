module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'user_id',
      as: 'blogs_posts',
    });
  };

  return User;
};