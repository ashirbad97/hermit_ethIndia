import { FC } from "react";
import { Profile } from "../types/profile";
import Image from "next/image";
import cameraImg from "../public/img_camera_28X28.svg";

const MiniProfile: FC<Profile> = (profile) => {
  let profilePic: string = "";
  if (profile.picture?.original?.url != undefined) {
    profilePic = (profile.picture?.original?.url).includes("ipfs://")
      ? "https://ipfs.io/" + profile.picture?.original?.url.replace(":/", "")
      : profile.picture?.original?.url;
  }
  return (
    <>
      <div className="grid grid-cols-4 w-full p-4 gap-4">
        <div className="col-span-1">
          <Image
            src={profilePic}
            width={64}
            height={64}
            alt="profile pic"
            className="rounded-full"
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <div className="text-gray-700 font-myriad">{profile.name}</div>
          <div className="text-gray-400 font-myriad text-sm">
            @{profile.handle}
          </div>
        </div>
        <div className="col-span-1">
          <button className="btn bg-emerald-600 p-2 rounded-md">
            <Image
              alt="follow"
              src={cameraImg}
              className="h-6 w-6 flex items-center justify-center"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default MiniProfile;
