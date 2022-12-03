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
      <div className="bg-white rounded-md shadow-md flex flex-col mt-4">
        <div className="flex flex-col ">
          {data.profiles.slice(0, 5).map((profile: Profile) => (
            <MiniProfile {...profile} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MostFollowedProfils;
