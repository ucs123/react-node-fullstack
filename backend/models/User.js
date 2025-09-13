// In-memory user storage (replace with database in production)
let users = [];

class User {
  constructor(username, email, password) {
    this.id = Date.now().toString();
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = new Date().toISOString();
  }

  static create(userData) {
    const user = new User(userData.username, userData.email, userData.password);
    users.push(user);
    return user;
  }

  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static findByUsername(username) {
    return users.find(user => user.username === username);
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }

  static getAll() {
    return users;
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;