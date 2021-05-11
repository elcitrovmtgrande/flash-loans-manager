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
    symbol: 'WBTC',
    contract: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    icon: 'https://etherscan.io/token/images/wbtc_28.png?v=1',
  },
];

export {
  PORT, INFURA_CREDENTIALS, ALCHEMY_CREDENTIALS, UNISWAP, CRYPTOS,
};
export default {
  PORT, INFURA_CREDENTIALS, ALCHEMY_CREDENTIALS, UNISWAP, CRYPTOS,
};
