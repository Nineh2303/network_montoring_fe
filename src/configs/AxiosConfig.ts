import axios from "axios"


export const useCreateClient =()=>{
  const axiosClient = axios.create({
    baseURL: 'http://localhost:5500',
    timeout: 1000,
    headers: {
      'X-Custom-Header': 'foobar',
      'Content-Type' :'Application/json',
      'Authorization' : localStorage.getItem("access_token") ? localStorage.getItem("access_token") : undefined
    }
  });
  return axiosClient
}