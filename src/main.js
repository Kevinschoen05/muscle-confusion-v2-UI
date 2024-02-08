import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router'
import store from './store/index'
import dayjs from 'dayjs'

//global stylesheet to use primevue fonts etc
import './assets/app.css'

//fontawesome icons
import '@fortawesome/fontawesome-free/css/all.css';

//primevue theme, core css, and icons
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css' 
//Primeblocks
import "primeflex/primeflex.css";

//primevue components
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Divider from 'primevue/divider'
import Chip from 'primevue/chip'
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row'
import Checkbox from 'primevue/checkbox'
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import TabMenu from 'primevue/tabmenu';
import ToggleButton from 'primevue/togglebutton';
import Dialog from 'primevue/dialog'
import SelectButton from 'primevue/selectbutton';
import InputSwitch from 'primevue/inputswitch'
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import Paginator from 'primevue/paginator'
import Chart from 'primevue/chart';
import Knob  from 'primevue/knob';
import Calendar from 'primevue/calendar';
import Menu from 'primevue/menu'
import TextArea from 'primevue/textarea';
import Card from 'primevue/card'
import Panel from 'primevue/panel';
import Tag from 'primevue/tag';
import Slider from 'primevue/slider';
import RadioButton from 'primevue/radiobutton';









const app = createApp(App);
app.use(router)
app.use(store)
app.use(PrimeVue)
app.use(ToastService);
app.use(PrimeVue, {ripple: true});

app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);
app.directive('badge', BadgeDirective);
app.directive('tab')



app.config.globalProperties.$dayjs = dayjs;

app.component('Dropdown', Dropdown)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Toast', Toast)
app.component('Divider', Divider)
app.component('Chip', Chip)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Row', Row)
app.component('Checkbox', Checkbox)
app.component('ToggleButton', ToggleButton)
app.component('Dialog', Dialog)
app.component('SelectButton', SelectButton)
app.component( 'InputSwitch',InputSwitch)
app.component('Badge', Badge)
app.component('Paginator', Paginator)
app.component('Chart', Chart)
app.component('Knob', Knob)
app.component('Calendar', Calendar)
app.component('TabMenu', TabMenu)
app.component('Menu', Menu)
app.component('TextArea', TextArea)
app.component('Card', Card)
app.component('Panel', Panel)
app.component('Tag', Tag)
app.component('Slider', Slider)
app.component('RadioButton', RadioButton)

app.mount('#app')
