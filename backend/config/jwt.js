import "dotenv/config";

const requireEnv = (key) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const jwtConfig = {
  accessToken: {
    secret: requireEnv("JWT_ACCESS_SECRET"),
    expiresIn: process.env.JWT_ACCESS_EXPIRE || "15m",
  },

  refreshToken: {
    secret: requireEnv("JWT_REFRESH_SECRET"),
    expiresIn: process.env.JWT_REFRESH_EXPIRE || "30d",
  },
};