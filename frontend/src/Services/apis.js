const BASE_URL = "http://localhost:4000"


export const authEndpoints = {
    LOGIN_API : BASE_URL +"/login",
    SIGNUP_API : BASE_URL + "/signup",
    GET_USER_DETAILS : BASE_URL + "/get-user-details"
}


export const agentEndpoints = {
    GET_ALL_AGENT : BASE_URL + "/get-all-agent",
    ADD_AGENT : BASE_URL + "/add-agent",
    UPDATE_AGENT : BASE_URL + "/update-agent",
    DELETE_AGENT : BASE_URL + "/delete-agent"
}


export const taskEndpoints = {
    GET_ALL_TASK : BASE_URL + "/get-all-task",
    UPLOAD_CSV : BASE_URL + "/upload-csv",
    DELETE_TASK : BASE_URL + "/delete-task"
}