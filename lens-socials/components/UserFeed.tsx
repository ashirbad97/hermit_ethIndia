import { FC } from "react";
import type { UserFeed as UserFeedType } from "../types/userFeed";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const UserFeed: FC<{ profileId: string }> = ({ profileId }) => {
  const { data, error } = useSWR(
    `/api/fetchUserFeed?profileId=${profileId}&limit=10`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <div className="flex flex-col font-myriad mb-8">
        {data.userFeed.map((feed: UserFeedType) => (
          <div className="rounded-lg bg-white mt-4 p-6 flex flex-col">
            <div className="flex gap-4">
              <Image
                src={
                  feed.root.profile.picture?.original.url != undefined &&
                  (feed.root.profile.picture?.original?.url).includes("ipfs://")
                    ? "https://ipfs.io/" +
                      feed.root.profile.picture?.original?.url.replace(":/", "")
                    : feed.root.profile.picture?.original?.url === undefined
                    ? "https://picsum.photos/64"
                    : feed.root.profile.picture?.original?.url
                }
                alt="profile image"
                width={64}
                height={64}
                objectFit="contain"
                className="col-span-1 rounded-full w-20"
              />
              <Link href={`/${feed.root.profile.handle}`}>
                <div className=" justify-center col-span-4 flex flex-col">
                  <div className="text-emerald-800 font-semibold text-lg">
                    {feed.root.profile.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    @{feed.root.profile.handle}
                  </div>
                  <div className="text-gray-800 mt-4 text-lg">
                    {feed.root.metadata.description}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserFeed;
