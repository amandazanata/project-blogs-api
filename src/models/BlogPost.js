module.exports = (sequelize, DataTypes) => {

  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: 'blog_posts',
    underscored: true,
  },
);

BlogPost.associate = (models) => {
  BlogPost.belongsTo(models.User, {
    as: 'user',
    foreignKey: 'userId',
  });
};

return BlogPost;
};