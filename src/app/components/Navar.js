// components/Navbar.js
// import { useRouter } from 'next/router'

import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation";

const Navbar = ({ name }) => {
//   const router = useRouter()
  const auth= useAuth();
  const router=useRouter();
  const handleLogout =async() => {
    // You can add logout logic here (e.g., clear session, redirect)
    toast.loading("Logging Out ",{id:'logout'})
    try{

    
    await auth?.logout();
    toast.success("Logged out",{id:'logout'})
    router.push('api/auth/signin')
    }catch(err){
      toast.error("Failed to logout",{id:'logout'})
    }
  }

  return (
    <nav className=" text-white  p-4">
      <div className="flex justify-between items-right">
        {/* Name Section */}
        <div className="text-xl  font-semibold text-black">
          Welcome {auth?.user?.name}
        </div>
        <h1 className="md:text-4xl text-lg font-bold mb-4 text-center text-gray-700">
        DSA Tracker
      </h1>
       <button
          onClick={handleLogout}
          className=" py-2 px-2 h-max my-auto bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 "
        >
          Logout
        </button>
        {/* Logout Button */}
       
      </div>
    </nav>
  )
}

export default Navbar
