import Button from "@/components/ui/Button";
import { Eye } from "lucide-react";

export default function RegisterUser() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h3 className="font-bold text-2xl mb-2">Register</h3>
        <p className="text-xs text-gray-400 mb-6">Become part of us</p>
        <form className="space-y-6">
          <div>
            <input className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1 transition border-gray-300 focus:border-blue-500 focus:ring-blue-200 " type="text" placeholder="Enter username" />
          </div>

          <div>
            <input className="border rounded-md px-4 py-2 w-full focus: outline-none focus:ring-1 transition border-gray-300 focus:border-blue-500 focus:ring-blue-200" type="email" placeholder="Enter Email"/>
          </div>

          <div className="relative">
            <Eye className="absolute top-3 right-3 cursor-pointer text-gray-700" size={20} />
            <input className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1 transition border-gray-300 focus:border-blue-500 focus:ring-blue-200" type="password" placeholder="Enter Password"/>
          </div>

          <div className="relative">
            <Eye className="absolute top-3 right-3 text-gray-700 cursor-pointer" size={20} />
            <input className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1 transition border-gray-300 focus:border-blue-500 focus:ring-blue-200" type="password" placeholder="Enter Confirm-Password"/>
          </div>

          <div>
            <Button type="submit" text="Register" />
          </div>

        </form>
      </div>
    </div>
  )
}
