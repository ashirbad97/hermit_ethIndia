// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { exploreProfiles } from "../../util/queries/getExploreProfiles";
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

  let profilesList = {}
  try {
    const response = await client
      .query(exploreProfiles, { req.query.sortCriteria })
      .toPromise();
    const profilesList = response.data;
    return profilesList;
  } catch (error) {
    console.log(`fetchExploreProfiles failed due to ` + error);
  }
  res.status(200).json( profilesList );
}
