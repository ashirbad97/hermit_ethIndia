// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { getProfileInterests } from "../../util/queries/getProfileInterests";
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

  let profileInteresetsList = {}
  try {
    const response = await client
      .query(getProfileInterests, { req.query.profileId })
      .toPromise();
    const profileInteresetsList = response.data;
    return profileInteresetsList;
  } catch (error) {
    console.log(`fetchProfileInterests failed due to ` + error);
  }
  res.status(200).json( profileInteresetsList );
}
