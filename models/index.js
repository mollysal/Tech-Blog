const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Creating Association
// Each User has many posts linked by the user ID
User.hasMany(Post, {
    foreignKey: 'user_id'
});
// A User is linked to a post by the user ID
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
// A comment is linked to the user by the user ID
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
// A comment is linked to the post by the post ID
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
// Each User has many comments linked by the user ID
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
// Each Post has many comments linked by the post ID
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = {User, Post, Comment};