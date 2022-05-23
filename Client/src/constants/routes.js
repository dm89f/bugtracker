const API_DOMAIN = "http://localhost:3001"
export const API={
  "API":`${API_DOMAIN}/api_v1/`,

  "LOGIN_REQ":`${API_DOMAIN}/api_v1/auth/login`,
  "REGISTER_REQ":`${API_DOMAIN}/api_v1/auth/register`,
  "LOGOUT_REQ":`${API_DOMAIN}/api_v1/auth/logout`,
  "CHECK_LOGGED_IN":`${API_DOMAIN}/api_v1/auth/is_loggedin`,

  "GET_OPEN_DEVS":`${API_DOMAIN}/api_v1/projects/devs`,
  "PROJECTS_REQ":`${API_DOMAIN}/api_v1/projects`,
  "ADD_NEW_PROJECT":`${API_DOMAIN}/api_v1/projects/`,

  "PROJECT_ROUTE":`${API_DOMAIN}/api_v1/project`,

}