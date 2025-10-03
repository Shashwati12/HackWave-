import { Link } from "react-router-dom"
import { FaUser, FaCogs, FaMapMarkedAlt, FaUsers } from "react-icons/fa"
import { LogOut, Plane } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Sidebar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [dialogBox, setDialogBox] = useState(false)

  const confirmLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="h-screen w-56 bg-amber-50 text-stone-900 p-6 fixed left-0 shadow-2xl z-50 border-r border-stone-200">
      {/* App Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-stone-900 text-2xl font-bold mb-8 transition-colors hover:text-orange-500"
      >
        <Plane className="w-7 h-7 text-orange-500" />
        <span>TravelMate</span>
      </Link>

      {/* Menu */}
      <nav className="flex mt-4 text-lg flex-col space-y-4">
        <Link
          to="/Dashboard/profile"
          className="flex items-center space-x-3 hover:bg-orange-50 hover:text-orange-600 px-3 py-2 rounded-lg transition-colors"
        >
          <FaUser />
          <span>Profile</span>
        </Link>
        <Link
          to="/Dashboard/currentPlan"
          className="flex items-center space-x-3 hover:bg-orange-50 hover:text-orange-600 px-3 py-2 rounded-lg transition-colors"
        >
          <FaMapMarkedAlt />
          <span>Current Plan</span>
        </Link>
        <Link
          to="/Dashboard/userFriends"
          className="flex items-center space-x-3 hover:bg-orange-50 hover:text-orange-600 px-3 py-2 rounded-lg transition-colors"
        >
          <FaUsers />
          <span>Friends</span>
        </Link>
        <Link
          to="/Dashboard/settings"
          className="flex items-center space-x-3 hover:bg-orange-50 hover:text-orange-600 px-3 py-2 rounded-lg transition-colors"
        >
          <FaCogs />
          <span>Settings</span>
        </Link>
        <button
          onClick={() => setDialogBox(true)}
          className="flex items-center space-x-3 text-black hover:bg-red-600 px-3 py-2 rounded-lg transition-colors w-full text-left"
        >
          <LogOut />
          <div>Logout</div>
        </button>
      </nav>

      {/* Confirmation Dialog */}
      {dialogBox && (
      
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setDialogBox(false)}>

          <div className="bg-white p-6 rounded-lg shadow-lg w-80" 
           onClick={(e) => e.stopPropagation()} >
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDialogBox(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
