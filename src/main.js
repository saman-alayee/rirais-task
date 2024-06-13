import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index'; 
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import './assets/styles/style.css'; 
import store from './store';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
