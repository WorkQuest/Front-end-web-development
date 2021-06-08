import Vue from 'vue';

import CtmModal from '~/components/CtmModal';
import CtmModalBox from '~/components/CtmModal/CtmModalBox';
import Loader from '~/components/ui/Loader';
import Header from '~/components/app/Header';
import BaseButton from '~/components/ui/BaseButton';
import BaseInput from '~/components/ui/BaseInput';
import BaseDD from '~/components/ui/BaseDD';
import BaseCheckbox from '~/components/ui/BaseCheckbox';
import GMap from '~/components/GMap';
import GMapMarker from '~/components/GMapMarker';
import GMapInfoWindow from '~/components/GMapInfoWindow';
import BaseTable from '~/components/ui/BaseTable';

Vue.component('ctm-modal', CtmModal);
Vue.component('ctm-modal-box', CtmModalBox);
Vue.component('Header', Header);
Vue.component('base-btn', BaseButton);
Vue.component('base-field', BaseInput);
Vue.component('base-dd', BaseDD);
Vue.component('base-checkbox', BaseCheckbox);
Vue.component('loader', Loader);
Vue.component('GMap', GMap);
Vue.component('GMapMarker', GMapMarker);
Vue.component('GMapInfoWindow', GMapInfoWindow);
Vue.component('base-table', BaseTable);
