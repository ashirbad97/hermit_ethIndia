// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { mutualFollowersProfiles } from "../../util/queries/getMutualFollowersProfiles";

type Followers = {
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
};

type Data = {
  followers: Followers[];
};

const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API

export const client = createClient({
  url: APIURL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let mutualFollowersList: Followers[] = [];
  try {
    let viewingProfileId = req.query.viewingProfileId;
    let yourProfileId = req.query.yourProfileId;

    const response = await client
      .query(mutualFollowersProfiles, { viewingProfileId, yourProfileId })
      .toPromise();
    mutualFollowersList = response.data.mutualFollowersProfiles.items;
    return mutualFollowersList;
  } catch (error) {
    console.log(`fetchRecommendedProfiles failed due to ` + error);
  }
  res.status(200).json( { followers: mutualFollowersList } );
}
