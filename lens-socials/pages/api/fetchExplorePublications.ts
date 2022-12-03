// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { explorePublications } from "../../util/queries/getExplorePublications";



type Publication = {
  __typename: string;
  id: string;
  profile: {
    id: string;
    name: string;
    bio: string;
    isFollowedByMe: boolean;
    isFollowing: string;
    handle: string;
    picture: {
      original: {
        url: string
      }
    };
    coverPicture: {
      original: {
        url: string
      }
    };
    stats: {
      totalFollowers: number;
      totalFollowing: number;
      totalPosts: number;
      totalComments: number;
      totalMirrors: number;
      totalPublications: number;
      totalCollects: number;
    };
  }; 
  stats: {
    totalAmountOfMirrors: number;
    totalAmountOfCollects: number;
    totalAmountOfComments: number;
  };
  metadata: {
      name: string;
      description: string;
      content: string;
      media: Array<any>
  };
  createdAt: string;
  reaction: any;
  mirrors: Array<any>;
  hasCollectedByMe: boolean;
};

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
