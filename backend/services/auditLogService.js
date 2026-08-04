import AuditLog from "../models/AuditLog.js";

class AuditLogService {
  async createLog({
    user,
    action,
    module,
    targetId = null,
    details = {},
    ipAddress = "",
    userAgent = "",
    req,
  }) {
    return this.recordAuditLog({
      user,
      action,
      module,
      targetId,
      details,
      ipAddress,
      userAgent,
      req,
    });
  }

  async recordAuditLog({
    user,
    action,
    module,
    targetId = null,
    details = {},
    ipAddress = "",
    userAgent = "",
    req,
  }) {
    const requestIp = req?.ip || req?.headers?.["x-forwarded-for"] || ipAddress || "";
    const requestUserAgent = req?.headers?.["user-agent"] || userAgent || "";

    return AuditLog.create({
      user,
      action,
      module,
      targetId,
      details,
      ipAddress: requestIp,
      userAgent: requestUserAgent,
    });
  }

  async getLogs({ page = 1, limit = 20 } = {}) {
    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const logs = await AuditLog.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await AuditLog.countDocuments();

    return {
      logs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export default new AuditLogService();