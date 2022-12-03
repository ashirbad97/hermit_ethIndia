// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { exploreProfiles } from "../../util/queries/getExploreProfiles";

type Profile = {
  id: string;
  name: string;
  bio: string;
  handle: string;
  picture: {
    original: {
      url: string;
    };
  };
  coverPicture: {
    original: {
      url: string;
    };
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
  profiles: Profile[];
};

const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API

export const client = createClient({
  url: APIURL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let profilesList: Profile[] = [];
  try {
    let sortCriteria = req.query.sortCriteria;
    const response = await client
      .query(exploreProfiles, { sortCriteria })
      .toPromise();
    profilesList = response.data.exploreProfiles.items;
  } catch (error) {
    console.log(`fetchExploreProfiles failed due to ` + error);
  }
  res.status(200).json({ profiles: profilesList });
}
