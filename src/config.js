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

const CRYPTOS = {
  weth: {
    symbol: 'WETH',
    contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  },
  dai: {
    symbol: 'DAI',
    contract: '0x6b175474e89094c44da98b954eedeac495271d0f',
  },
  coshi: {
    symbol: 'COSHI',
    contract: 'COSHI',
  },
};

export {
  PORT, INFURA_CREDENTIALS, ALCHEMY_CREDENTIALS, UNISWAP, CRYPTOS,
};
export default {
  PORT, INFURA_CREDENTIALS, ALCHEMY_CREDENTIALS, UNISWAP, CRYPTOS,
};
