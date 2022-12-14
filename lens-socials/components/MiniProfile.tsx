import { FC, useState } from "react";
import { Profile } from "../types/profile";
import Image from "next/image";
import cameraImg from "../public/img_camera_28X28.svg";
import { followUser } from "../pages/api/api";
import Link from "next/link";

const MiniProfile: FC<Profile> = (profile) => {
  let profilePic: string = "";
  if (profile.picture?.original?.url != undefined) {
    profilePic = (profile.picture?.original?.url).includes("ipfs://")
      ? "https://ipfs.io/" + profile.picture?.original?.url.replace(":/", "")
      : profile.picture?.original?.url;
  }
  const [followed, setFollowed] = useState<boolean>(false);

  return (
    <>
      <Link href={`/${profile.handle}`}>
        <div className="grid grid-cols-4 w-full p-4 ml-4 mt-2">
          <div className="col-span-1">
            <Image
              src={profilePic}
              width={64}
              height={64}
              alt="profile pic"
              className="rounded-full"
            />
          </div>
          <div className="col-span-2 flex flex-col justify-center">
            <div className="text-gray-700 font-myriad text-lg">
              {profile.name}
            </div>
            <div className="text-gray-400 font-myriad text-md">
              @{profile.handle}
            </div>
          </div>

          <div className="col-span-1 my-auto">
            {!followed && (
              <button
                className="btn bg-emerald-600 p-2 rounded-md"
                onClick={async () => await followUser(profile.id)}
              >
                <Image
                  alt="follow"
                  src={cameraImg}
                  className="h-6 w-6 flex items-center justify-center"
                />
              </button>
            )}
            {followed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#047857"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default MiniProfile;
