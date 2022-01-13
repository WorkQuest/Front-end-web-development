import { ethers } from 'ethers';
import { AES, enc } from 'crypto-js';
import Web3, { sendTransaction } from 'web3';
import BigNumber from 'bignumber.js';
import { HttpProviderOptions } from 'web3-core-helpers';
import { error, success } from '~/utils/web3';
import abi from '~/abi/index';

const bip39 = require('bip39');

// eslint-disable-next-line import/prefer-default-export
export const generateMnemonic = () => bip39.generateMnemonic();
export const createWallet = (mnemonic) => {
  try {
    return ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath("m/44'/60'/0'/0/0");
  } catch (e) {
    // incorrect mnemonic
    return false;
  }
};

export const encryptStringWithKey = (toEncrypt, key) => AES.encrypt(toEncrypt, key).toString();
export const decryptStringWitheKey = (toDecrypt, key) => AES.decrypt(toDecrypt, key).toString(enc.Utf8);

// 20220112 chain id
// const options = {
//   keepAlive: true,
//   timeout: 20000, // milliseconds,
//   headers: [{ name: 'Access-Control-Allow-Headers', value: '*' }],
//   withCredentials: false,
// };
// const provider = new Web3.providers.HttpProvider(process.env.WQ_PROVIDER, options);
// const web3 = new Web3(provider);

console.log('CONNECTION');
const web3 = new Web3(process.env.WQ_PROVIDER);
(async () => { // TODO: DELETE LATER
  const id = await web3.eth.getChainId();
  console.log(id);
  console.log('AFTER GETTEING CHAIN ID');
})();

const wallet = {
  address: null,
  privateKey: null,
  init(address, privateKey) {
    this.address = address;
    this.privateKey = privateKey;
    if (privateKey) {
      const account = web3.eth.accounts.privateKeyToAccount(wallet.privateKey);
      web3.eth.accounts.wallet.add(account);
      web3.eth.defaultAccount = account.address;

      sessionStorage.setItem('keys', JSON.stringify({
        ...JSON.parse(sessionStorage.getItem('keys')),
        [address]: privateKey,
      }));
    }
  },
  reset() {
    this.address = null;
    this.privateKey = null;
  },
};

export const setWalletAddress = (userAddress) => wallet.init(userAddress, null);

/**
 * trying to get key from session then return wallet connected
 * @returns {boolean}
 */
export const getIsWalletConnected = () => {
  if (!wallet.privateKey && wallet.address) {
    const session = JSON.parse(sessionStorage.getItem('keys'));
    if (!session) return false;
    const key = session[wallet.address];
    if (key) {
      wallet.init(wallet.address, key);
      return true;
    }
  }
  return !!wallet.address && !!wallet.privateKey;
};

/**
 * Check wallet for current address
 * @param userAddress from api
 * @param userPassword from user
 * @returns {result: *, ok: boolean}
 */
export const connectWallet = (userAddress, userPassword) => {
  if (!userPassword || !userAddress) return error();
  if (wallet.address && wallet.privateKey) return success();
  let _walletTemp;
  const sessionData = JSON.parse(sessionStorage.getItem('mnemonic'));
  const storageData = JSON.parse(localStorage.getItem('mnemonic'));
  if (!sessionData && !storageData) {
    return error();
  }

  const sessionMnemonic = sessionData ? sessionData[userAddress] : null;
  const storageMnemonic = storageData ? storageData[userAddress] : null;
  if (!sessionMnemonic && !storageMnemonic) {
    return error();
  }

  // Check in session if exists
  if (sessionMnemonic) {
    _walletTemp = createWallet(sessionMnemonic);
    if (_walletTemp && _walletTemp.address.toLowerCase() === userAddress) {
      wallet.init(_walletTemp.address.toLowerCase(), _walletTemp.privateKey);
      return success();
    }
  }

  // Check in storage
  if (storageMnemonic) {
    const mnemonic = decryptStringWitheKey(storageMnemonic, userPassword);
    _walletTemp = createWallet(mnemonic);
    if (_walletTemp && _walletTemp.address.toLowerCase() === userAddress) {
      wallet.init(_walletTemp.address.toLowerCase(), _walletTemp.privateKey);
      return success();
    }
  }

  // Wrong mnemonic for current account!
  return error();
};

export const disconnect = () => {
  wallet.reset();
};

const min = new BigNumber(0.0001);
/**
 * @param amount
 * @param full - returns with all decimals
 * @param decimals
 * @returns {string|BigNumber}
 */
export const getStyledAmount = (amount, full = false, decimals = 18) => {
  const value = new BigNumber(amount).shiftedBy(-decimals);
  if (value.isEqualTo(0)) return '0';
  if (full) return value.toString();
  if (value.isLessThan(min)) return `<${min.toString()}`;
  return value.decimalPlaces(4).toString();
};

