import Vue from 'vue';
import moment from 'moment';
import VueTippy, { TippyComponent } from 'vue-tippy';
import modals from '~/store/modals/modals';
import { TokenSymbols } from '~/utils/enums';
import { QuestMethods, QuestStatuses } from '~/utils/quests-constants';

Vue.use(VueTippy);
Vue.component('tippy', TippyComponent);

Vue.mixin({

  methods: {
    async uploadFiles(files) {
      if (!files.length) return [];
      const fetchData = [];
      const fetchUrlsData = [];
      const medias = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const item of files) {
        if (item.mediaId) medias.push(item.mediaId);
        else fetchData.push(this.$store.dispatch('user/getUploadFileLink', { contentType: item.file.type }));
      }
      if (!fetchData.length) return medias;
      const urls = await Promise.all(fetchData);
      let urlId = 0;
      for (let i = 0; i < files.length; i += 1) {
        // eslint-disable-next-line no-continue
        if (files[i].mediaId) continue;
        const { file } = this.files[i];
        medias.push(urls[urlId].mediaId);
        fetchUrlsData.push(this.$store.dispatch('user/uploadFile', {
          url: urls[urlId].url,
          data: file,
          contentType: file.type,
        }));
        urlId += 1;
      }
      await Promise.all(fetchUrlsData);
      return medias;
    },
    async signerUser(callback) {
      if (this.$store.getters['user/hasUserAddress']) {
        callback();
      } else {
        const r = await this.$store.dispatch('user/checkWallet');
        // eslint-disable-next-line no-unused-expressions
        r.ok && callback();
      }
    },
    ShowModal(payload) {
      this.$store.dispatch('modals/show', {
        key: modals.default,
        ...payload,
      });
    },
    SetLoader(value) {
      this.$store.dispatch('main/setLoading', value);
    },
    CloseModal() {
      this.$store.dispatch('modals/hide');
    },
    ClipboardSuccessHandler(value) {
      this.$store.dispatch('main/showToast', {
        title: 'Copied successfully',
        text: value,
      });
    },
    ClipboardErrorHandler(value) {
      this.$store.dispatch('main/showToast', {
        title: 'Copy error',
        text: value,
      });
    },
    getDistanceFromLatLonInKm(lat1 = 0, lon1 = 0, lat2 = 0, lon2 = 0) {
      const R = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
      const dLon = this.deg2rad(lon2 - lon1);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2))
        * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = (R * c) * 1000; // Distance in km
      if (d >= 1000) {
        d = '+1000';
      } else if (d >= 500) {
        d = '+500';
      } else {
        d = '< 500';
      }
      return d;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    ShowToast(text, title = null) {
      this.$bvToast.toast(text, {
        title: title || this.$t('modals.errors.error'),
        variant: 'warning',
        solid: true,
        toaster: 'b-toaster-bottom-right',
        appendToast: true,
        toastClass: 'custom-toast-width',
        bodyClass: 'custom-toast-width',
      });
    },
    Floor: (value, precision = 4) => {
      const form = 10 ** precision;
      return Math.floor(value * form) / form || 0;
    },
    Ceil: (value, precision = 4) => {
      const form = 10 ** precision;
      return Math.ceil(value * form) / form || 0;
    },
    GetFormTimestamp(timestamp, format = 'DD.MM.YY H:mm') {
      if (timestamp !== 0 && timestamp !== '-' && timestamp !== '' && timestamp !== undefined) {
        // timestamp = +timestamp * 1000;
        timestamp = +timestamp;
        return moment(new Date(timestamp)).format(format);
      }
      return '-';
    },
    Require(img) {
      // eslint-disable-next-line global-require
      // return require(`assets/img/${img}`);
    },
    NumberFormat(value, fixed) {
      return (+value && new Intl.NumberFormat('ru', { maximumFractionDigits: fixed || 8 }).format(value || 0)) || 0;
    },
    GetLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.FormatPosition);
      }
    },
    CropTxt(str, maxLength) {
      if (str.length > maxLength) str = `${str.slice(0, maxLength)}...`;
      return str;
    },
    CutTxn(txn, first = 10, second = 10) {
      if (txn?.length > first + second) return `${txn.slice(0, first)}...${txn.slice(-second)}`;
      return txn;
    },
    FormatPosition(position) {
      const payload = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      this.$store.dispatch('user/setCurrentPosition', payload);
    },
    EmptyAvatar() {
      return require('~/assets/img/app/avatar_empty.png');
    },
    UserName(firstName, lastName) {
      if (firstName || lastName) return `${firstName || ''} ${lastName || ''}`;
      return this.$t('profile.defaultName');
    },
    NumberWithSpaces(value) {
      if (!value) return '';
      const parts = value.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return parts.join('.');
    },
    SetDelay(func, timeout, delayId) {
      clearTimeout(delayId);
      return setTimeout(func, timeout);
    },
    async DeleteQuest(questData, callback) {
      const { id, status, contractAddress } = questData;
      if (contractAddress && [QuestStatuses.Closed, QuestStatuses.Created].includes(status)) {
        this.SetLoader(true);
        const [feeRes] = await Promise.all([
          this.$store.dispatch('quests/getFeeDataJopMethod', {
            method: QuestMethods.CancelJob,
            contractAddress,
          }),
          this.$store.dispatch('wallet/getBalance'),
        ]);
        this.SetLoader(false);
        if (!feeRes.ok) {
          this.ShowToast(feeRes.msg);
          return;
        }
        this.ShowModal({
          key: modals.transactionReceipt,
          title: this.$t('quests.deleteQuest'),
          fields: {
            from: { name: this.$t('meta.fromBig'), value: this.$store.getters['user/getUserWalletAddress'] },
            to: { name: this.$t('meta.toBig'), value: contractAddress },
            fee: { name: this.$t('wallet.table.trxFee'), value: feeRes.result.fee.toString(), symbol: TokenSymbols.WUSD },
          },
          submitMethod: async () => {
            this.SetLoader(true);
            const trxRes = await this.$store.dispatch('quests/cancelJob', contractAddress);
            this.SetLoader(false);
            if (!trxRes.ok) {
              this.ShowToast(trxRes.msg);
              return;
            }
            const routeName = this.$route.name;
            if (routeName === 'quests-id') {
              await this.$router.replace('/my');
            } else if (routeName === 'my' || routeName === 'profile-id') {
              const payload = JSON.parse(sessionStorage.getItem('questsListFilter'));
              await this.$store.dispatch('quests/getUserQuests', payload);
            }
            this.ShowToast(this.$t('toasts.questDeleted'), this.$t('toasts.questDeleted'));
          },
        });
      } else {
        await this.$store.dispatch('main/showToast', {
          title: this.$t('meta.questInfo'),
          variant: 'warning',
          text: this.$t('toasts.questCantDelete'),
        });
      }
    },
    CalcPercent(preValue, value) {
      const valueWithoutWords = preValue.replace(/[^0-9,.]/g, '');
      const isEmpty = valueWithoutWords.length === 0;
      const isDotFirst = valueWithoutWords[0] === '.' || valueWithoutWords[0] === ',';
      if (isEmpty) {
        value = '';
      } else if (isDotFirst) {
        const memo = valueWithoutWords.split('');
        memo.unshift('0');
        if (memo[memo.length - 1] !== '%') { memo.push('%'); }
        value = memo.join('');
      } else {
        value = `${valueWithoutWords}%`;
      }
      value = value.replace(/,/g, '.');
      if (value.includes('.')) {
        const withoutDotsArray = value.split('.');
        if (withoutDotsArray.length > 2) {
          withoutDotsArray.splice(1, 0, '.');
          value = withoutDotsArray.join('');
        }
      }
      return value;
    },
    ChangeCaretPosition(ref) {
      const input = ref?.$refs.input;
      this.$nextTick(() => {
        const { length } = input.value;
        if (input.value[length - 1] === '%' && input.selectionStart === length) {
          input.selectionStart = length - 1;
          input.selectionEnd = length - 1;
        }
      });
    },
    DeclOfNum(n) {
      n = Math.abs(n) % 100;
      const n1 = n % 10;
      if (n > 10 && n < 20) { return 2; }
      if (n1 > 1 && n1 < 5) { return 1; }
      if (n1 === 1 && this.$i18n.locale === 'ru') { return 0; }
      return 2;
    },

    ScrollToTop: () => window.scrollTo(0, 0),
    IsProd: () => process.env.PROD === 'true',
    ShowModalSuccess(title = '') {
      this.ShowModal({
        key: modals.status,
        img: require('~/assets/img/ui/success.svg'),
        title: title || this.$t('modals.meta.success'),
      });
    },
    ShowModalFail(title = '') {
      console.log(title);
      this.ShowModal({
        key: modals.status,
        img: require('~/assets/img/ui/warning.svg'),
        title: title || this.$t('modals.meta.fail'),
      });
    },
    checkIfMobile() {
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
        /Opera Mini/i,
      ];

      return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem));
    },
  },
});
