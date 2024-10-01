import { LoginFrom } from "@/components/LoginForm";

export default function Signup() {
  return (
    <div className="flex flex-col w-full items-center justify-center bg-gray-300 m-4 p-2 max-w-md mx-auto rounded-lg shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]">
      <h1 className="text-4xl font-bold text-primary text-center mb-12 mt-4">
        Sign up
      </h1>
      <LoginFrom loginState="signup" />
    </div>
  );
}
