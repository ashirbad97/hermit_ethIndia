// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { getProfileSearch } from "../../util/queries/getProfileSearch";
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

  let searchResultList = {}
  try {
    const response = await client
      .query(getProfileSearch, { req.query.searchQuery,req.query.searchType, req.query.limit })
      .toPromise();
    const searchResultList = response.data;
    return searchResultList;
  } catch (error) {
    console.log(`fetchProfileSearch failed due to ` + error);
  }
  res.status(200).json( searchResultList );
}
