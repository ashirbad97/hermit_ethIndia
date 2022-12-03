export const profileInterests = `query Profile ($profileId:ProfileId!){
    profile(request: { profileId: $profileId}) {
      id
      interests
    }
  }
  `;