'use client'
import { ReactNode, useContext, useEffect } from 'react';
import {createContext, useState} from 'react'
import { checkAuthStatus, loginUser, logoutUser, signUpUser } from '../helpers/api-communicator';
import toast from 'react-hot-toast';



const AuthContext=createContext(null);
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const[isLoggedIn,setIsLoggedIn]=useState(false);

// fetch if the users cookie are valid then skip login
    useEffect(()=>{
        async function checkStatus(){

            const data=await checkAuthStatus();
            console.log("Auth request ",data)
            if(data && isLoggedIn){
                setUser({email:data.email,name:data.name})
                setIsLoggedIn(true)
            }else{
                setUser(null)
                setIsLoggedIn(false)
            }
        }
        checkStatus()
    },[]);

    const login=async(email,password)=>{
        const data=await loginUser(email,password);
        if(data){
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true);
        }
    };
    const signUp=async(name,email,password)=>{
        // console.log("sign up called. ")
        const data=await signUpUser(name,email,password);
        if(data){
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true);
        }
    };


    const logout=async()=>{
  
      
        try{
          await logoutUser();
          
          setIsLoggedIn(false);
          setUser(null);
          
        }catch(err){
          toast.error("Logout failed.")
        }
       
    }
    const value={
        user,
        isLoggedIn,
        login,
        logout,
        signUp,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export const useAuth=()=>useContext(AuthContext);