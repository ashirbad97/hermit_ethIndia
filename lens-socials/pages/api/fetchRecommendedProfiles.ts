// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { getRecommendedProfiles } from "../../util/queries/getRecommendedProfiles";
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

  let userPublicationList = {}
  try {
    const response = await client
      .query(getRecommendedProfiles, { req.query.profileId, req.query.limit })
      .toPromise();
    const userPublicationList = response.data?.publications?.items;
    return userPublicationList;
  } catch (error) {
    console.log(`fetchRecommendedProfiles failed due to ` + error);
  }
  res.status(200).json( userPublicationList );
}