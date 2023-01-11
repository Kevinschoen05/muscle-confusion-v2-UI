import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router'
import store from './store/index'

//global stylesheet to use primevue fonts etc
import './assets/app.css'


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


const app = createApp(App);
app.use(router)
app.use(store)
app.use(PrimeVue)
app.use(ToastService);


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

app.mount('#app')
