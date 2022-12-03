import { createClient } from "urql";
import { ethers } from "ethers";
import * as IPFS from "ipfs-core";
import { create } from "ipfs-http-client";
import mumbaiTestnetAbi from "./mumbaiTestnetAbi.json";
import omitDeep from 'omit-deep'
// const APIURL = `https://api.lens.dev`
const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API
const CHANNEL_ADDRESS = "0x5a4F5B1661BB975Ded33b8c6BbA62CCaeE2578C3"
const lensContractAddress_mumbaiTestnet =
  "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82"; //Mumbai Testnet address
export const client = createClient({
  url: APIURL,
});
export const authClient = createClient({
  url: APIURL,
  fetchOptions: () => {
    const token = window.localStorage.getItem("accessToken")
    return {
      headers: {
        authorization: token ? `Bearer ${token}` :
          ``
      }
    }
  }
})
// GraphQL Queries
export const authChallenge = `query Challenge($address:EthereumAddress!) {
    challenge(request: { address: $address}) {
      text
    }
  }
  `;
// GraphQL Mutations
export const mut_authentication = `mutation Authenticate ($address:EthereumAddress!,$signature:Signature!){
    authenticate(request: {
      address: $address,
      signature: $signature
    }) {
      accessToken
      refreshToken
    }
  }
  `;
/**
 * @dev
 * Def: Connection with loggedin user's wallet
 */
export const connectWallet = async () => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } catch (error) {
    console.log(`connectWallet failed due to ` + error);
  }
};/**
  * @dev
  * Def: Authentication Function, Fetches a challenge text from the server
  * Bug: For some reason being run twice when called and fails due to reference error and window not found
  */
export const authLoginUser = async (address) => {
  try {
    const response = await client.query(authChallenge, { address }).toPromise();
    const challenge = response.data?.challenge.text;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const signedMessage = await signer.signMessage(challenge);
    const authTokens = await authSignedMessage(address, signedMessage);
    return authTokens
  } catch (error) {
    console.log(`authLogin Function failed due to ` + error);
  }
};
/**
 * @dev
 * Def: Authentication of the signed message from the user, returns a accessToken and refreshToken
 */
export const authSignedMessage = async (address, signedMessage) => {
  try {
    const response = await client
      .mutation(mut_authentication, { address, signature: signedMessage })
      .toPromise();
    return response.data?.authenticate //Fetches the access token and the refresh token
  } catch (error) {
    console.log(`authSignedMessage failed due to ` + error);
  }
};
/**
 * @dev
 * Def: Access token needs to be refreshed using the refresh token at an interval of 30 mins
 * ALERT: Needs authentication to work, NOT COMPLETE
 */
export const authRefreshToken = async () => {
  try {

  } catch (error) {
    console.log(`authRefreshToken failed due to ` + error);
  }
};
// Function to chain all the above together
export const loginUser = async () => {
  try {
    const connectedWalletAddress = await connectWallet()
    if (connectedWalletAddress) {
      const loginTokens = await authLoginUser(connectedWalletAddress)
      // console.log(loginTokens)
      // Store tokens in local storage for authentication of API
      window.localStorage.setItem('accessToken', loginTokens.accessToken)
      window.localStorage.setItem('refreshToken', loginTokens.refreshToken)
      console.log("Stored tokens in local storage")
    }
    // Else in someway confirm the user to login

  } catch (error) {
    console.log(error)
  }
}
// Follows the userprofile, This will be passed as a prop to the Individual User component
export async function followUser(followersId) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(lensContractAddress_mumbaiTestnet, mumbaiTestnetAbi, signer)
  try {
    // Invoking the lens protocol contract address with the follow function and passing the profileId you want to follow, your details are already in transaction
    const tx = await contract.follow([followersId], [0x0]) //This will trigger a Metamask prompt to see if you actually want to sign the transaction
    await tx.wait() //wait for the transaction to go through
    // This will run if the above line went through, replace this with some better event handling
    console.log('Successfully Followed the User')
  } catch (error) {
    console.log(error)
  }
}
// Function to opt the user in the channel
export const pushOptIn = async () => {
  try {
    const connectedWalletAddress = await connectWallet()
    if (connectedWalletAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await PushAPI.channels.subscribe({
        signer: signer,
        channelAddress: `eip155:80001:${CHANNEL_ADDRESS}`, // channel address in CAIP
        userAddress: `eip155:80001:${connectedWalletAddress}`, // user address in CAIP
        onSuccess: () => {
          console.log('opt in success');
        },
        onError: (error) => {
          console.error('opt in error' + error);
        },
        env: 'staging'
      })
    }
  } catch (error) {
    console.log(error)
  }
}