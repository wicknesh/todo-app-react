import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "../utils/UserProvider.jsx";

const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { setUser } = useContext(UserContext);

    const handleSignup = async() => {
        if(!name || !email || !password){
            setErrorMessage('Please fill all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4500/user/signup', {
                name,
                email,
                password
            });

            setSuccessMessage(response.data.message);
            setErrorMessage('');
            setUser(response.data.user);
            console.log(response.data.user);

            setTimeout(() => {
              window.location.href = '/task';
            }, 1000);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Registration failed');
            setSuccessMessage('');
        }
    }
  return (
    <div className="flex flex-col items-center justify-center">
    <header>
      <img className="w-60 h-auto mx-auto mt-24" src="../public/images/logo-white.png" alt="ToDoList Logo" />
    </header>
    <div className="flex flex-col justify-center items-center w-96">
      <div className="mt-10 text-white text-[2rem] font-bold">Signup</div>
      <input
        type="text"
        id="name"
        placeholder="Name"
        className="mt-4 px-4 py-2 border rounded w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      {successMessage && (
        <p>{successMessage}</p>  
      )}
      {errorMessage && (
        <p>{errorMessage}</p>  
      )}
      <Link to='/' className="text-white text-sm mt-3">Already have an account? Login here</Link>
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600" onClick={handleSignup}>Signup</button>
    </div>
  </div>
  )
}

export default Signup