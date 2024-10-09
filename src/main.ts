import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./routes";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import {createPinia} from "pinia";
import VueApexCharts from "vue3-apexcharts";


const pinia = createPinia()
createApp(App).use(router).use(Antd).use(pinia).use(VueApexCharts).mount('#app')
