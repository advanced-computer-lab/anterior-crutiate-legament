function setAdminToken(adminToken) {
  sessionStorage.setItem("adminToken", JSON.stringify(adminToken));
}

function setUserToken(userToken) {
  sessionStorage.setItem("userToken", JSON.stringify(userToken));
}

function setUserID(userToken) {
  sessionStorage.setItem("userID", JSON.stringify(userToken));
}

function setAdminName(adminName) {
  sessionStorage.setItem("adminName", JSON.stringify(adminName));
}

function getAdminToken() {
  const adminToken = sessionStorage.getItem("adminToken");
  return adminToken;
}

function getUserToken() {
  const userToken = sessionStorage.getItem("userToken");
  return userToken;
}

function getUserID() {
  const userToken = sessionStorage.getItem("userID");
  return JSON.parse(userToken);
}

function getAdminName() {
  const adminName = sessionStorage.getItem("adminName");
  return adminName;
}

function deleteAdminToken() {
  sessionStorage.removeItem("adminToken");
}

function deleteAdminName() {
  sessionStorage.removeItem("adminName");
}

function deleteUserToken() {
  sessionStorage.removeItem("userToken");
}

function deleteUserID() {
  sessionStorage.removeItem("userID");
}

export {
  setAdminToken,
  setUserID,
  getAdminToken,
  deleteAdminToken,
  setUserToken,
  getUserToken,
  getUserID,
  deleteUserToken,
  setAdminName,
  getAdminName,
  deleteAdminName,
  deleteUserID,
};
