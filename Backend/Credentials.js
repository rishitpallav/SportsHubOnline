class Credentials {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  // write a program to hash the password and return the hashed password
  hashPassword() {
    const crypto = require("crypto");
    const hash = crypto.createHash("sha256");
    hash.update(this.password);
    return hash.digest("hex");
  }
}

module.exports = Credentials;
