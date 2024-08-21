import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users?email=${data.email}&password=${data.password}`
      );

      if (response.data.length > 0) {
        onLogin(response.data[0]); // Redirect to the welcome page after successful login
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed, please try again later.");
    }
  };

  return (
    <div className="absolute top-16 left-0 right-0 flex justify-center items-center bg-gray-50 h-[calc(100vh-64px)]">
      <div className="w-96 bg-white p-6 rounded shadow-md border-2 border-purple-600">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="p-2 border rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="p-2 border rounded w-full"
          />
          <button type="submit" className="bg-purple-600 text-white p-2 rounded w-full">
            Login
          </button>
        </form>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
