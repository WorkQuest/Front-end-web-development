import {
  getStyledAmount,
  GetWalletProvider,
} from '~/utils/wallet';
import {
  error,
  fetchContractData,
} from '~/utils/web3';
import * as abi from '~/abi/abi';

export default {
  async fetchRewardBalance({ commit }, userWalletAddress) {
    try {
      const res = await fetchContractData(
        'getRewards',
        abi.WQReferral,
        process.env.WORKNET_REFERRAL,
        [userWalletAddress],
        GetWalletProvider(),
      );
      commit('setReferralReward', res ? getStyledAmount(res) : 0);
      return true;
    } catch (e) {
      console.error(`fetchRewardBalance: ${e}`);
      return error();
    }
  },
  async claimReferralReward() {
    try {
      return await fetchContractData(
        'claim',
        abi.WQReferral,
        process.env.WORKNET_REFERRAL,
        [],
        GetWalletProvider(),
      );
    } catch (e) {
      console.error(`claimReferralReward: ${e}`);
      return error();
    }
  },
  async fetchPaidEventsList({ commit }, config) {
    try {
      const currConfig = config || { params: { limit: 6, offset: 0 } };
      const { data: { result, ok } } = await this.$axios.get(`${process.env.WORKNET_REFERRAL_URL}claimed-paid-events`, currConfig);

      if (result.events.length) {
        commit('setPaidEventsList', result.events);
      }

      return ok;
    } catch (e) {
      return false;
    }
  },
  async fetchReferralsList({ commit }, config) {
    try {
      const currConfig = config || { params: { limit: 10, offset: 0 } };
      const { data: { result, ok } } = await this.$axios.get(`${process.env.BASE_URL}${process.env.WORKNET_REFERRAL_URL}referrals`, currConfig);

      if (result.referrals.length) {
        commit('setReferralsListCount', result.count);
        commit('setReferralsList', result.referrals);
      }

      return ok;
    } catch (e) {
      return false;
    }
  },
  async fetchCreatedReferralList({ commit }) {
    try {
      const { data: { result, ok } } = await this.$axios.get(`${process.env.BASE_URL}${process.env.WORKNET_REFERRAL_URL}referral/signature/created-referrals`);

      if (result) {
        const signature = {};
        signature.v = result.v;
        signature.r = result.r;
        signature.s = result.s;
        commit('setCreatedReferralList', result.addresses);
        commit('setReferralSignature', signature);
      }

      return ok;
    } catch (e) {
      return false;
    }
  },
  async addReferrals({ getters }) {
    const signature = getters.getReferralSignature;
    const addresses = getters.getCreatedReferralList;
    try {
      return await fetchContractData(
        'addReferrals',
        abi.WQReferral,
        process.env.WORKNET_REFERRAL,
        [signature.v, signature.r, signature.s, addresses],
        GetWalletProvider(),
      );
    } catch (e) {
      console.error(`fetchContractData: ${e}`);
      return error();
    }
  },
};
