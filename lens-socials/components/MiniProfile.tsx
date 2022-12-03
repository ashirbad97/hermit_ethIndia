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
      <div className="grid grid-cols-5">
        <div className="cols-span-1">
          <Image src={profilePic} width={32} height={32} alt="profile pic" />
        </div>
        <div className="cols-span-3 flex flex-col">
          <div>{profile.name}</div>
          <div>@{profile.handle}</div>
        </div>
        <div className="cols-span-1">
          <button className="btn bg-emerald-500">
            <Image
              alt="follow"
              src={cameraImg}
              className="h-4 flex items-center justify-center"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default MiniProfile;
