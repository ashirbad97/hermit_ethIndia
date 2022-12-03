import { createClient } from "urql";
import { ethers } from "ethers";
import * as IPFS from "ipfs-core";
import { create } from "ipfs-http-client";
import mumbaiTestnetAbi from "./mumbaiTestnetAbi.json";
import omitDeep from 'omit-deep'
// const APIURL = `https://api.lens.dev`
const APIURL = `https://api-mumbai.lens.dev/`; //Mumbai Testnet API

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