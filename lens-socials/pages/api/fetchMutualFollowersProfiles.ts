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

  let mutualFollowersList = {}
  try {
    const response = await client
      .query(mutualFollowersProfiles, { req.query.viewingProfileId, req.query.yourProfileId })
      .toPromise();
    const mutualFollowersList = response.data;
    return mutualFollowersList;
  } catch (error) {
    console.log(`fetchRecommendedProfiles failed due to ` + error);
  }
  res.status(200).json( mutualFollowersList );
}
