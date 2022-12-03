import { FC } from "react";
import Image from "next/image";

const PostField: FC = () => {
  return (
    <>
      <div className="container bg-white flex flex-col rounded-lg shadow-md">
        <div className="p-4 flex gap-6">
          <Image
            src="/img_avatar.png"
            width={128}
            height={128}
            alt="avatar"
            className="h-16 rounded-full w-16 "
          />
          <textarea
            placeholder="Sup?"
            className="placeholder:text-gray-300 
            text-gray-600
            outline-none text-xl font-myriad resize-none w-full"
          />
        </div>
        <div className="flex flex-row-reverse mr-8 mb-4">
          <button
            className="cursor-pointer text-white px-6 py-2
           rounded-xl font-bold bg-emerald-700 
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
