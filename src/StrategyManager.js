import UniswapV2FactoryOfficial from '@uniswap/v2-core/build/UniswapV2Factory.json';
import UniswapV2PairOfficial from '@uniswap/v2-core/build/UniswapV2Pair.json';
import { v1 } from 'uuid';
import { CRYPTOS } from './config';

require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;
// your contract address
const flashLoanerAddress = process.env.FLASH_LOANER;

const { ethers } = require('ethers');

// use your own Infura node in production
// const provider = new ethers.providers.AlchemyProvider('mainnet', process.env.INFURA_KEY);
const provider = new ethers.providers.AlchemyWebSocketProvider('mainnet', 'caTQ647EOB-SR1MLFlRpT5cZZ1ixMG45');

const wallet = new ethers.Wallet(privateKey, provider);

const ETH_TRADE = 1000;
const DAI_TRADE = 3500;

class StrategyManager {
  constructor(pair, io) {
    this.id = v1();
    this.pair = pair;
    this.sushiPair = null;
    this.uniPair = null;
    this.io = io;
    this.sushiFactory = new ethers.Contract(
      '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
      UniswapV2FactoryOfficial.abi, wallet,
    );
    this.uniswapFactory = new ethers.Contract(
      '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
      UniswapV2FactoryOfficial.abi, wallet,
    );
    this.provider = new ethers.providers.AlchemyWebSocketProvider('mainnet', 'caTQ647EOB-SR1MLFlRpT5cZZ1ixMG45');
  }

  async exec() {
    console.log('Strategy started !');
    console.log(`Listening to ${JSON.stringify(this.pair)} opportunities`);
    await this.loadPairs();
    this.provider.on('block', (blockNumber) => this.onBlock(blockNumber));
  }

  async loadPairs() {
    const token0Symbol = this.pair[0];
    const token1Symbol = this.pair[1];

    const token0Address = CRYPTOS.find((c) => c.symbol === token0Symbol).contract;
    const token1Address = CRYPTOS.find((c) => c.symbol === token1Symbol).contract;
    this.sushiPair = new ethers.Contract(
      await this.sushiFactory.getPair(token0Address, token1Address),
      UniswapV2PairOfficial.abi, wallet,
    );
    this.uniPair = new ethers.Contract(
      await this.uniswapFactory.getPair(token0Address, token1Address),
      UniswapV2PairOfficial.abi, wallet,
    );
    console.log('loadPairs:token0Address', token0Address);
    console.log('loadPairs:token1Address', token1Address);
  }

  async onBlock(blockNumber) {
    try {
      console.log('New block');
      console.log(blockNumber);

      const sushiReserves = await this.sushiPair.getReserves();
      const uniswapReserves = await this.uniPair.getReserves();

      const reserve0Sushi = Number(ethers.utils.formatUnits(sushiReserves[0], 18));

      const reserve1Sushi = Number(ethers.utils.formatUnits(sushiReserves[1], 18));

      const reserve0Uni = Number(ethers.utils.formatUnits(uniswapReserves[0], 18));
      const reserve1Uni = Number(ethers.utils.formatUnits(uniswapReserves[1], 18));

      const priceUniswap = reserve0Uni / reserve1Uni;
      const priceSushiswap = reserve0Sushi / reserve1Sushi;

      const shouldStartEth = priceUniswap < priceSushiswap;
      const spread = Math.abs((priceSushiswap / priceUniswap - 1) * 100) - 0.6;

      const shouldTrade = spread > (
        (shouldStartEth ? ETH_TRADE : DAI_TRADE)
         / Number(
           ethers.utils.formatEther(uniswapReserves[shouldStartEth ? 1 : 0]),
         ));

      if (this.io) {
        this.io.emit('block', JSON.stringify({
          strategyId: this.id,
          timestamp: Date.now(),
          priceUniswap,
          priceSushiswap,
          shouldTrade,
          currentSpread: (priceSushiswap / priceUniswap - 1) * 100,
          absoluteSpread: spread,
        }));
      }

      console.log(`UNISWAP PRICE ${priceUniswap}`);
      console.log(`SUSHISWAP PRICE ${priceSushiswap}`);
      console.log(`PROFITABLE? ${shouldTrade}`);
      console.log(`CURRENT SPREAD: ${(priceSushiswap / priceUniswap - 1) * 100}%`);
      console.log(`ABSLUTE SPREAD: ${spread}`);

      if (!shouldTrade) return;

      const gasLimit = await this.sushiPair.estimateGas.swap(
        !shouldStartEth ? DAI_TRADE : 0,
        shouldStartEth ? ETH_TRADE : 0,
        flashLoanerAddress,
        ethers.utils.toUtf8Bytes('1'),
      );

      const gasPrice = await wallet.getGasPrice();

      const gasCost = Number(ethers.utils.formatEther(gasPrice.mul(gasLimit)));

      console.log('GAS COST:', gasCost);
      console.log('GAS PRICE:', gasPrice);

      const shouldSendTx = shouldStartEth
        ? (gasCost / ETH_TRADE) < spread
        : (gasCost / (DAI_TRADE / priceUniswap)) < spread;

      // don't trade if gasCost is higher than the spread
      if (!shouldSendTx) return;

      const options = {
        gasPrice,
        gasLimit,
      };
      const tx = await this.sushiPair.swap(
        !shouldStartEth ? DAI_TRADE : 0,
        shouldStartEth ? ETH_TRADE : 0,
        flashLoanerAddress,
        ethers.utils.toUtf8Bytes('1'), options,
      );

      console.log('ARBITRAGE EXECUTED! PENDING TX TO BE MINED');
      console.log(tx);

      await tx.wait();

      console.log('SUCCESS! TX MINED');
    } catch (err) {
      console.error(err);
    }
  }
}

export { StrategyManager };
export default StrategyManager;
