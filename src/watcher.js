// make sure to test your own strategies, do not use this version in production
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;
// your contract address
const flashLoanerAddress = process.env.FLASH_LOANER;

const { ethers } = require('ethers');

// uni/sushiswap ABIs
const UniswapV2Pair = require('./abis/IUniswapV2Pair.json');
const UniswapV2Factory = require('./abis/IUniswapV2Factory.json');

// use your own Infura node in production
// const provider = new ethers.providers.AlchemyProvider('mainnet', process.env.INFURA_KEY);
const provider = new ethers.providers.AlchemyWebSocketProvider('mainnet', 'caTQ647EOB-SR1MLFlRpT5cZZ1ixMG45');

const wallet = new ethers.Wallet(privateKey, provider);

const ETH_TRADE = 10;
const DAI_TRADE = 3500;

const runBot = async () => {
  const sushiFactory = new ethers.Contract(
    '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
    UniswapV2Factory.abi, wallet,
  );
  const uniswapFactory = new ethers.Contract(
    '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    UniswapV2Factory.abi, wallet,
  );
  const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
  const wethAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

  let sushiEthDai;
  let uniswapEthDai;

  const loadPairs = async () => {
    sushiEthDai = new ethers.Contract(
      await sushiFactory.getPair(wethAddress, daiAddress),
      UniswapV2Pair.abi, wallet,
    );
    uniswapEthDai = new ethers.Contract(
      await uniswapFactory.getPair(wethAddress, daiAddress),
      UniswapV2Pair.abi, wallet,
    );
  };

  await loadPairs();

  provider.on('block', async (blockNumber) => {
    try {
      console.log(blockNumber);

      const sushiReserves = await sushiEthDai.getReserves();
      const uniswapReserves = await uniswapEthDai.getReserves();

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

      console.log(`UNISWAP PRICE ${priceUniswap}`);
      console.log(`SUSHISWAP PRICE ${priceSushiswap}`);
      console.log(`PROFITABLE? ${shouldTrade}`);
      console.log(`CURRENT SPREAD: ${(priceSushiswap / priceUniswap - 1) * 100}%`);
      console.log(`ABSLUTE SPREAD: ${spread}`);

      if (!shouldTrade) return;

      const gasLimit = await sushiEthDai.estimateGas.swap(
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
      const tx = await sushiEthDai.swap(
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
  });
};

console.log('Bot started!');

runBot();

const watcher = runBot;

export default watcher;
