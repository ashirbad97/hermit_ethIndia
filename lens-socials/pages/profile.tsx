import { FC, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import useSWR from "swr";
import Image from "next/image";

import MutualFollowers from "../components/MutualFollowers";

import { Profile } from "../types/profile";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UserProfile: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  
  // fetch and set profile handle here
  const viewingpProfileHandle = "yoginth.test";



  //your profile handle will be passed from parent
  const yourProfileId = "ashirbad97.test";

  const { data , error } = useSWR(
    `/api/fetchProfileDetailsByHandle?handles=${viewingpProfileHandle}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  

  // fetching the profileID from fetched data to get the mutual followers
  const viewingProfileId: string = data?.profileDetails[0].id;

  let profilePic: string = "";
  if (data?.profileDetails[0]?.picture?.original?.url != undefined) {
    profilePic = (data.profileDetails[0].picture?.original?.url).includes("ipfs://")
      ? "https://ipfs.io/" + data.profileDetails[0].picture?.original?.url.replace(":/", "")
      : data.profileDetails[0].picture?.original?.url;
  }

  let coverPic: string = "";
  if (data?.profileDetails[0]?.coverPicture?.original?.url != undefined) {
    coverPic = (data.profileDetails[0].coverPicture?.original?.url).includes("ipfs://")
      ? "https://ipfs.io/" + data.profileDetails[0].coverPicture?.original?.url.replace(":/", "")
      : data.profileDetails[0].coverPicture?.original?.url;
  } else {
    coverPic = "https://picsum.photos/1600/450";
  }
console.log(coverPic);
  
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

          <div>
            <div>
                <div className="h-80">
                  <Image 
                      className="border-8 border-lime-600 rounded-md" 
                      src={coverPic} 
                      width={1600} 
                      height={450} 
                      alt={data.profileDetails[0].name} />
                </div>
                <div>
                  <div className="flex">
                    <Image 
                      className="border-8 border-lime-600 rounded-md" 
                      src={profilePic} 
                      width={200} 
                      height={200} 
                      alt={data.profileDetails[0].name} />
                  </div>
                  <div>
                    {data.profileDetails[0].name}
                  </div>
                  <div>
                    @{data.profileDetails[0].handle}
                  </div>                  
                </div>
            </div>


            <div className="grid grid-cols-3">
                <div className="cols-span-1">
                  {data.profileDetails[0].bio}
                </div>
                <div className="cols-span-2">
                  <div>
                    {data.profileDetails[0].stats.totalPublications} Publications
                  </div>
                  <div>
                    {data.profileDetails[0].stats.totalCollects} Collects
                  </div>
                  <div>
                    {data.profileDetails[0].stats.totalFollowers} Followers
                  </div>
                  <div>
                    {data.profileDetails[0].stats.totalFollowing} Following
                  </div>
                </div>
            </div>

            <div>
                Mutual Followers
                <MutualFollowers viewingProfileId={viewingProfileId} yourProfileId={yourProfileId} />
                <div>

                </div>
              </div>

          </div>

        </div>
      </div>

    </div>
    </>
  );
};

export default UserProfile;
