// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { userFeed } from "../../util/queries/getUserFeed";
import type { UserFeed } from "../../types/userFeed";

type Data = {
  userFeed: UserFeed[];
};

const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API

export const client = createClient({
  url: APIURL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let userFeedList: UserFeed[] = [];
  try {
    let profileId = req.query.profileId;
    let limit = req.query.limit;

    const response = await client
      .query(userFeed, { profileId, limit })
      .toPromise();

    userFeedList = response.data.feed.items;
  } catch (error) {
    console.log(`fetchUserFeed failed due to ` + error);
  }
  res.status(200).json({ userFeed: userFeedList });
}
