import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        action: {
            type: String,
            required: true
        },

        module: {
            type: String,
            required: true
        },

        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },

        details: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        ipAddress: {
            type: String,
            default: ""
        },

        userAgent: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

auditLogSchema.index({
    user: 1,
    createdAt: -1
});

const AuditLog = mongoose.model(
    "AuditLog",
    auditLogSchema
);

export default AuditLog;