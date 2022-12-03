import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import PostField from "../components/PostField";
import UserFeed from "../components/UserFeed";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <div className="bg-gray-200">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header value={inputValue} onChange={setInputValue} />
      <div className="container mx-auto mt-8">
        <PostField />
        <UserFeed profileId={"0x02"} />
      </div>
    </div>
  );
}
