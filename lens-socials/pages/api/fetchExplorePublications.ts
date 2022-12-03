// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { explorePublications } from "../../util/queries/getExplorePublications";

import { Publication } from "../../types/publication";


type Data = {
  publications: Publication[];
};

const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API

export const client = createClient({
  url: APIURL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let publicationList: Publication[] = [];
  
  try {
    let sortCriteria = req.query.sortCriteria;
    let limit = req.query.limit;
    const response = await client
      .query(explorePublications, { sortCriteria, limit })
      .toPromise();
    publicationList = response.data.explorePublications.items;
  } catch (error) {
    console.log(`fetchExplorePublications failed due to ` + error);
  }
  res.status(200).json( { publications: publicationList});
}
