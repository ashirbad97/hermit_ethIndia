// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { whoReactedPublication } from "../../util/queries/getWhoReactedPublication";
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

  let reactedPublicationList = {}
  try {
    const response = await client
      .query(whoReactedPublication, { req.query.publicationId })
      .toPromise();
    const reactedPublicationList = response.data;
    return reactedPublicationList;
  } catch (error) {
    console.log(`fetchWhoReactedPublication failed due to ` + error);
  }
  res.status(200).json( reactedPublicationList );
}
