import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/LoginPage/Login";
import { useAuthProvider } from "./contextProvider/AuthProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Loader from "./components/pages/loadingPage/Loader";

import Navbar from './components/pages/Navbar/Navbar'
import Dashboard from "./components/pages/Dashboard/Dashboard";
import { useTheme } from "next-themes";
function App() {
  const { theme } = useTheme();
  const { user, setUser } = useAuthProvider();
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;
 

useEffect(()=>{
if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.body.classList=""
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
      }
    }
},[theme])

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
    });
    return () => unSubscribe();
  }, [setUser]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Public Route */}
        {!isAuthenticated && <Route path="/login" element={<Login />} />}

        {/* Protected Route */}
        {isAuthenticated && (
          <Route path="/dashboard" element={<Dashboard/>} />
        )}

        {/* Redirects */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/login"}
              replace
            />
          }
        />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/resume-builder" element={<h1>Resume Builder</h1>} />
  <Route path="/job-tracker" element={<h1>Job Tracker</h1>} />
  <Route path="/ai-jobs" element={<h1>AI Jobs</h1>} />
  <Route path="/settings" element={<h1>Settings</h1>} />

      </Routes>
    </>
  );
}

export default App;
