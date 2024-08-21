import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Register the user by posting to the JSON server
      await axios.post("http://localhost:5000/users", data);
      reset();
      onRegister(); // Redirect to the login page after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="absolute top-16 left-0 right-0 flex justify-center items-center bg-gray-50 h-[calc(100vh-64px)]">
      <div className="w-96 bg-white p-5 rounded shadow-md border-2 border-purple-600">
        <h2 className="text-xl font-semibold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName", { required: true })}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName", { required: true })}
            className="p-2 border rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", { required: true })}
            className="p-2 border rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="p-2 border rounded w-full"
          />
          <button type="submit" className="bg-purple-600 text-white p-2 rounded w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
