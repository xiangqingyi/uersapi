// user model


function User (user) {
  if(!user) user = {};
  this.id = user.id || '';
  this.name = user.name || '';
  this.age = user.age || '';
}

module.exports = User;

