import { FC } from "react";
import Image from "next/image";

const PostField: FC = () => {
  return (
    <>
      <div className="container bg-white flex flex-col">
        <div>
          <Image
            src="/img_avatar.png"
            width={64}
            height={64}
            alt="avatar"
            className="h-8 rounded-full w-8"
          />
          <input
            placeholder="Sup?"
            className="placeholder:text-gray-500 text-gray-500 text-sm"
          />
        </div>
        <div className="mt-2">
          <button className="cursor-pointer text-white p-3 rounded-xl font-bold bg-emerald-500 btn">
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default PostField;
