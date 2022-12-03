// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { explorePublications } from "../../util/queries/getExplorePublications";
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

  let publicationList = {}
  try {
    const response = await client
      .query(explorePublications, { req.query.sortCriteria, req.query.limit })
      .toPromise();
    const publicationList = response.data;
    return publicationList;
  } catch (error) {
    console.log(`fetchExplorePublications failed due to ` + error);
  }
  res.status(200).json( publicationList );
}
