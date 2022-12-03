import Image from "next/image";
import { FC } from "react";
import logo from "../public/logo.svg";
import Search from "./Search";
import { loginUser } from "../pages/api/api"
const Header: FC<{
  value: string;
  onChange: (e: any) => void;
}> = ({ value, onChange }) => {
  return (
    <>
      <header className="sticky top-0 z-10 w-full bg-white border-b font-gotham font-semibold ">
        <div className="container px-5 mx-auto max-screen-xl">
          <div className="flex relative justify-between items-center h-14">
            <div className="flex justify-start items-center gap-x-4">
              <a href="/">
                <Image src={logo} alt="logo" className="w-8 h-8" />
              </a>
              <Search value={value} onChange={onChange} />
              <a>Home</a>
              <a>Explore</a>
            </div>
            <div className="flex items-center gap-4">
              <a
                className="flex items-start justify-center rounded-md hover:bg-gray-300 p-1 hover:bg-opacity-20 min-w-[40px]"
                href="/messages"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </a>
              <a
                className="flex items-start justify-center rounded-md hover:bg-gray-300 p-1 hover:bg-opacity-20 min-w-[40px]"
                href="/notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </a>
            </div>
            <div>
              <button onClick={loginUser}>Sign In</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
