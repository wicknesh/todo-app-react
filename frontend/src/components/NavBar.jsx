import { useContext, useState } from "react"
import { UserContext } from "../utils/UserProvider"
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = ({ clearTasks }) => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [ isOpen, setIsOpen ] = useState(false);

    const handleLogout = () => {
      setUser(null);
      sessionStorage.removeItem('user');
      clearTasks();
      navigate('/');
    }

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    }

  return (
    <div className="container mx-auto flex flex-wrap p-5 md:flex-row items-center justify-between">
        <img src={'../public/images/logo-white.png'} className="w-60 h-auto"/>
        <div className="hidden justify-between md:flex">
          <div className="flex items-center space-x-4">
            <p className="text-white inline-flex items-center font-bold text-lg">{ user?.name }</p>
            <button
              className="inline-flex items-center bg-red-500 border-0 rounded-lg py-2 px-4 mt-4 md:mt-0 text-white"
              onClick={handleLogout}
            >Logout</button>
          </div>
        </div>
        <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isOpen? <X/> : <Menu/>}
            </button>
        </div>
        {isOpen && (
          // <div className="absolute top-16 right-0 mt-2 bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="flex flex-col items-end w-full mt-2 space-y-2">
              <p className="text-white font-bold text-lg">{ user?.name }</p>
              <button
                className="inline-flex items-center bg-red-500 border-0 rounded-lg py-2 px-4 text-white"
                onClick={handleLogout}
              >Logout</button>
            </div>
          //</div>
        )}
    </div>
  )
}

export default NavBar