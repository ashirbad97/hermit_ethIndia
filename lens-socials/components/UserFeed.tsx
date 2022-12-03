import { FC } from "react";
import type { UserFeed } from "../types/userFeed";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const UserFeed: FC<{ profileId: string }> = ({ profileId }) => {
  const { data, error } = useSWR(
    `/api/userFeed?profileId?profileId=${profileId}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <div className="flex flex-col">
        {data.userFeed.map((feed: UserFeed) => (
          <div className="rounded-lg bg-white mt-4 p-6 flex flex-col">
            <div className="grid grid-cols-5">
              <Image
                src={
                  feed.root.profile.picture?.original.url
                    ? feed.root.profile.picture?.original.url
                    : "https://picsum.photos/64"
                }
                alt="profile image"
                width={32}
                height={32}
                className="col-span-1"
              />
              <div className="text-lg font-semibold col-span-3 flex flex-col">
                <div>{feed.root.profile.name}</div>
                <div>{feed.root.profile.handle}</div>
              </div>
              <div className="col-span-1">opt</div>
            </div>
            <div className="text-gray-400">
              {feed.root.metadata.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserFeed;
