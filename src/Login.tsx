import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
// Define types for User and Credentials
type User = {
  username: string;
  password: string;
};

type Credentials = {
  username: string;
  password: string;
};


type LoginProps = {
    onLogin: () => void;
  };

const Login: React.FC<LoginProps> = ({ onLogin }: LoginProps) => {
  const initialCredentials: Credentials = {
    username: '',
    password: '',
  };

  const [credentials, setCredentials] = useState<Credentials>(initialCredentials);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async () => {
    try {
        // Replace with your actual server endpoint
        const response = await axios.post<string>('http://localhost/shop/', credentials);
        console.log('login ', response);
        if (response.data !== 'INVALID_CREDENTIALS') {
          setIsLoggedIn(true);
          //alert('Login successful!');
          console.log('navigate?');
          navigate('/product-list');
        } else {
          alert('Invalid credentials. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    /*const user: User = { username: 'user123', password: 'password123' };
    if (credentials.username === user.username && credentials.password === user.password) {
      setIsLoggedIn(true);
      alert('Login successful!');
    } else {
      alert('Invalid credentials. Please try again.');
    }*/
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials(initialCredentials);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h2>Welcome, {credentials.username}!</h2>
          <button onClick={handleLogout}>Logout</button>
          <ProductList/>
        </>
      ) : (
        <>
            <h2>Login</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                />
                </div>
                <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default Login;