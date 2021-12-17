
function setAdminToken(adminToken) {
  sessionStorage.setItem("adminToken", JSON.stringify(adminToken));
}

function setUserToken(userToken) {
  sessionStorage.setItem("userToken", JSON.stringify(userToken));
}

function setAdminName(adminName) {
    sessionStorage.setItem("adminName", JSON.stringify(adminName));
}

function getAdminToken() {
  const adminToken = sessionStorage.getItem("adminToken");
  return JSON.parse(adminToken) != null && JSON.parse(adminToken) != undefined;
}

function getUserID() {
  const userToken = sessionStorage.getItem("userToken");
  return JSON.parse(userToken);
}

function getUserToken() {
  const userToken = sessionStorage.getItem("userToken");
  return userToken != null && userToken != undefined; //JSON.parse(userToken) != null && JSON.parse(userToken) != undefined;
}

function getAdminName() {
    const adminToken = sessionStorage.getItem("adminName");
    return JSON.parse(adminToken);
}

function deleteAdminToken() {
    sessionStorage.removeItem("adminToken");
}

function deleteUserToken() {
  sessionStorage.removeItem("userToken");
}

export {setAdminToken, getAdminToken, deleteAdminToken, setUserToken, getUserToken, getUserID, deleteUserToken, setAdminName, getAdminName};