import { FC, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UserProfile: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const { data, error } = useSWR(
    "/api/fetchExploreProfiles?sortCriteria=MOST_FOLLOWERS",
    fetcher
  );

  return (
    <>
      <div className="bg-gray-300">
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header value={inputValue} onChange={setInputValue} />
    </div>
    </>
  );
};

export default UserProfile;