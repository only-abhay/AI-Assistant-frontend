import React from 'react'
import {cookies} from "next/headers"
import api from './api'
const serverApi = async()=> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("jwt")?.value
    if(!token){
        return{
            success : false,
            user :null
        }}
        const response = await api.get("api/user/get-me",{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        if(response.data.success){
            return{
                user: response.data.user,
            success:true
            }
        }
         
    
  } catch (error) {
    return {
      success: false,
      user: null,
    };
  }
}
export default serverApi