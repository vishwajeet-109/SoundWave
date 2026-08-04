import Session from "../models/Session.js";

class SessionService {
  async create(sessionData) {
    return Session.create(sessionData);
  }

  async findByToken(refreshToken) {
    return Session.findOne({
      refreshToken,
    });
  }

  async deleteByToken(refreshToken) {
    return Session.findOneAndDelete({
      refreshToken,
    });
  }

  async deleteAll(userId) {
    return Session.deleteMany({
      user: userId,
    });
  }
}

export default new SessionService();