// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { profileSearch } from "../../util/queries/getProfileSearch";
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

  let profileDetails= Array<{
    profileId: string;
    name: string;
    bio: string;
    isFollowedByMe: boolean;
    isFollowing: boolean
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
  }>;

  try {
    const response = await client
      .query(profileSearch, { req.query.searchQuery,req.query.searchType, req.query.limit })
      .toPromise();
    const searchResultList = response.data.search.__typename["ProfileSearchResult"].items;
    return searchResultList;
  } catch (error) {
    console.log(`fetchProfileSearch failed due to ` + error);
  }
  res.status(200).json( searchResultList );
}
