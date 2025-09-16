import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";


function Login() {
  return (
   <div className="flex items-center justify-center min-h-screen ">

      <div className="w-full max-w-md bg-blue-100 rounded-2xl shadow-lg p-8">
       
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>

        <form className="space-y-5">
         
          <div>
           <Label htmlFor="email" className="mb-4 ml-2">Email:
           </Label>
           <Input type="email" placeholder="Email"/> 
          </div>
          <div>
           <Label htmlFor="pwd" className="mb-4 ml-2">
            Password:
           </Label>
            <Input type="password" placeholder="Password"/>
          </div>
          <Button>Login</Button>

        </form>

        
      </div>
    </div>
  );
}

export default Login;
