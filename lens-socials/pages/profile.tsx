import { FC, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import useSWR from "swr";
import Image from "next/image";

import { Profile } from "../types/profile";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UserProfile: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  
  // fetch and set profile handle here
  const profileHandle = "millionrecords.lens";
  const { data, error } = useSWR(
    `/api/fetchProfileDetailsByHandle?handles=${profileHandle}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>; 
  console.log(data);

  let profilePic: string = "";
  if (data?.profile?.picture?.original?.url != undefined) {
    profilePic = (data.profile.picture?.original?.url).includes("ipfs://")
      ? "https://ipfs.io/" + data.profile.picture?.original?.url.replace(":/", "")
      : data.profile.picture?.original?.url;
  }

  let coverPic: string = "";
  if (data?.profile?.coverPicture?.original?.url != undefined) {
    coverPic = (data.profile.pcoverPictureicture?.original?.url).includes("ipfs://")
      ? "https://ipfs.io/" + data.profile.coverPicture?.original?.url.replace(":/", "")
      : data.profile.coverPicture?.original?.url;
  }

  

  return (
    <>
      <div className="bg-gray-300">
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header value={inputValue} onChange={setInputValue} />

      <div className="text-white w-auto flex flex-col justify-start">
        <div className="flex flex-col">
          {data.profileDetails.map((profile: Profile) => (
            <>
              <div>
                <div className="h-80">
                  {coverPic}
                </div>
                <div>
                  <div>
                    <Image src={profilePic} width={32} height={32} alt={profile.name} />
                  </div>
                  <div>
                    {profile.name}
                  </div>
                  <div>
                    @{profile.handle}
                  </div>                  
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="cols-span-1">
                  {profile.bio}
                </div>
                <div className="cols-span-2">
                  <div>
                    {profile.stats.totalPublications} Publications
                  </div>
                  <div>
                    {profile.stats.totalCollects} Collects
                  </div>
                  <div>
                    {profile.stats.totalFollowers} Followers
                  </div>
                  <div>
                    {profile.stats.totalFollowing} Following
                  </div>

                  
                </div>
              </div>


            </>
          ))}
        </div>
      </div>

    </div>
    </>
  );
};

export default UserProfile;
