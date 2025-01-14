'use client';
import { signIn } from 'next-auth/react';
import { useAuth } from '../../../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {auth} from '../../../../auth'
export default function SignInPage() {

  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', { callbackUrl: '/' });
      if (result.error) {
        toast.error('Sign In Failed');
      }
    } catch (error) {
      toast.error('Google Sign-In Failed');
    }
  };


  const authContext = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // console.log("Form submit ", data);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      toast.loading("Signing In", { id: "login" });
      await authContext?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      toast.error("Sign In Failed", { id: "login" });
    }
  };
  
  useEffect(()=>{
    if (authContext.isLoggedIn) {
      router.push('/');
    }
  },[])
  useEffect(() => {
    if (authContext.isLoggedIn) {
      router.push('/');
    }
  }, [authContext]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Toaster position='top-right'/>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Welcome Back!</h1>
        <p className="mt-2 text-center text-gray-500">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              className="text-gray-500 mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              className="text-gray-500 mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <div className="border-t border-gray-300 w-1/3"></div>
          <p className="text-sm text-gray-500">OR</p>
          <div className="border-t border-gray-300 w-1/3"></div>
        </div>


{/* for later version */}
        <button
          // onClick={handleGoogleSignIn}
          onClick={()=>toast.error("Currently not available",{id:'google'})}
          className="mt-4 flex w-full items-center justify-center py-2 px-4 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          <img
            src="/google-icon.png"
            alt="Google"
            className="h-5 w-5 mr-3"
          />
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account? <Link href="/api/auth/signup" className="text-gray-800 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
