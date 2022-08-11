import axios from "axios" ;

import {BE_URL} from "./Constant" ;


const Axios = axios.create({
  baseURL: process.env.REACT_APP_BE_URL || BE_URL,
  withCredentials: true,
});

const calls = {
  getHelloWorld: () => {
    return Axios.get("/");
  },
  userLogin: async (payload) => {
    return Axios.post("/user/login", payload);
  },
  userVerify: async () => {
    return Axios.post("/user/verify");
  },
  userSignUp: async (payload) => {
    return Axios.post("/user/signup", payload);
  },
  userLogOut: async () => {
    return Axios.post("/user/logout");
  },
  addtodotask: async (payload) => {
    return Axios.post("/todotask/add", payload);
  },
  getAllToDoTask: async () => {
    return Axios.get("/todotask/");
  },
  addDailyTask: async (payload) => {
    return Axios.post("/dailytask/add", payload);
  },
  getDailyTasks: async () => {
    return Axios.get("/dailytask/");
  },
  updateToDoCompletion: async (payload) => {
    return Axios.put("/todotask/update", payload);
  },
  updateDailyTaskCompletion: async (payload) => {
    return Axios.put("/dailytask/update", payload);
  },
  deleteToDoTask: async (payload) => {
    return Axios.put("/todotask/delete", payload);
  },
};

const apiCall= async (api , payload={}) => {

    try {
        const apiName = calls[api] ;
        if(!apiName) console.log("API call name sent as parameter does not match !!");
        console.log("Payload sending for",api,": ", payload) ;
        const response = await apiName(payload) ;
        console.log(api, "here:\n" , response.data) ;
        return  {data:response.data} ;

    } catch (error) {
        return {err:error.response.data} ;
    }
}



export default apiCall ;