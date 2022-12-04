import { FC } from "react";
import type { Publication as PublicationType } from "../types/publication";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const ProfilePublications: FC<{ profileId: string }> = ({ profileId }) => {
    console.log(profileId);
  const { data, error } = useSWR(
    `/api/fetchPublicationsByProfileId?profileId=${profileId}&limit=10`,
    fetcher
  );

//   console.log(data);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <div className="flex flex-col font-myriad mb-8">
        {data.userPublication?.map((publication: PublicationType) => (
          <div className="rounded-lg bg-white mt-4 p-6 flex flex-col">
            <div className="flex gap-4">
              
              <div className=" justify-center col-span-4 flex flex-col">
                <div className="text-emerald-800 font-semibold text-lg">
                  {publication.metadata.name}
                </div>
                <div className="text-sm text-gray-400">
                  {publication.createdAt}
                </div>
                <div className="text-gray-800 mt-4 text-lg">
                  {publication.metadata.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfilePublications;


