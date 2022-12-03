export interface Profile {
  id: string;
  name: string;
  bio: string;
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
}
