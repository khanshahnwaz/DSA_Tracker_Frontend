'use client';
import Link from 'next/link';
import { useAuth } from '../../../../context/AuthContext';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
export default function SignUpPage() {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Form submit ", data);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    try {
      
      toast.loading("Signing Up", { id: "signUp" });
      await auth?.signUp(name, email, password);
      toast.success("Signed Up Successfully", { id: "signUp" });
    } catch (error) {
      toast.error("Sign Up Failed", { id: "signUp" });
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn) router.push('/');
  }, [auth]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Toaster position='top-right'/>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Create Account</h1>
        <p className="mt-2 text-center text-gray-500">Join us and start tracking!</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              name="name"
              type="text"
              id="name"
              className="text-gray-500 mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
              
            />
          </div>

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
            Sign Up
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <div className="border-t border-gray-300 w-1/3"></div>
          <p className="text-sm text-gray-500">OR</p>
          <div className="border-t border-gray-300 w-1/3"></div>
        </div>

        <button
          onClick={() => signIn('google')}
          className="mt-4 flex w-full items-center justify-center py-2 px-4 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          <img
            src="/google-icon.png"
            alt="Google"
            className="h-5 w-5 mr-3"
          />
          Sign up with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <Link href="/api/auth/signin" className="text-gray-800 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
