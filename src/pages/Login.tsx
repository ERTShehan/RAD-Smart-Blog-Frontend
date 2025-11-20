import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { login, getMyDetails } from "../services/auth"

export default function Login() {
  // ... (kalin thibba code eka emama thiyanna) ...
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    // ... (kalin thibba code eka emama thiyanna) ...
     e.preventDefault()
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password.")
      return
    }

    try {
      setLoading(true)
      const data: any = await login(username, password)

      if (data?.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken)
        localStorage.setItem("refreshToken", data.data.refreshToken)
        const resData = await getMyDetails()
        setUser(resData.data)
        navigate("/home")
      } else {
        alert("Login failed, please check your credentials.")
      }
    } catch (err) {
      console.error("Login error:", err)
      alert("Login failed, please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 px-4 relative">
      
      {/* --- New Back Button --- */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white font-medium hover:underline flex items-center gap-2"
      >
        ← Back to Home
      </button>
      {/* ----------------------- */}

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        {/* ... (kalin thibba form content eka emama thiyanna) ... */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to access your account</p>
        </div>
        
        <form className="flex flex-col gap-5">
            {/* Form inputs... */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email / Username</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 mt-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}