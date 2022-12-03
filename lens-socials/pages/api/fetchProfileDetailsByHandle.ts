// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { profileDetailsByHandle } from "../../util/queries/getProfileDetailsByHandle";
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

  let profileDetails: Array<{
      id: string;
      name: string;
      bio: string;
      picture: {
        original: {
          url: string
        }
      };
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
      .query(profileDetailsByHandle, { req.query.handles, req.query.limit })
      .toPromise();
    const profileDetails = response.data.profiles.items;
    return profileDetails;
  } catch (error) {
    console.log(`fetchProfileDetailsByHandle failed due to ` + error);
  }
  res.status(200).json( profileDetails );
}
