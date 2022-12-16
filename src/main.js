import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router'

//global stylesheet to use primevue fonts etc
import './assets/app.css'

//primevue components
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';







//primevue theme, core css, and icons
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css' 
//Primeblocks
import "primeflex/primeflex.css";




const app = createApp(App);
app.use(router)
app.use(PrimeVue)
app.use(ToastService);


app.component('Dropdown', Dropdown)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Toas', Toast)

app.mount('#app')
