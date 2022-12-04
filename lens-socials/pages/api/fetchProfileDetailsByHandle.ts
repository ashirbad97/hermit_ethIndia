// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { profileDetailsByHandle } from "../../util/queries/getProfileDetailsByHandle";

import { Profile } from '../../types/profile'

type Data = {
  profileDetails: Profile[];
};

const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API

export const client = createClient({
  url: APIURL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let profileDetailsList: Profile[] = [];
 
  try {
    let handles = req.query.handles;
    let limit = req.query.limit;
    const response = await client
      .query(profileDetailsByHandle, { handles })
      .toPromise();
   
      profileDetailsList = response.data.profiles.items;
  } catch (error) { 
    console.log(`fetchProfileDetailsByHandle failed due to ` + error);
  }
  res.status(200).json( {profileDetails: profileDetailsList} );
}
