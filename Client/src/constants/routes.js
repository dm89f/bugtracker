const API_DOMAIN = "http://localhost:3001"
export const API={
  "API":`${API_DOMAIN}/api_v1/`,
  "TICKET_PRIORITIES":`${API_DOMAIN}/api_v1/auth/ticket_priorities`,
  "TICKET_STATUSES":`${API_DOMAIN}/api_v1/auth/ticket_statuses`,
  "TICKET_TYPES":`${API_DOMAIN}/api_v1/auth/ticket_types`,

  "LOGIN_REQ":`${API_DOMAIN}/api_v1/auth/login`,
  "REGISTER_REQ":`${API_DOMAIN}/api_v1/auth/register`,
  "LOGOUT_REQ":`${API_DOMAIN}/api_v1/auth/logout`,
  "CHECK_LOGGED_IN":`${API_DOMAIN}/api_v1/auth/is_loggedin`,
  "GET_SEC_QSTNS":`${API_DOMAIN}/api_v1/auth/sec_qstn`,
  "UPDATE_PSWD":`${API_DOMAIN}/api_v1/dev/reset_pswd`,

  "GET_OPEN_DEVS":`${API_DOMAIN}/api_v1/projects/devs`,
  "PROJECTS_REQ":`${API_DOMAIN}/api_v1/projects`,
  "ADD_NEW_PROJECT":`${API_DOMAIN}/api_v1/projects/`,
    
  "PROJECT_ROUTE":`${API_DOMAIN}/api_v1/project`,
  "TODOS_ROUTE":`${API_DOMAIN}/api_v1/todos`,
  "TODO_ROUTE":`${API_DOMAIN}/api_v1/todo`,
  "DEV_STATS":`${API_DOMAIN}/api_v1/dev/devInfo`,

  "DEV_TICKETS":`${API_DOMAIN}/api_v1/dev/tickets`,
  "DEV_TICKET_STATS":`${API_DOMAIN}/api_v1/dev/ticket_stats`,
  "GET_DEVS":`${API_DOMAIN}/api_v1/dev/admin/devs`,
}