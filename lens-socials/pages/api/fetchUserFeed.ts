// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { userFeed } from "../../util/queries/getUserFeed";
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

  let userFeedList = {}
  try {
    const response = await client
      .query(userFeed, { req.query.profileId, req.query.limit })
      .toPromise();
    const userFeedList = response.data;
    return userFeedList;
  } catch (error) {
    console.log(`fetchUserFeed failed due to ` + error);
  }
  res.status(200).json( userFeedList );
}
