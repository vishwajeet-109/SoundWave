import { COLORS } from "../config/env.js";

export function pass(message) {
  console.log(
    `${COLORS.green}✔ ${message}${COLORS.reset}`
  );
}

export function fail(message) {
  console.log(
    `${COLORS.red}✖ ${message}${COLORS.reset}`
  );
}

export function info(message) {
  console.log(
    `${COLORS.cyan}${message}${COLORS.reset}`
  );
}

export function warn(message) {
  console.log(
    `${COLORS.yellow}${message}${COLORS.reset}`
  );
}