import './globals.css'
import {AuthProvider} from '../context/AuthContext'
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
axios.defaults.withCredentials=true

export default async function Layout({ children }) {
  
  
  return (
 
    <AuthProvider>
    <html lang="en">
     
     
      {/* <Toaster position='top-right'/> */}
      <body className="bg-gray-100">{children}</body>
     
    </html>
    </AuthProvider>
   
  );
}

// app/layout.js
// import './globals.css';
// import { SessionProvider } from 'next-auth/react';

// export default function Layout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-100">
//         <SessionProvider>{children}</SessionProvider>
//       </body>
//     </html>
//   );
// }