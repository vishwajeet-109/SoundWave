let accessToken = "";
let artistToken = "";
let adminToken = "";

export function saveToken(token) {
  accessToken = token;
}

export function getToken() {
  return accessToken;
}

export function saveArtistToken(token) {
  artistToken = token;
}

export function getArtistToken() {
  return artistToken;
}

export function saveAdminToken(token) {
  adminToken = token;
}

export function getAdminToken() {
  return adminToken;
}

export function clearToken() {
  accessToken = "";
  artistToken = "";
  adminToken = "";
}