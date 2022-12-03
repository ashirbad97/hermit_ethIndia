// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "urql";
import { userFeed } from "../../util/queries/getUserFeed";

type UserFeed= {
  root: {
    id: string;
    profile: {
      id: string;
      name: string;
      bio: string;
      isFollowedByMe: boolean;
      isFollowing: boolean;
      handle: string;
      picture: {
        original: {
          url: string;
        };
      };
      coverPicture: {
        original: {
          url: string;
        };
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
    stats : {
      totalAmountOfMirrors: number;
      totalAmountOfCollects: number;
      totalAmountOfComments: number;
    };
    metadata: {
      name: string;
      description: string;
      content: string;
      media: Array<any>;
    };
    createdAt: string;
  }
};


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
  res.status(200).json( {userFeed: userFeedList} );
}
