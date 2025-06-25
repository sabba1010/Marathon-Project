// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// // import { auth, googleProvider } from '../firebase.config';
// import { auth, googleProvider } from "../firebase/firebase.config"; 
// import Swal from 'sweetalert2';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await signInWithEmailAndPassword(auth, email, password);

//       Swal.fire({
//         title: 'Success!',
//         text: 'Logged in successfully!',
//         icon: 'success',
//         confirmButtonText: 'Continue',
//       }).then(() => {
//         navigate('/');
//       });
//     } catch (error) {
//       Swal.fire('Login Failed', 'Invalid email or password!', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     try {
//       await signInWithPopup(auth, googleProvider);

//       Swal.fire({
//         title: 'Success!',
//         text: 'Logged in with Google!',
//         icon: 'success',
//         confirmButtonText: 'Continue',
//       }).then(() => {
//         navigate('/');
//       });
//     } catch (error) {
//       Swal.fire('Google Login Failed', 'Something went wrong!', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200">
//       <div className="bg-base-100 p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

//         <form onSubmit={handleEmailLogin} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">Email</label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Password</label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn btn-success w-full"
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>

//         <div className="divider">OR</div>

//         <button
//           onClick={handleGoogleLogin}
//           className="btn btn-outline w-full mb-2"
//           disabled={loading}
//         >
//           {loading ? 'Please wait...' : 'Continue with Google'}
//         </button>

//         <p className="text-center text-sm mt-2">
//           Don’t have an account?{' '}
//           <Link to="/register" className="text-green-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "../firebase/firebase.config";
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔐 JWT Token Handler
  const getJWTToken = async (email) => {
    try {
      const res = await fetch('https://marathon-server-azure.vercel.app/jwt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      localStorage.setItem('access-token', data.token); // ✅ Save token for protected routes
    } catch (err) {
      console.error('JWT Error:', err);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await getJWTToken(result.user.email); // 🔐 Save token after login

      Swal.fire({
        title: 'Success!',
        text: 'Logged in successfully!',
        icon: 'success',
        confirmButtonText: 'Continue',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      Swal.fire('Login Failed', 'Invalid email or password!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await getJWTToken(result.user.email); // 🔐 Save token after Google login

      Swal.fire({
        title: 'Success!',
        text: 'Logged in with Google!',
        icon: 'success',
        confirmButtonText: 'Continue',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      Swal.fire('Google Login Failed', 'Something went wrong!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-base-100 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mb-2"
          disabled={loading}
        >
          {loading ? 'Please wait...' : 'Continue with Google'}
        </button>

        <p className="text-center text-sm mt-2">
          Don’t have an account?{' '}
          <Link to="/register" className="text-green-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
