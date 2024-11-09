import { createApp } from 'vue'
import pinia from './stores'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './styles/index.scss'
import ElSvg from './components/SvgIcon/ElSvg'
import './permission'
import Echarts from "./utils/echarts";


const app = createApp(App)


ElSvg(app)

app.use(pinia)
  .use(router)
  .use(Echarts)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount('#app')
