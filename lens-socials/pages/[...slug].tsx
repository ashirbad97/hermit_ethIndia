import { FC, useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";
import { createClient } from "urql";

import MutualFollowers from "../components/MutualFollowers";

import type { Profile } from "../types/profile";
import ProfilePublications from "../components/ProfilePublications";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { profileDetailsByHandle } from "../util/queries/getProfileDetailsByHandle";
import { connectWallet } from "./api/api";

import { Chat } from "@pushprotocol/uiweb";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const OtherUserProfile: FC<{ profile: Profile }> = ({ profile }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  let connectWalletFromPage = async () => await connectWallet();

  useEffect(() => {
    let add = connectWalletFromPage().then((r) => setAddress(r));
  });

  // fetch and set profile handle here
  const viewingpProfileHandle = "yoginth.test";

  // //your profile handle will be passed from parent
  // const yourProfileId = "ashirbad97.test";

  // const { data, error } = useSWR(
  //   `/api/fetchProfileDetailsByHandle?handles=${viewingpProfileHandle}`,
  //   fetcher
  // );
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  // fetching the profileID from fetched data to get the mutual followers
  // const viewingProfileId: string = data?.profileDetails[0].id;

  const viewingProfileId = "0x15";

  let profilePic: string = "";
  if (profile.picture?.original?.url != undefined) {
    profilePic = (profile.picture?.original?.url).includes("ipfs://")
      ? "https://ipfs.io/" + profile.picture?.original?.url.replace(":/", "")
      : profile.picture?.original?.url;
  }

  let coverPic: string = "";
  if (profile.coverPicture?.original?.url != undefined) {
    coverPic = (profile.coverPicture?.original?.url).includes("ipfs://")
      ? "https://ipfs.io/" +
        profile.coverPicture?.original?.url.replace(":/", "")
      : profile.coverPicture?.original?.url;
  } else {
    coverPic = "https://picsum.photos/1600/450";
  }

  return (
    <>
      <div className="bg-gray-200">
        <Head>
          <title>Profile Page</title>
          <meta name="description" content="Profile Page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header value={inputValue} onChange={setInputValue} />

        <Chat
          account={address} //user address
          supportAddress={profile.ownedBy}
          apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
          env="staging"
        />

        <div className="text-white flex flex-col justify-start">
          <div className="flex flex-col">
            <div className="h-80">
              <Image
                className="rounded-md"
                src={coverPic}
                width={1600}
                height={450}
                alt={profile.name}
              />
            </div>
            <div className="flex justify-center">
              <Image
                className="rounded-full"
                src={profilePic}
                width={200}
                height={200}
                alt={profile.name}
              />
            </div>
            <div className="flex flex-col items-center mt-4 font-gotham">
              <div className="text-emerald-800 text-2xl font-bold">
                {profile.name}
              </div>
              <div className="text-gray-400 text-xl">@{profile.handle}</div>
              <div className="text-emerald-900 text-xl mt-2 font-semibold font-gotham">
                {profile.bio}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 container mx-auto text-emerald-900">
            <div className="col-span-1 flex flex-row-reverse">
              <div>
                <span className="font-bold">
                  {" "}
                  {profile.stats.totalPublications}
                </span>{" "}
                Publications
              </div>
            </div>
            <div className=" col-span-1">
              <div>
                <span className="font-bold">{profile.stats.totalCollects}</span>{" "}
                Collects
              </div>
            </div>
            <div className="col-span-1 flex flex-row-reverse">
              <div>
                <span className="font-bold">
                  {profile.stats.totalFollowers}
                </span>{" "}
                Followers
              </div>
            </div>
            <div className="col-span-1">
              <div>
                <span className="font-bold">
                  {profile.stats.totalFollowing}
                </span>{" "}
                Following
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center flex-col">
          <div className="text-lg text-emerald-800 font-semibold mt-4">
            Mutual Followers
          </div>
          <MutualFollowers
            viewingProfileId={viewingProfileId}
            yourProfileId={profile.id}
          />
          <div></div>
        </div>

        <ProfilePublications profileId={profile.id} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const handles = params?.slug[0];
  const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API
  const client = createClient({
    url: APIURL,
  });

  let profileDetailsList: Profile[];

  const response = await client
    .query(profileDetailsByHandle, { handles })
    .toPromise();

  profileDetailsList = response.data.profiles.items;

  return {
    props: {
      profile: profileDetailsList[0],
    },
  };
};

export default OtherUserProfile;
