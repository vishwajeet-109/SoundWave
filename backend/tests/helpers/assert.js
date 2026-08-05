export function expectStatus(res, expected) {
  if (res.status !== expected) {
    throw new Error(
      `Expected ${expected}, got ${res.status}\n` +
      `Response:\n${JSON.stringify(res.data, null, 2)}`
    );
  }
}

export function expectSuccess(res) {
  if (!res.data?.success) {
    throw new Error(
      `API returned success=false\n` +
      JSON.stringify(res.data, null, 2)
    );
  }
}