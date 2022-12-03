import Image from "next/image";
import { FC } from "react";
import logo from "../public/logo.svg";
import Search from "./Search";

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
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
