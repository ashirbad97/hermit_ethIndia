import { FC, SyntheticEvent, useState } from "react";

const Search: FC<{
  value: string;
  onChange: (e: any) => void;
}> = ({ value, onChange }) => {
  return (
    <>
      <div className="sm:block">
        <div className="w-full">
          <form>
            <label htmlFor="search">
              <div className="flex">
                <div
                  className="focus-within:ring-1 rounded-xl 
                flex items-center border bg-white
               border-gray-300 focus-within:border-emerald-500
               focus-within:ring-brand-400 w-full within: ring-emerald-400"
                >
                  <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type="text"
                    placeholder="Search..."
                    className="w-full rounded-xl border-none 
                    focus:ring-0 outline-none bg-transparent py-2 px-3 text-sm shadow-sm"
                  />
                  <span
                    tabIndex={-1}
                    className="order-first pl-3 text-zinc-500 [&>*]:peer-focus:text-brand-500 [&>*]:h-5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default Search;
