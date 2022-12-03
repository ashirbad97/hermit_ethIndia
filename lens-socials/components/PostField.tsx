import { FC } from "react";
import Image from "next/image";

const PostField: FC = () => {
  return (
    <>
      <div className="container bg-white flex flex-col rounded-lg">
        <div className="p-4 flex gap-6">
          <Image
            src="/img_avatar.png"
            width={128}
            height={128}
            alt="avatar"
            className="h-16 rounded-full w-16 "
          />
          <input
            placeholder="Sup?"
            className="placeholder:text-gray-300 
            text-gray-600
            outline-none text-3xl font-myriad"
          />
        </div>
        <div className="mt-2 flex flex-row-reverse mr-8 mb-4">
          <button
            className="cursor-pointer text-white p-4
           rounded-xl font-bold bg-emerald-500 
           btn text-xl"
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default PostField;
