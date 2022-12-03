// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { publicationsByProfileId } from "../../util/queries/getPublicationsByProfileId";

type UserPublication= {
  __typename: string;
  id: string;
  metadata: {
    name: string;
    description: string;
    content: string;
    media: Array<{
      original: {
        url: string;
      }
    }>;
  };
  createdAt: string;     
};

type Data = {
  userPublication: UserPublication[];
};

const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API

export const client = createClient({
  url: APIURL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let userPublicationList: UserPublication[] = [];

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
