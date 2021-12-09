
function setAdminToken(adminToken) {
  sessionStorage.setItem("adminToken", JSON.stringify(adminToken));
}

function setAdminName(adminName) {
    sessionStorage.setItem("adminName", JSON.stringify(adminName));
}

function getAdminToken() {
  const adminToken = sessionStorage.getItem("adminToken");
  return JSON.parse(adminToken) != null && JSON.parse(adminToken) != undefined;
}

function getAdminName() {
    const adminToken = sessionStorage.getItem("adminName");
    return JSON.parse(adminToken);
}

function deleteAdminToken() {
    sessionStorage.removeItem("adminToken");
}

export {setAdminToken, getAdminToken, deleteAdminToken, setAdminName, getAdminName};