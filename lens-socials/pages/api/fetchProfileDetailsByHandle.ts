// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { getProfileDetailsByHandle } from "../../util/queries/getProfileDetailsByHandle";
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

  let profileDetails = {}
  try {
    const response = await client
      .query(getProfileDetailsByHandle, { req.query.handles, req.query.limit })
      .toPromise();
    const profileDetails = response.data;
    return profileDetails;
  } catch (error) {
    console.log(`fetchProfileDetailsByHandle failed due to ` + error);
  }
  res.status(200).json( profileDetails );
}
