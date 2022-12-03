// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { mutualFollowersProfiles } from "../../util/queries/getMutualFollowersProfiles";
type Data = {
  name: string;
};

const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API

export const client = createClient({
  url: APIURL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let mutualFollowersList: Array<{
    id: string;
    profile: {
      id: string;
      name: string;
      bio: string;
      isFollowedByMe: boolean;
      isFollowing: string;
      handle: string;
      picture: {
        original: {
          url: string
        }
      };
      coverPicture: {
        original: {
          url: string
        }
      };
      stats: {
        totalFollowers: number;
        totalFollowing: number;
        totalPosts: number;
        totalComments: number;
        totalMirrors: number;
        totalPublications: number;
        totalCollects: number;
      };
    }; 

  }>;

  try {
    const response = await client
      .query(mutualFollowersProfiles, { req.query.viewingProfileId, req.query.yourProfileId })
      .toPromise();
    const mutualFollowersList = response.data.mutualFollowersProfiles.items;
    return mutualFollowersList;
  } catch (error) {
    console.log(`fetchRecommendedProfiles failed due to ` + error);
  }
  res.status(200).json( mutualFollowersList );
}
