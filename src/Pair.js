// import Eth from 'web3-eth';
// import Web3 from 'web3';
import { request } from 'graphql-request';
import tokenRequest from './gql/uniswap-token.req';
import { UNISWAP } from './config';

/**
 * Modélisation d'une paire de devise
 * Cette paire de devise prend en son constructeur
 * un tableau comportant les deux symboles de la paire de jetons
 */
class Pair {
  constructor(pair) {
    this.pair = pair;
    this.token0 = null;
    this.token1 = null;
    this.fetchPairInfos();
  }

  async watch() {
    // const token_0_data = await request(UNISWAP.api.endpoints.https, tokenRequest('DAI'));
    // console.log(token_0_data);
    // "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.
    // const eth = new Eth(Eth.givenProvider || 'ws://some.local-or-remote.node:8546');
    // const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');

    // const subscription = web3.eth.subscribe('logs', {
    //   // address: '0x123456..',
    //   // topics: ['0x12345...'],
    // }, (error, result) => {
    //   if (!error) { console.log(result); }
    // });
    // todo
    /**
     * 1) Je recupere l'id block ETH de la blockchain ethereum
     * 2) Je recupere le contenu du block grace a son id
     * 3) Je recupere les transactions
     * 4) Je recherche les valeurs pour ma paire
     * 5) Je calcule une moyenne pour ces valeurs s'il y en a plusieurs
     * 6) J'execute la callback en cas d'erreur d'arbitrage
     */
  }

  /**
   * Permet d'aller chercher les informations
   * sur l'API d'Uniswap officielle
   */
  async fetchPairInfos() {
    const { pair } = this;
    const tokenName0 = pair[0];
    const tokenName1 = pair[1];
    const tokenResults0 = await request(UNISWAP.api.endpoints.https, tokenRequest(tokenName0));
    const tokenResults1 = await request(UNISWAP.api.endpoints.https, tokenRequest(tokenName1));
    const token0 = tokenResults0.tokens[0];
    const token1 = tokenResults1.tokens[1];
    this.token0 = token0;
    this.token1 = token1;
    console.log(this.token0, this.token1);
  }

  getPair() {
    return this.pair;
  }

  setPair(pair) {
    this.pair = pair;
  }
}

console.log(new Pair(['ETH', 'DAI']).fetchPairInfos());

export default Pair;
