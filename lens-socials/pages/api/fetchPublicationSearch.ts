// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { getPublicationSearch } from "../../util/queries/getPublicationSearch";
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

  let searchResult = {}
  try {
    const response = await client
      .query(getPublicationSearch, { req.query.searchQuery, req.query.searchType, req.query.limit })
      .toPromise();
    const searchResult = response.data;
    return searchResult;
  } catch (error) {
    console.log(`fetchPublicationSearch failed due to ` + error);
  }
  res.status(200).json( searchResult );
}
