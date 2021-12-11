
async function setAdminToken(adminToken) {
  sessionStorage.setItem("adminToken", JSON.stringify(adminToken));
}

async function setUserToken(userToken) {
  sessionStorage.setItem("userToken", JSON.stringify(userToken));
}

async function setAdminName(adminName) {
    sessionStorage.setItem("adminName", JSON.stringify(adminName));
}

async function getAdminToken() {
  const adminToken = sessionStorage.getItem("adminToken");
  return JSON.parse(adminToken) != null && JSON.parse(adminToken) != undefined;
}

async function getUserID() {
  const userToken = sessionStorage.getItem("userToken");
  return JSON.parse(userToken);
}

async function getUserToken() {
  const userToken = sessionStorage.getItem("userToken");
  return JSON.parse(userToken) != null && JSON.parse(userToken) != undefined;
}

async function getAdminName() {
    const adminToken = sessionStorage.getItem("adminName");
    return JSON.parse(adminToken);
}

async function deleteAdminToken() {
    sessionStorage.removeItem("adminToken");
}

async function deleteUserToken() {
  sessionStorage.removeItem("userToken");
}

export {setAdminToken, getAdminToken, deleteAdminToken, setUserToken, getUserToken, getUserID, deleteUserToken, setAdminName, getAdminName};