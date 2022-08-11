import BigNumber from 'bignumber.js';
import {
  error,
  success,
} from '~/utils/web3';
import { createInstance } from '~/utils/wallet';
import { WQAuction } from '~/abi';
import ENV from '~/utils/addresses/index';

const LotsStatuses = {
  INACTIVE: 0,
  STARTED: 1,
  BOUGHT: 2,
  CANCELED: 3,
};

/**
 * @property $axiosLiquidator
 */
export default {
  /**
   *
   * @param commit
   * @param getters
   * @param params
   * @param lotStatus
   * @param sort
   * @property liquidityValue - amount for liquidation
   * @property priceValue - lot price
   * @returns {Promise<{msg: string, code: number, data: null, ok: boolean}|{result: *, ok: boolean}>}
   */
  async fetchLots({ commit, rootGetters, dispatch }, { lotStatus, params, sort }) {
    try {
      if (!params.q) delete params.q;
      if (LotsStatuses.BOUGHT === lotStatus) return dispatch('fetchBoughtLots', { params, sort });

      const end_point = {
        [LotsStatuses.INACTIVE]: '/auction/lots/auctionLiquidity',
        [LotsStatuses.STARTED]: '/auction/lots/auctionStarted',
      }[lotStatus];
      const { result: { count, auction } } = await this.$axiosLiquidator.$get(end_point, {
        params: {
          ...params,
          'sort[createdAt]': sort,
        },
      });

      const balanceData = rootGetters['wallet/getBalanceData'];
      commit('setLost', {
        count,
        lots: auction.map((item) => {
          let symbolDecimals = balanceData[item.symbol].decimals;
          if (symbolDecimals === 6) symbolDecimals += symbolDecimals;
          return {
            ...item,
            _collateral: Number(new BigNumber(item.collateral).shiftedBy(-symbolDecimals)),
            _liquidityValue: Number(new BigNumber(item.liquidityValue).shiftedBy(-18).toFixed(4, 1)),
            _price: Number(new BigNumber(item.priceValue).shiftedBy(-18).toFixed(4, 1)),
          };
        }),
      });
      return success();
    } catch (e) {
      console.error('auction/fetchLots', e);
      return error();
    }
  },

  async clearLots({ commit }) {
    commit('setLost', { count: 0, lots: [] });
  },

  async fetchBoughtLots({ commit, rootGetters }, { params, sort }) {
    try {
      const { result: { count, auction } } = await this.$axiosLiquidator.$get('/auction/lots/auctionBought', {
        params: {
          ...params,
          'sort[timestamp]': sort,
        },
      });

      const balanceData = rootGetters['wallet/getBalanceData'];

      let lots = [];
      auction.forEach((item) => {
        const { symbol, lotBuyed } = item;
        lots = [
          ...lots,
          ...lotBuyed.map((lot) => {
            const {
              cost, buyer, amount, timestamp, transactionHash,
            } = lot;

            let symbolDecimals = balanceData[symbol].decimals;
            if (symbolDecimals === 6) symbolDecimals += symbolDecimals;
            return {
              ...item,
              buyer,
              timestamp,
              transactionHash,
              lotAmount: Number(new BigNumber(amount).shiftedBy(-symbolDecimals).toFixed(4, 1)),
              lotPrice: Number(new BigNumber(cost).shiftedBy(-18).toFixed(4, 1)),
            };
          }),
        ];
      });

      commit('setLost', { count, lots });

      return success();
    } catch (e) {
      console.error('auction/fetchBoughtLots', e);
      return error();
    }
  },

  async fetchAuctionsDuration({ commit }) {
    try {
      const auctions = [
        ENV.WORKNET_USDT_AUCTION,
        ENV.WORKNET_USDC_AUCTION,
        ENV.WORKNET_ETH_AUCTION,
        ENV.WORKNET_BNB_AUCTION,
      ];
      const instances = await Promise.all(auctions.map((auction) => createInstance(WQAuction, auction)));

      const [USDT_DURATION, USDC_DURATION, ETH_DURATION, BNB_DURATION] = await Promise.all(
        instances.map((inst) => inst.methods.auctionDuration().call()),
      );

      commit('setDuration', {
        USDT: USDT_DURATION,
        USDC: USDC_DURATION,
        ETH: ETH_DURATION,
        BNB: BNB_DURATION,
      });
      return success();
    } catch (e) {
      console.error('auction/fetchAuctionsDuration', e);
      return error();
    }
  },
};
