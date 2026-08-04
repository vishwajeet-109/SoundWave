// ecosystem.config.js (place at backend/ecosystem.config.js)
// Alternative to Docker for a plain VM deployment:
//   npm install -g pm2
//   pm2 start ecosystem.config.js --env production

export default {
  apps: [
    {
      name: "soundwave-backend",
      script: "server.js",
      instances: "max", // cluster mode across all CPU cores
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "500M",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
