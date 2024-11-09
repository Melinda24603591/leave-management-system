import type { App as VueApp } from 'vue';
import ECharts from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  DataZoomComponent,
  GridComponent,
  TooltipComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
]);

export default {
  install(Vue: VueApp) {
    Vue.component("v-chart", ECharts);
  },
};