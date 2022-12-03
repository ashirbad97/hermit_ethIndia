import { Profile } from "./profile";

export interface Publication {
    __typename: string;
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
        media: Array<any>
    };
    createdAt: string;
    reaction: any;
    mirrors: Array<any>;
    hasCollectedByMe: boolean;
};