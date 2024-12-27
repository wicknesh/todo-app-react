import axios from "axios"
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../utils/UserProvider";

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://todo-app-8x4y.onrender.com/user/login', {
        email,
        password,
      });

      if(response.status === 200) {
        alert(response.data.message);
        const user = response.data.user;
        setUser(user);
        navigate('/task');
      }
    } catch (error) {
        setErrorMessage(
          error.response?.data?.message || 'Something went wrong. Please try again.'
        );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <header>
        <img className="w-60 h-auto mx-auto mt-24" src="../public/images/logo-white.png" alt="ToDoList Logo" />
      </header>
      <div className="flex flex-col justify-center items-center w-96">
        <div className="mt-10 text-white text-[2rem] font-bold">Login</div>
        <input
          type="text" 
          id="email" 
          placeholder="Email address" 
          className="mt-4 px-4 py-2 border rounded w-full" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          id="password" 
          placeholder="Password" 
          className="mt-4 px-4 py-2 border rounded w-full" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
          <p>{errorMessage}</p>  
        )}
        <Link to='/signup' className="text-white text-sm mt-3">New user? Click here</Link>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600" onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Home