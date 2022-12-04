import { FC, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import useSWR from "swr";
import Image from "next/image";

import MutualFollowers from "../components/MutualFollowers";

import { Profile } from "../types/profile";
import ProfilePublications from "../components/ProfilePublications";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UserProfile: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  // fetch and set profile handle here
  const viewingpProfileHandle = "yoginth.test";

  //your profile handle will be passed from parent
  const yourProfileId = "ashirbad97.test";

  const { data, error } = useSWR(
    `/api/fetchProfileDetailsByHandle?handles=${viewingpProfileHandle}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  // fetching the profileID from fetched data to get the mutual followers
  // const viewingProfileId: string = data?.profileDetails[0].id;

  const viewingProfileId = "0x15";

  let profilePic: string = "";
  if (data?.profileDetails[0]?.picture?.original?.url != undefined) {
    profilePic = (data.profileDetails[0].picture?.original?.url).includes(
      "ipfs://"
    )
      ? "https://ipfs.io/" +
        data.profileDetails[0].picture?.original?.url.replace(":/", "")
      : data.profileDetails[0].picture?.original?.url;
  }

  let coverPic: string = "";
  if (data?.profileDetails[0]?.coverPicture?.original?.url != undefined) {
    coverPic = (data.profileDetails[0].coverPicture?.original?.url).includes(
      "ipfs://"
    )
      ? "https://ipfs.io/" +
        data.profileDetails[0].coverPicture?.original?.url.replace(":/", "")
      : data.profileDetails[0].coverPicture?.original?.url;
  } else {
    coverPic = "https://picsum.photos/1600/450";
  }
  console.log(coverPic);

  return (
    <>
      <div className="bg-gray-200">
        <Head>
          <title>Profile Page</title>
          <meta name="description" content="Profile Page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header value={inputValue} onChange={setInputValue} />

        <div className="text-white flex flex-col justify-start">
          <div className="flex flex-col">
            <div className="h-80">
              <Image
                className="rounded-md"
                src={coverPic}
                width={1600}
                height={450}
                alt={data.profileDetails[0].name}
              />
            </div>
            <div className="flex justify-center">
              <Image
                className="rounded-full"
                src={profilePic}
                width={200}
                height={200}
                alt={data.profileDetails[0].name}
              />
            </div>
            <div className="flex flex-col items-center mt-4 font-gotham">
              <div className="text-emerald-800 text-2xl font-bold">
                {data.profileDetails[0].name}
              </div>
              <div className="text-gray-400 text-xl">
                @{data.profileDetails[0].handle}
              </div>
              <div className="text-emerald-900 text-xl mt-2 font-semibold font-gotham">
                {data.profileDetails[0].bio}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 container mx-auto text-emerald-900">
            <div className="col-span-1 flex flex-row-reverse">
              <div>
                <span className="font-bold">
                  {" "}
                  {data.profileDetails[0].stats.totalPublications}
                </span>{" "}
                Publications
              </div>
            </div>
            <div className=" col-span-1">
              <div>
                <span className="font-bold">
                  {data.profileDetails[0].stats.totalCollects}
                </span>{" "}
                Collects
              </div>
            </div>
            <div className="col-span-1 flex flex-row-reverse">
              <div>
                <span className="font-bold">
                  {data.profileDetails[0].stats.totalFollowers}
                </span>{" "}
                Followers
              </div>
            </div>
            <div className="col-span-1">
              <div>
                <span className="font-bold">
                  {data.profileDetails[0].stats.totalFollowing}
                </span>{" "}
                Following
              </div>
            </div>
          </div>
        </div>

        <div>
          Mutual Followers
          <MutualFollowers
            viewingProfileId={viewingProfileId}
            yourProfileId={yourProfileId}
          />
          <div></div>
        </div>

        <ProfilePublications profileId={viewingProfileId} />
      </div>
    </>
  );
};

export default UserProfile;
