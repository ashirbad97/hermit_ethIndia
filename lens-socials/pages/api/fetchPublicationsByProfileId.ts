// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { publicationsByProfileId } from "../../util/queries/getPublicationsByProfileId";

import { Publication } from "../../types/publication";


type Data = {
  userPublication: Publication[];
};

const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API

export const client = createClient({
  url: APIURL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let userPublicationList: Publication[] = [];

  try {
    let profileId = req.query.profileId;
    let limit = req.query.limit;
    const response = await client
      .query(publicationsByProfileId, { profileId, limit })
      .toPromise();
    userPublicationList = response.data.publications.items;
  } catch (error) {
    console.log(`fetchPublicationsProfileId failed due to ` + error);
  }
  res.status(200).json({userPublication: userPublicationList});
}
