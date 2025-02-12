import { createApp } from 'vue'
import './style.css';
import App from './App.vue'

createApp(App).mount('#app')
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  