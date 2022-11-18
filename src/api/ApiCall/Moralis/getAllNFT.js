import axios from "axios";
import ApiConfigs from "../../ApiConfig";
export const getListNFT = async (walletAddress) => {
    try {
      const { data } = await axios({
        method:'GET',
        url:`${ApiConfigs.getUserNFT}${walletAddress}/nft`,
        headers: {
          'authorization':`Bearer ${localStorage?.getItem("token")}`,
          accept: 'application/json',
          'X-API-Key': 'bnQH6aKrefwz24YtJ15iVClvZwhdy6pCiZir5uBuUeWHc5AoJVWhqxV6389JJ9Xc'},
        params:{chain: 'bsc', format: 'decimal',limit: '10'}
    });
    return data;
    } catch (error) {
      console.log(error,"hk");
    }
};