import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";  
import bgImage from "../assets/login-bg.jpg"; 
import { useUsers } from "../hooks/useUsers"; 

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
  const navigate = useNavigate();
  const { data: users, isLoading, isError } = useUsers(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    if (!users) return;

    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify({ id: user.id, name: user.name, email: user.email })
      );
      toast("Login successful!", {
        description: `Welcome back, ${user.name}! 🎉`,
      });
      navigate("/home");
    } else {
      toast("Invalid email or password", {
        description: "Please check your credentials and try again.",
      });
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-end bg-cover bg-center bg-no-repeat px-4 md:px-8 lg:px-12"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mr-0 md:mr-8 lg:mr-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ShopSphere</h1>
          <p className="text-gray-600">Your futuristic shopping experience</p>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to your account
        </h2>

        {isLoading && <p className="text-center text-gray-500">Loading users...</p>}
        {isError && (
          <p className="text-center text-red-500">Failed to fetch users</p>
        )}

        {!isLoading && !isError && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                Email
              </Label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium mb-2 block">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" variant="destructive">Login</Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
