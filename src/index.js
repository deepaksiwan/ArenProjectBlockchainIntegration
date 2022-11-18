import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';


//walllet Connect with wagmi
import '@rainbow-me/rainbowkit/styles.css';
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
  chain,
} from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';

import { Buffer } from 'buffer'


const bsc = {
  id:56,
  name: 'BSC Mainnet',
  network: 'Binance Smart Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://bsc-dataseed.binance.org/',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
  },
  testnet: false,
}
const bscTest = {
  id:97,
  name: 'BSC Testnet',
  network: 'Binance Smart Chain Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tBNB',
    symbol: 'tBNB',
  },
  iconUrl:'',
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    
  },
  blockExplorers: {
    default: {name:'BscScan TestNet',url:'https://testnet.bscscan.com'},
  },
  testnet: true,
}

const { chains,provider,webSocketProvider } = configureChains([
  chain.mainnet,chain.goerli,chain.sepolia,chain.polygon,chain.polygonMumbai,chain.arbitrum,chain.optimism,bsc,bscTest
], [
  publicProvider()
]);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const client = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
  })
// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer
}

const queryClient = new QueryClient()



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>

    <WagmiConfig client={client}> 
    <RainbowKitProvider chains={chains} modalSize="compact"> 
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
     </RainbowKitProvider> 
   </WagmiConfig> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
