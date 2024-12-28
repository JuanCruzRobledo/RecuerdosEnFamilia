import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home"
import Chat from "./pages/Chat/Chat"
import Game from "./pages/Game/Game"
import Profile from "./pages/Profile/Profile"
import NotFound from "./pages/NotFound/NotFound"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./assets/routes/PrivateRoute"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound/>} />
          <Route element={
            <PrivateRoute>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/game/:id" element={<Game />} />
            </PrivateRoute>}>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
