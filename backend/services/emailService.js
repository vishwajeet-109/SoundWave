class EmailService {
  async sendVerificationEmail(email, token) {
    console.log("Verification Email");
    console.log(email);
    console.log(token);
  }

  async sendPasswordResetEmail(email, token) {
    console.log("Password Reset Email");
    console.log(email);
    console.log(token);
  }
}

export default new EmailService();