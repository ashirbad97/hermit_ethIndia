// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { exploreProfiles } from "../../util/queries/getExploreProfiles";
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

  let profilesList: Array<{
    id: string;
    name: string;
    bio:string; 
    handle: string;
    picture: {
      original: {
        url: string;
      }
    };
    coverPicture: {
      original: {
        url: string;
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
  }>
  try {
    const response = await client
      .query(exploreProfiles, { req.query.sortCriteria })
      .toPromise();
    const profilesList = response.data.exploreProfiles.items;
    return profilesList;
  } catch (error) {
    console.log(`fetchExploreProfiles failed due to ` + error);
  }
  res.status(200).json( profilesList );
}
