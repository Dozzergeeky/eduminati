import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 mb-4">Sign in to continue</p>
        <div className="border-t border-gray-200 my-4"></div>
        <SignIn />
      </div>
    </main>
  );
}
