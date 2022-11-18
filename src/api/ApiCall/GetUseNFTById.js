
import axios from "axios";
export const getUserNFTByTokenURI = async(tokenURI) => {
   //console.log({tokenURI})
   
    let tokenUri=tokenURI?.replace("ipfs://","https://gateway.pinata.cloud/ipfs/")
    //console.log("check", typeof tokenUri)
    const TokenUri = tokenUri.concat('.json')
     try {
       const { data } = await axios({
         method:'GET',
         url:TokenUri,
     });
    // console.log("data", data)
        
     return data;
     } catch (error) {
       console.log(error,"hk");
     }
 };