import BigNumber from 'bignumber.js';
import { ResponsesType, UserRole } from '~/utils/enums';
import {
  QuestMethods, QuestStatuses, InfoModeEmployer, InfoModeWorker,
} from '~/utils/quests-constants';
import { WorkQuestFactory, WorkQuest } from '~/abi/abi';
import {
  createInstance,
  getContractFeeData,
  getProvider,
  getWalletAddress,
  hashText,
  sendWalletTransaction,
} from '~/utils/wallet';
import { error, success } from '~/utils/web3';

export default {
  async getWorkerData({ commit }, userId) {
    try {
      const response = await this.$axios.$get(`/v1/profile/${userId}`);
      commit('setCurrentWorker', response.result);
      return response;
    } catch (e) {
      return console.log(e);
    }
  },
  async questListForInvitation({ commit }, userId) {
    try {
      const response = await this.$axios.$get(`/v1/employer/${userId}/quests`);
      commit('setQuestListForInvitation', response.result);
      return response.result;
    } catch (e) {
      return console.log(e);
    }
  },
  async employeeList({ commit }, { query, specFilter }) {
    try {
      if (query.q === '') delete query.q;
      const { ok, result } = await this.$axios.$get('/v1/profile/workers', {
        params: { ...query, ...specFilter },
      });
      commit('setEmployeeList', result);
      return { ok };
    } catch (e) {
      console.log('quests/employeeList');
      return false;
    }
  },
  async setCurrentWorker({ commit }, worker) {
    commit('setCurrentWorker', worker);
    return worker;
  },
  async setInfoDataMode({ commit }, mode) {
    commit('setInfoDataMode', mode);
  },
  async getCurrentStepCreateQuest({ commit }, data) {
    commit('setCurrentStepCreateQuest', data);
  },
  async questCreate({ commit }, payload) {
    try {
      return await this.$axios.$post('/v1/quest/create', payload);
    } catch (e) {
      return console.error(e);
    }
  },
  async getAllQuests({ commit }, { query, specFilter }) {
    try {
      if (query.q === '') delete query.q;
      const specializations = specFilter ? Object.values(specFilter) : [];
      const { ok, result } = await this.$axios.$post('/v1/get-quests', { specializations }, {
        params: { ...query },
      });
      commit('setAllQuests', result);
      return { ok };
    } catch (e) {
      console.error('quests/getAllQuests:', e);
      return false;
    }
  },
  async getQuest({ commit, rootState }, payload) {
    try {
      const { result } = await this.$axios.$get(`/v1/quest/${payload}`);
      const { role } = rootState.user.userData;
      let currStat = 0;
      const { status, response } = result;

      const questStatuses = Object.entries(QuestStatuses);

      if (role === UserRole.EMPLOYER) {
        questStatuses.some(([key, val]) => {
          if (val === status) {
            currStat = InfoModeEmployer[key];
            return true;
          }
          return false;
        });
      } else if (role === UserRole.WORKER) {
        questStatuses.some(([key, val]) => {
          if (val === status) {
            if (val === QuestStatuses.Created && response) {
              key = response.type ? 'Invited' : 'Responded';
            }
            currStat = InfoModeWorker[key];
            return true;
          }
          return false;
        });
      }

      commit('setInfoDataMode', currStat);
      commit('setQuest', result);
      return result;
    } catch (e) {
      return false;
    }
  },
  async getUserQuests({ commit }, { userId, role, query }) {
    try {
      const specializations = query.specializations || [];
      if (query.specializations) delete query.specializations;
      const response = await this.$axios.$post(`/v1/${role}/${userId}/get-quests`, { specializations }, {
        params: { ...query },
      });
      commit('setAllQuests', response.result);
      return response.result;
    } catch (e) {
      return console.error(e);
    }
  },
  async editQuest({ commit }, { payload, questId }) {
    try {
      const response = await this.$axios.$put(`/v1/quest/${questId}`, payload);
      commit('setQuestData', response.result);
      return response;
    } catch (e) {
      return console.error(e);
    }
  },
  async deleteQuest({ commit }, { questId }) {
    try {
      const response = await this.$axios.$delete(`/v1/quest/${questId}`);
      return response.result;
    } catch (e) {
      return console.error(e);
    }
  },
  async responsesToQuest({ commit }, questId) {
    try {
      const { result } = await this.$axios.$get(`/v1/quest/${questId}/responses`);
      const responded = result.responses.filter((response) => response.status === 0 && response.type === ResponsesType.Responded) || [];
      const invited = result.responses.filter((response) => response.status >= 0 && response.type === ResponsesType.Invited) || [];
      commit('setResponses', { result, responded, invited });
      return result;
    } catch (e) {
      return console.error(e);
    }
  },
  async inviteOnQuest({ commit }, { questId, payload }) {
    try {
      const response = await this.$axios.$post(`/v1/quest/${questId}/invite`, payload);
      const { chat } = response.result;
      commit('setChatInviteOnQuest', chat);
      return response.result;
    } catch (e) {
      return console.error(e);
    }
  },
  async respondOnQuest({ commit }, { data, questId }) {
    try {
      const response = await this.$axios.$post(`/v1/quest/${questId}/response`, data);
      commit('setRespondOnQuest', data);
      return success(response);
    } catch (e) {
      console.error(e);
      return error();
    }
  },
  async setStarOnQuest({ commit }, id) {
    try {
      const response = await this.$axios.$post(`/v1/quest/${id}/star`);
      return response.result;
    } catch (e) {
      return console.error(e);
    }
  },
  async takeAwayStarOnQuest({ commit }, id) {
    try {
      const response = await this.$axios.$delete(`/v1/quest/${id}/star`);
      return response.result;
    } catch (e) {
      return console.error(e);
    }
  },
  async getStarredQuests({ commit }) {
    try {
      const { data } = await this.$axios.$get('/v1/quests/starred');
      commit('setStarredQuests', data.result);
      return data.result;
    } catch (e) {
      return console.error(e);
    }
  },
  async getResponsesToQuestForAuthUser({ commit }) {
    try {
      const response = await this.$axios.$get('/v1/quest/responses/my');
      commit('setResponsesMy', response.result);
      return response.result;
    } catch (e) {
      return console.error(e);
    }
  },

  async acceptQuestInvitation({ commit }, responseId) {
    try {
      const response = await this.$axios.$post(`/v1/quest/response/${responseId}/accept`);
      return response.result;
    } catch (e) {
      return console.error(e);
    }
  },
  async rejectQuestInvitation({ commit }, responseId) {
    try {
      const { ok } = await this.$axios.$post(`/v1/quest/response/${responseId}/reject`);
      return ok;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  async rejectTheAnswerToTheQuest({ commit }, responseId) {
    try {
      const { ok } = await this.$axios.$post(`/v1/quest/employer/${responseId}/reject`);
      return ok;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async getFilters({ commit }) {
    try {
      const { result } = await this.$axios.$get('/v1/skill-filters');
      commit('setFilters', result);
    } catch (e) {
      console.error(e);
    }
  },
  setSelectedSpecializationsFilters({ commit }, data) {
    commit('setSelectedSpecializationsFilters', data);
  },
  setSelectedPriceFilter({ commit }, data) {
    commit('setSelectedPriceFilter', data);
  },
  async getAvailableQuests({ commit }, data) {
    try {
      const response = await this.$axios.$get(`/v1/worker/${data}/available-quests?limit=100`);
      commit('setAvailableQuests', response.result.quests);
      return response.ok;
    } catch (e) {
      console.error('Error: getAvailableQuests');
      return false;
    }
  },

  /** Work Quest Factory */
  async createQuest({ commit }, {
    cost, depositAmount, description, nonce,
  }) {
    try {
      const address = process.env.WORKNET_WQ_FACTORY;
      const walletAddress = getWalletAddress();
      const hash = hashText(description);
      cost = new BigNumber(cost).shiftedBy(18).toString();
      depositAmount = new BigNumber(depositAmount).shiftedBy(18).toString();
      const data = [hash, cost, 0, nonce];
      const inst = createInstance(WorkQuestFactory, address);
      const sendData = inst.methods.newWorkQuest.apply(null, data).encodeABI();
      const [gasPrice, gasEstimate] = await Promise.all([
        getProvider().eth.getGasPrice(),
        inst.methods.newWorkQuest.apply(null, data).estimateGas({ from: walletAddress, value: depositAmount }),
      ]);
      const res = await getProvider().eth.sendTransaction({
        to: address,
        from: walletAddress,
        value: depositAmount,
        data: sendData,
        gasPrice,
        gas: gasEstimate,
      });
      return success(res);
    } catch (e) {
      return error(9000, e.message, e);
    }
  },
  /**
   * Get create quest tx fee
   * @param commit
   * @param cost - price for a quest
   * @param depositAmount - deposit = cost * 1% (create quests fee)
   * @param description
   * @param nonce
   * @returns success|error
   */
  async getCreateQuestFeeData({ commit }, {
    cost, depositAmount, description, nonce,
  }) {
    try {
      const hash = hashText(description);
      const address = process.env.WORKNET_WQ_FACTORY;
      cost = new BigNumber(cost).shiftedBy(18).toString();
      return await getContractFeeData(
        'newWorkQuest',
        WorkQuestFactory,
        address,
        [hash, cost, 0, nonce],
        address,
        depositAmount,
      );
    } catch (e) {
      console.error('get quest create fee', e);
      return error();
    }
  },
  async editQuestOnContract({ dispatch }, {
    contractAddress, cost, description, depositAmount = 0,
  }) {
    try {
      const hash = hashText(description);
      cost = new BigNumber(cost).shiftedBy(18).toString();
      // if employer increase price for a quest
      if (depositAmount) {
        depositAmount = new BigNumber(depositAmount).shiftedBy(18).toString();
        const walletAddress = getWalletAddress();
        const inst = createInstance(WorkQuest, contractAddress);
        const data = [hash, cost];
        const sendData = inst.methods[QuestMethods.EditJob].apply(null, data).encodeABI();
        const [gasPrice, gasEstimate] = await Promise.all([
          getProvider().eth.getGasPrice(),
          inst.methods[QuestMethods.EditJob].apply(null, data).estimateGas({ from: walletAddress, value: depositAmount }),
        ]);
        const res = await getProvider().eth.sendTransaction({
          to: contractAddress,
          from: walletAddress,
          value: depositAmount,
          data: sendData,
          gasPrice,
          gas: gasEstimate,
        });
        return success(res);
      }
      return await dispatch('sendQuestTransaction', { contractAddress, method: QuestMethods.EditJob, params: [hash, cost] });
    } catch (e) {
      return error(9000, e.message, e);
    }
  },
  async getEditQuestFeeData({ commit }, {
    contractAddress, description, cost, depositAmount,
  }) {
    try {
      const hash = hashText(description);
      cost = new BigNumber(cost).shiftedBy(18).toString();
      return await getContractFeeData(
        QuestMethods.EditJob,
        WorkQuest,
        contractAddress,
        [hash, cost],
        contractAddress,
        depositAmount,
      );
    } catch (e) {
      return error(9000, e.message, e);
    }
  },

  /** Work Quest */
  async getFeeDataJobMethod({ commit }, {
    method, contractAddress, data,
  }) {
    return await getContractFeeData(method, WorkQuest, contractAddress, data);
  },
  async sendQuestTransaction({ commit }, { contractAddress, method, params = [] }) {
    try {
      const res = await sendWalletTransaction(method, {
        abi: WorkQuest,
        address: contractAddress,
        data: params,
      });
      console.log(`[QUESTS] ${method}:`, res);
      return success(res);
    } catch (e) {
      console.error(e);
      return error(500, e.message, e);
    }
  },
  // Отмена/Удаление квеста
  async cancelJob({ dispatch }, contractAddress) {
    return await dispatch('sendQuestTransaction', { contractAddress, method: QuestMethods.CancelJob });
  },
  // Пригласить воркера на квест
  async assignJob({ dispatch }, { contractAddress, workerAddress }) {
    return await dispatch('sendQuestTransaction', { contractAddress, method: QuestMethods.AssignJob, params: [workerAddress] });
  },
  // Принять результат работы воркера
  async acceptJobResult({ dispatch }, contractAddress) {
    return await dispatch('sendQuestTransaction', { contractAddress, method: QuestMethods.AcceptJobResult });
  },
  // employer отменил (reject) результат работы или прошло 3 дня с момента начала verification
  async arbitration({ dispatch }, contractAddress) {
    return await dispatch('sendQuestTransaction', { contractAddress, method: QuestMethods.Arbitration });
  },

  /** WORKER */
  // Отклонить приглашение на квест
  async declineJob({ dispatch }, contractAddress) {
    return await dispatch('sendQuestTransaction', { contractAddress, method: QuestMethods.DeclineJob });
  },
  // Принять и начать квест
  async acceptJob({ dispatch }, contractAddress) {
    return await dispatch('sendQuestTransaction', { contractAddress, method: QuestMethods.AcceptJob });
  },
  // Отправить результат работы на проверку employer'у
  async verificationJob({ dispatch }, contractAddress) {
    return await dispatch('sendQuestTransaction', { contractAddress, method: QuestMethods.VerificationJob });
  },
};
