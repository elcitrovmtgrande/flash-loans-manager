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

export { PORT, INFURA_CREDENTIALS, ALCHEMY_CREDENTIALS };
export default { PORT, INFURA_CREDENTIALS, ALCHEMY_CREDENTIALS };
