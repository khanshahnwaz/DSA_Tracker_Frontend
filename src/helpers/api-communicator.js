import axios from "axios"

export const signUpUser=async(name,email,password)=>{
    const res= await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/signup`,{name,email,password},  {withCredentials: true}

    );
    console.log("Response from signup",res)
    if(res.status!==201){
        throw new Error("Unable to SignUp")
    }
    const data=await res.data;
    return data;
}

export const loginUser=async(email,password)=>{
    const res= await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/signin`,{email,password},{  withCredentials: true});
    // console.log(res)
    if(res.status!=200){
        throw new Error("Unable to login.")
    }
    const data=await res.data;
    return data;
}

export const logoutUser=async()=>{
    const res= await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/signout`,{withCredentials:true});
    // console.log(res)
    if(res.status!=200){
        throw new Error("Unable to logout.")
    }
    const data=await res.data;
    return data;
}

export const checkAuthStatus=async()=>{
    const res= await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/auth-status`,{withCredentials:true});
    // console.log(res)
    if(res.status!=200){
        throw new Error("Unable to authenticate.")
    }
    const data=await res.data;
    return data;
}

