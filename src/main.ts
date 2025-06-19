import './assets/main.css'
import { Button, List, Image as VanImage, Card, ConfigProvider, Tab, Tabs   } from 'vant';
import 'vant/lib/index.css';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.use(Button);
app.use(List);
app.use(VanImage);
app.use(Card);
app.use(ConfigProvider);
app.use(Tab);
app.use(Tabs);
app.mount('#app')
