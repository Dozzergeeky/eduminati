"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Search, Sun, Moon } from "lucide-react";
import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
//import the aboutRef from the root page
import Home from "@/app/page";


export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="border-b bg-slate-50">
      <div className="flex h-16 items-center px-8 my-1 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" width={120} height={120} alt="Logo" />
        </Link>

        <form
          action=""
          className={`flex items-center space-x-2 mx-20 border border-gray-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md focus-within:shadow-md transition-all duration-200 ${
            searchFocused ? "w-96" : "w-64"
          }`}
        >
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full text-sm placeholder-gray-400 focus:outline-none bg-slate-50"
          />
        </form>

        <div className="flex items-center space-x-10">
          <Link
            href="/teachers"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Instructors
          </Link>
          <Link
            href="/courses"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Courses
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About Us
          </Link>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="focus:outline-none"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-500 mr-4" />
            ) : (
              <Moon className="w-5 h-5 text-gray-500 mr-4" />
            )}
          </button>

          <SignedOut>
            <div className="flex gap-4">
              <SignInButton mode="modal">
                <Button className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-indigo-800 transition-all">
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button className="bg-white border-1 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-slate-50 transition-all">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
