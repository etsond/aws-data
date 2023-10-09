function getPostTitles(posts) {
  return posts.map(post => post.title);
}

function getPostsWithUserId(posts, userId) {
  return posts.filter(post => post.userId === userId);
}

module.exports = {
  getPostTitles,
  getPostsWithUserId
};
