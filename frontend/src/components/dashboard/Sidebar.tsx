import React, { useState } from "react";
import { LogOut } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

// Define the shape of a single menu item
interface MenuItem {
  label: string;
  path: string;
}

// Props for Sidebar
interface SidebarProps {
  SiderbarMenu?: MenuItem[]; // optional array of menu items
}

const Sidebar: React.FC<SidebarProps> = ({ SiderbarMenu }) => {
  const { logout } = useAuth();
  const navigate = useNavigate()
  const [dialogBox, setDialogBox] = useState(false)

  const confirmLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="h-screen w-56 mt-3 bg-gradient-to-b from-white to-blue-50 text-gray-800 p-6 fixed left-0 shadow-xl z-50 rounded-r-2xl border-r border-blue-100">
      {/* Logo / Title */}
      <Link
        to="/"
        className="flex items-center gap-2 text-blue-600 text-2xl font-extrabold mb-10 transition-all hover:text-green-500"
      >
        StoreManager
      </Link>

      {/* Profile Link */}
      <Link
        to="/dashboard"
        className="flex items-center text-lg font-medium mb-4 px-3 py-2 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all"
      >
        Profile
      </Link>

      {/* Dynamic Menu Items */}
      {SiderbarMenu && SiderbarMenu.length > 0 ? (
        SiderbarMenu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center text-lg font-medium mb-4 px-3 py-2 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all"
          >
            {item.label}
          </Link>
        ))
      ) : (
        <span className="text-gray-400 text-sm italic">No data</span>
      )}

      {/* Logout */}
      <button
          onClick={() => setDialogBox(true)}
          className="flex items-center space-x-3 text-black hover:bg-red-600 px-3 py-2 rounded-lg transition-colors w-full text-left"
        >
          <LogOut />
          <div>Logout</div>
        </button>

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
  );
};

export default Sidebar;
