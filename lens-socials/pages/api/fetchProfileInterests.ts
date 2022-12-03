// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { profileInterests } from "../../util/queries/getProfileInterests";

import { ProfileInterest } from "../../types/profileInterest";

type Data = {
  profileInterest: ProfileInterest[];
};

const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API

export const client = createClient({
  url: APIURL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let profileInteresetsList: ProfileInterest[] = [];
  try {
    let profileId = req.query.profileId; 
    const response = await client
      .query(profileInterests, { profileId })
      .toPromise();
    profileInteresetsList = response.data.profile;
  } catch (error) {
    console.log(`fetchProfileInterests failed due to ` + error);
  }
  res.status(200).json( {profileInterest: profileInteresetsList} );
}
