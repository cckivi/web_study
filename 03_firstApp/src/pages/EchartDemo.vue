<template>
  <div class="echart-demo">
    <h1>{{ msg }}</h1>
    <div class="demo1">
      <div class="echart-title">echart one</div>
      <div class="echart" style="width:100%;height:90%">
        <echarts-pie-one ref="merchantStatis" :data="alarmTypeData"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
Vue.prototype.$echarts = echarts;
import echarts from "@/pages/commonJS/echartsNeed.js";//按需加载
import echartsPieOne from '@/components/echartsPieOne.vue';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to echart demo',
      alarmTypeData:{
        seriesData:[
          {name: "厨师帽", value: "100"}, 
          {name: "未带口罩", value: "20"}, 
          {name: "鼠患", value: "3"}, 
          {name: "违规置物", value: "8"}, 
          {name: "工作服", value: "20"}, 
          {name: "区域入侵", value: "30"}, 
          {name: "人脸识别", value: "90"}, 
          {name: "其他", value: "55"}
        ]
      },
    }
  },
  components: {
    // "echarts-line": echartLine,
    // "table-show": tableShow,
    // "echarts-xbar": echartsXbar,
    // "echarts-ybar": echartsYbar,
    "echarts-pie-one": echartsPieOne,
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1, h2 {
  font-weight: normal;
  font-size: 0.4rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.echart-demo{
  .demo1{
    background: #114792;
    width: 2rem;
    height: 2rem;
    .echart-title{
      color:#fff;
    }
  }
}

</style>
