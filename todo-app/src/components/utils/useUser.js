import { useState } from "react";



export const useUser = () => {

const [userInfo ,setUserInfo] = useState("") ;

 return [userInfo,setUserInfo] ;

}