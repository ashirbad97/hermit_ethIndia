import { FC } from "react";
import useSWR from "swr";
import { Profile } from "../types/profile";
import MiniProfile from "./MiniProfile";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MostFollowedProfils: FC = () => {
  const { data, error } = useSWR(
    "/api/fetchExploreProfiles?sortCriteria=MOST_FOLLOWERS",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <div className="text-white w-auto flex flex-col justify-start">
        <div className="text-xl">Who to Follow?</div>
        <div className="flex flex-col">
          {data.profiles.map((profile: Profile) => (
            <MiniProfile {...profile} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MostFollowedProfils;
