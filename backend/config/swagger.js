// config/swagger.js
//
// Serves interactive API docs at /api-docs. Uses the hand-written
// spec in docs/openapi.yaml rather than JSDoc-comment scanning, so
// none of the existing route files needed comment annotations added
// retroactively.
//
// Add to package.json if not already present:
//   npm install swagger-ui-express yaml

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specPath = path.join(__dirname, "..", "docs", "openapi.yaml");
const openapiDocument = YAML.parse(fs.readFileSync(specPath, "utf8"));

/**
 * Mounts Swagger UI. Call from app.js:
 *   import { mountSwagger } from "./config/swagger.js";
 *   mountSwagger(app);
 */
export const mountSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(openapiDocument, {
      customSiteTitle: "SoundWave API Docs",
    })
  );
};

export default openapiDocument;
