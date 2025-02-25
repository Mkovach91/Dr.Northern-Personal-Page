const APIURL = 'http://localhost:3000';

export const registerUser = async (userData) => {
  const response = await fetch(`${APIURL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const registerJson = await response.json();
  return registerJson;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${APIURL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const loginJson = await response.json();
  return loginJson;
};

export const getUserDetails = async (token) => {
  const response = await fetch(`${APIURL}/user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const detailsJson = await response.json();
  return detailsJson;
};

export const changePassword = async (passwordData, token) => {
  const response = await fetch(`${APIURL}/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData),
  });
  if (!response.ok) {
    throw new Error("Failed to change password.");
  }
  return response.json();
};

export const getAdminDashboard = async (token) => {
  const response = await fetch(`${APIURL}/admin/dashboard`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin dashboard.");
  }

  const dashboardData = await response.json();
  return dashboardData;
};

export const getStudentLabs = async (token) => {
  const response = await fetch(`${APIURL}/labs`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

export const verifyRegistrationCode = async (code) => {
  const response = await fetch(`${APIURL}/verify-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  return response.json();
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getLabDetails = async (labId, token) => {
  const response = await fetch(`${APIURL}/labs/${labId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};