import { Profile } from "./profile";

export interface UserFeed {
  root: {
    id: string;
    profile: Profile;
    stats: {
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
  };
}
