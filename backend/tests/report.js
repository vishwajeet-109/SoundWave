let passed = 0;
let failed = 0;

export function pass() {
  passed++;
}

export function fail() {
  failed++;
}

export function printReport() {
  console.log("\n=================================");
  console.log("SoundWave API Test Report");
  console.log("=================================\n");

  console.log("PASS :", passed);
  console.log("FAIL :", failed);

  console.log(
    "\nCoverage:",
    Math.round(
      (passed / (passed + failed || 1)) * 100
    ) + "%"
  );
}