import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function UserMenu({ setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Show user icon with dropdown if logged in
  return (
    <div className="relative" ref={menuRef}>
      <div onClick={() => setMenuOpen((prev) => !prev)}>
        <FaUser className="cursor-pointer" size={27} />
      </div>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-[#034e29] overflow-hidden border border-gray-300 rounded-xl shadow-lg z-50">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 rounded-xl cursor-pointer hover:bg-[#448065]">
              Log Out
          </button>
        </div>
      )}
    </div>
  );
}
