import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h3 className="text-2xl font-bold mb-6 text-center">Login</h3>
        <form className="space-y-6">
          <div>
            <input
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
              type="email"
              placeholder="Enter e-mail"
            />
          </div>
          <div>
            <input
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
              type="password"
              placeholder="Enter password"
            />
          </div>
          <div className="flex justify-center">
            <button className="w-full px-6 py-2 rounded-md bg-black text-white hover:bg-gray-900 cursor-pointer transition-colors duration-200 font-medium">
              Login
            </button>
          </div>
          <div>
            <button className="flex items-center justify-center gap-2 w-full bg-gray-100 px-5 py-2 rounded-md hover:bg-gray-200 cursor-pointer transition-colors duration-200 font-medium">
              <Image
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              Sign-in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