// WUSD
export const getBalance = async () => {
  try {
    const balance = await web3.eth.getBalance(wallet.address);
    return success({
      balance: getStyledAmount(balance),
      fullBalance: getStyledAmount(balance, true),
    });
  } catch (e) {
    console.error('get balance error', e);
    return error();
  }
};
export const transfer = async (recipient, value) => {
  try {
    value = new BigNumber(value).shiftedBy(18).toString();
    const [gasPrice, gasEstimate] = await Promise.all([
      web3.eth.getGasPrice(),
      web3.eth.estimateGas({
        from: wallet.address,
        to: recipient,
        value,
      }),
    ]);
    const txRes = await web3.eth.sendTransaction({
      from: wallet.address,
      to: recipient,
      value,
      gas: gasEstimate,
      gasPrice,
    });
    return success(txRes);
  } catch (e) {
    console.error('transfer error', e);
    return error();
  }
};

// Contracts
export const fetchContractData = async (_method, _abi, _address, _params) => {
  try {
    if (!web3) {
      console.error('_provider is undefined');
      return {};
    }
    const Contract = new web3.eth.Contract(_abi, _address);
    return await Contract.methods[_method].apply(this, _params).call();
  } catch (e) {
    console.error(e.message);
    return error();
  }
};
export const transferToken = async (recipient, value) => {
  try {
    value = new BigNumber(value).shiftedBy(18).toString();
    const inst = new web3.eth.Contract(abi.ERC20, process.env.WQT_TOKEN);
    const [gasPrice, gasEstimate] = await Promise.all([
      web3.eth.getGasPrice(),
      inst.methods.transfer.apply(null, [recipient, value]).estimateGas({ from: wallet.address }),
    ]);
    const res = await inst.methods.transfer(recipient, value).send({
      from: wallet.address,
      gas: gasEstimate,
      gasPrice,
    });
    return success(res);
  } catch (e) {
    console.error(e.message);
    return error();
  }
};
export const getContractFeeData = async (_method, _abi, _contractAddress, recipient, value) => {
  try {
    if (!isNaN(value)) {
      value = new BigNumber(value).shiftedBy(18).toString();
    }
    const inst = new web3.eth.Contract(_abi, _contractAddress);
    const [gasPrice, gasEstimate] = await Promise.all([
      web3.eth.getGasPrice(),
      inst.methods[_method].apply(null, [recipient, value]).estimateGas({ from: wallet.address }),
    ]);
    return success({
      gasPrice,
      gasEstimate,
      fee: new BigNumber(gasPrice * gasEstimate).shiftedBy(-18).toString(),
    });
  } catch (e) {
    console.error('Get contract fee data error. Method:', _method);
    return error();
  }
};

//
// QUESTS
//

/* Work Quest Factory */
export const createQuest = async (payload) => {
  const { cost, description } = payload;
  try {
    const hash = ethers.utils.formatBytes32String(description.slice(0, 31));
    const _cost = new BigNumber(cost).shiftedBy(18).toString();
    const _abi = abi.WorkQuestFactory;
    const _abiAddress = process.env.WORK_QUEST_FACTORY;
    console.log('creating new quest (hash, cost)', hash, _cost, `(${cost})`);
    const res = await sendTransaction('newWorkQuest', {
      abi: _abi,
      address: _abiAddress,
      data: [hash, _cost, 0],
    });
    console.log('NEW WORK QUEST CONTRACT', res);
    return success(res);
  } catch (e) {
    console.error(e);
    return error(500, '', e.message);
  }
};
export const getAccountQuests = async () => {
  try {
    const _abi = abi.WorkQuestFactory;
    const _abiAddress = process.env.WORK_QUEST_FACTORY;
    return await fetchContractData('getWorkQuests', _abi, _abiAddress, [wallet.address]);
  } catch (e) {
    return error(500, '', e.message);
  }
};

/* Work Quest */
/*
  :QuestMethods:
  editJob - edit before deposit
  cancelJob
  assignJob (workerAddress)
  acceptJob
  processJob
  verificationJob
  arbitration

  arbitrationRework
  arbitrationDecreaseCost (_forfeit)
  arbitrationRejectWork
 */
export const depositCostToQuestContract = async (contractAddress, amount) => {
  try {
    // *multiplied by fee percent
    // TODO: вынести fee percent в модальное окно чека
    const value = new BigNumber(amount).multipliedBy('1.02').shiftedBy(18).toString();
    console.log('deposit value', value, 'contract', contractAddress);
    const res = await web3.eth.sendTransaction({
      from: wallet.address,
      to: contractAddress,
      value,
    });
    return success(res);
  } catch (e) {
    console.error(e);
    return error(500, '', e.message);
  }
};
export const fetchJobMethod = async (contractAddress, method, param = []) => {
  try {
    const res = await sendTransaction(method, {
      abi: abi.WorkQuest,
      address: contractAddress,
      data: param,
    });
    return success(res);
  } catch (e) {
    console.error(e);
    return error(500, '', e.message);
  }
};
