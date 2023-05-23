module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
    {
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'BlogPosts',
          key: 'id'
        },
        field: 'post_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'category_id',
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    }
  );

  PostCategory.associate = ({BlogPost, Category}) => {
    Category.belongsToMany(BlogPost, {
      as: 'blog_posts',
      through: PostCategory,
      foreignKey: 'post_id', // se refere ao id de Book na tabela de ``
      otherKey: 'category_id', // se refere a outra chave de ``
    });
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'category_id', // se refere ao id de User na tabela de ``
      otherKey: 'post_id',
    });
  };

  return PostCategory;
};