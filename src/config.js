const PORT = 3000;
const INFURA_CREDENTIALS = {
  projectName: 'flash-loans-manager',
  projectId: '1s4WhA9I1fDPz5qPebhcQUUyMAR',
  projectSecret: 'ae20c05a38a8593870244f8749bfa931',
  endpoints: {
    https: 'https://1s4WhA9I1fDPz5qPebhcQUUyMAR:ae20c05a38a8593870244f8749bfa931@eth2-beacon-mainnet.infura.io',
    socket: 'wss://1s4WhA9I1fDPz5qPebhcQUUyMAR:ae20c05a38a8593870244f8749bfa931@eth2-beacon-mainnet.infura.io',
  },
};

const ALCHEMY_CREDENTIALS = {
  endpoints: {
    https: 'https://eth-mainnet.alchemyapi.io/v2/caTQ647EOB-SR1MLFlRpT5cZZ1ixMG45',
  },
};

const UNISWAP = {
  api: {
    endpoints: {
      https: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    },
  },
};

const CRYPTOS = [
  {
    symbol: 'WETH',
    contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    icon: 'https://etherscan.io/token/images/weth_28.png',
  },
  {
    symbol: 'DAI',
    contract: '0x6b175474e89094c44da98b954eedeac495271d0f',
    icon: 'https://etherscan.io/token/images/MCDDai_32.png',
  },
  {
    symbol: 'COSHI',
    contract: '0x668C50B1c7f46EFFBE3f242687071d7908AAB00A',
    icon: 'https://etherscan.io/token/images/corgishiba_32.png',
  },
  {
    symbol: 'AAVE',
    contract: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    icon: 'https://etherscan.io/token/images/aave_32.png',
  },
  {
    symbol: 'UNI',
    contract: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    icon: 'https://etherscan.io/token/images/uniswap_32.png',
  },
  {
    symbol: 'USDT',
    contract: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    icon: 'https://etherscan.io/token/images/tether_32.png',
  },
  {
    symbol: '1INCH',
    contract: '0x111111111117dc0aa78b770fa6a738034120c302',
    icon: 'https://etherscan.io/token/images/1inch_32.png',
  },
  {
    symbol: 'BAT',
    contract: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
    icon: 'https://etherscan.io/token/images/bat.png',
  },
  {
    symbol: 'BNT',
    contract: '0xb1CD6e4153B2a390Cf00A6556b0fC1458C4A5533',
    icon: 'https://etherscan.io/token/images/bntsmarttokenrelay_32.png',
  },
  {
    symbol: 'BAL',
    contract: '0xba100000625a3754423978a60c9317c58a424e3d',
    icon: 'https://etherscan.io/token/images/Balancer_32.png',
  },
  {
    symbol: 'LINK',
    contract: '0x514910771af9ca656af840dff83e8264ecf986ca',
    icon: 'https://etherscan.io/token/images/chainlinktoken_32.png?v=6',
  },
  {
    symbol: 'USDC',
    contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    icon: 'https://etherscan.io/token/images/centre-usdc_28.png',
  },
  // {
  //   symbol: 'OKB',
  //   contract: '0x75231f58b43240c9718dd58b4967c5114342a86c',
  //   icon: 'https://etherscan.io/token/images/okex_28.png',
  // },
  {
    symbol: 'AMP',
    contract: '0xff20817765cb7f73d4bde2e66e067e58d11095c2',
    icon: 'https://etherscan.io/token/images/amp_32.png?v=2',
  },
  {
    symbol: 'BAND',
    contract: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
    icon: 'https://etherscan.io/token/images/bandtoken_32.png',
  },
  {
    symbol: 'COMP',
    contract: '0xc00e94cb662c3520282e6f5717214004a7f26888',
    icon: 'https://etherscan.io/token/images/comp_32.png',
  },
  {
    symbol: 'SNX',
    contract: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    icon: 'https://etherscan.io/token/images/SynthetixSNX_32.png',
  },
  {
    symbol: 'YFI',
    contract: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
    icon: 'https://etherscan.io/token/images/yfi_32.png',
  },
];

export {
  PORT, INFURA_CREDENTIALS, ALCHEMY_CREDENTIALS, UNISWAP, CRYPTOS,
};
export default {
  PORT, INFURA_CREDENTIALS, ALCHEMY_CREDENTIALS, UNISWAP, CRYPTOS,
};
