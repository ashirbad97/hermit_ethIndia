// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { mutualFollowersProfiles } from "../../util/queries/getMutualFollowersProfiles";

import { Followers } from "../../types/followers"

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
  } catch (error) {
    console.log(`fetchRecommendedProfiles failed due to ` + error);
  }
  res.status(200).json({ followers: mutualFollowersList });
}
