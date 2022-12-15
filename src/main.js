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





//primevue theme, core css, and icons
import 'primevue/resources/themes/bootstrap4-light-purple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css' 


const app = createApp(App);
app.use(router)
app.use(PrimeVue)
app.use(ToastService);



app.component('Button', Button)
app.component('InputText', InputText)
app.component('Toas', Toast)

app.mount('#app')
