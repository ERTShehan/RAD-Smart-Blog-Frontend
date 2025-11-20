import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services/auth"

export default function Register() {
  // ... (kalin thibba code eka) ...
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent<HTMLButtonElement>) => {
      // ... (handleRegister logic) ...
      e.preventDefault()
    if (!firstname || !lastname || !username || !password) {
        alert("All fields are required")
        return
    }

    try {
      setLoading(true)
      const data: any = await register(username, password, firstname, lastname)
      alert(`Registration successful! Please Login.`)
      console.log("Registration data:", data)
      navigate("/login")
    } catch (err: any) {
      console.error("Registration error:", err)
      alert("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-teal-700 px-4 relative">
      
      {/* --- New Back Button --- */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white font-medium hover:underline flex items-center gap-2"
      >
        ← Back to Home
      </button>
      {/* ----------------------- */}

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* ... (kalin thibba form content eka) ... */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-2">Join us today!</p>
        </div>
        
        <form className="flex flex-col gap-4">
            {/* Inputs... */}
             <div className="flex gap-4">
             <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                type="text"
                placeholder="John"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
             </div>
             <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                type="text"
                placeholder="Doe"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="text"
              placeholder="user@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 mt-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              className="text-green-600 font-semibold hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}