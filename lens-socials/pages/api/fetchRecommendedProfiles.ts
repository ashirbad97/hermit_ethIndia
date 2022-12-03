// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { recommendedProfiles } from "../../util/queries/getRecommendedProfiles";

import { Profile } from "../..//types/profile";


type Data = {
  recommendedProfile: Profile[];
};

const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API

export const client = createClient({
  url: APIURL,
});

export default async function handler(
  req: NextApiRequest,  
  res: NextApiResponse<Data>
) {

  let recommendedProfilelist: Profile[] = [];
  try {

    const response = await client
      .query(recommendedProfiles, {})
      .toPromise();
      recommendedProfilelist = response.data.recommendedProfiles;
  } catch (error) {
    console.log(`fetchRecommendedProfiles failed due to ` + error);
  }
  res.status(200).json( {recommendedProfile: recommendedProfilelist} );
}
