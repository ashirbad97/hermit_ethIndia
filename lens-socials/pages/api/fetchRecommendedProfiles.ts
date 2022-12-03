// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { recommendedProfiles } from "../../util/queries/getRecommendedProfiles";
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

  let recommendedProfilesList= Array<{
    id: string;
    name: string;
    bio: string;
    picture: {
      original: {
        url: string
      }
    }
    handle: string;
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
  }>;

  try {
    const response = await client
      .query(recommendedProfiles, {})
      .toPromise();
    const recommendedProfilesList = response.data.recommendedProfiles;
    return recommendedProfilesList;
  } catch (error) {
    console.log(`fetchRecommendedProfiles failed due to ` + error);
  }
  res.status(200).json( recommendedProfilesList );
}
