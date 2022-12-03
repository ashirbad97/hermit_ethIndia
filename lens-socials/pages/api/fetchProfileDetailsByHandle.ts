// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { profileDetailsByHandle } from "../../util/queries/getProfileDetailsByHandle";

type ProfileDetails = {
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
};

type Data = {
  profileDetails: ProfileDetails[];
};

const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API

export const client = createClient({
  url: APIURL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let profileDetailsList: ProfileDetails[] = [];
 
  try {
    let handles = req.query.handles;
    let limit = req.query.limit;
    const response = await client
      .query(profileDetailsByHandle, { handles })
      .toPromise();
    console.dir(response)
      profileDetailsList = response.data.profiles.items;
  } catch (error) { 
    console.log(`fetchProfileDetailsByHandle failed due to ` + error);
  }
  res.status(200).json( {profileDetails: profileDetailsList} );
}
