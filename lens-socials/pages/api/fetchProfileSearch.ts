// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { profileSearch } from "../../util/queries/getProfileSearch";

type ProfileDetails = {
  profileId: string;
  name: string;
  bio: string;
  isFollowedByMe: boolean;
  isFollowing: boolean
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
  let profilesList: ProfileDetails[] = [];

  try {
    let query = req.query.query;
    let type = req.query.type;
    let limit = req.query.limit;
    
    const response = await client
      .query(profileSearch, { query, type, limit })
      .toPromise();
      profilesList = response.data.search.items;
  } catch (error) {
    console.log(`fetchProfileSearch failed due to ` + error);
  }
  res.status(200).json( {profileDetails: profilesList} );
}
