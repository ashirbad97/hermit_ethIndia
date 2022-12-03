export const getProfileInterests = `query Profile ($profileId:ProfileId!){
    profile(request: { profileId: $profileId}) {
      id
      interests
    }
  }
  `;