import React, { createContext, useState,useEffect } from "react";
import { OPEN_MARKETPLACE_ADDRESS } from "../Config";
// import NFT_ABI from "../Config/NFT_ABI.json";
import OPENMARKETPLACE_ABI from "../Config/OPENMARKETPLACE_ABI.json"
import { useContractRead,useContractReads,erc20ABI } from "wagmi";

export const OpenMarketplaceContext = createContext();

export const OpenMarketplaceProvider = ({children }) => {
    const [Option, setOptionArray] = useState();
    const [tokenSymbol,setTokenSymbol]=useState();
    const [symbolAddress,setSymbolAddress]=useState();

const PaymentOptionContract = useContractRead({
        address: OPEN_MARKETPLACE_ADDRESS,
        abi: OPENMARKETPLACE_ABI,
        functionName: 'getERCTokenList',
      })
    
useEffect(()=>{
        if(PaymentOptionContract?.data){
          setOptionArray([...PaymentOptionContract?.data])
        }
      },[PaymentOptionContract?.data])
    
const Erc20Symbol = useContractReads({
        contracts: Option?.map((singleAddress)=>{
        return{
            address: singleAddress,
            abi: erc20ABI,
            functionName: 'symbol'
        }
      }
      ),
    }
)
useEffect(()=>{
        if(Erc20Symbol?.data?.length>0){
          const arraySymbol=[]
          setTokenSymbol(Erc20Symbol?.data)
          for(let i=0;i<Erc20Symbol?.data?.length;i++){
            arraySymbol.push({symbol:Erc20Symbol?.data?.[i],address:Option?.[i]})
          }
          setSymbolAddress(arraySymbol);
        }
    
},[Erc20Symbol?.data,Option])
  

  return (
    <OpenMarketplaceContext.Provider value={{symbolAddress}}>
      {children}
    </OpenMarketplaceContext.Provider>
  );
};
