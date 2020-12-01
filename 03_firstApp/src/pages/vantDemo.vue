<template>
  <div class="vant-demo">
    <h1>{{ msg }}</h1>
    <select-multiple
        label="多选checkbox"
        placeholder="请选择"
        v-model="value2"
        :columns="columns"
        label-width="100"
        :option="{label:'name',value:'code'}"
        @confirm="confirm"
    />
  </div>
</template>

<script>
import selectMultiple from '@/components/selectMutiple.vue';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to vant demo',
        value2: ['1'], // checkbox选中的value
        columns: [// 如果可选数据不是label-value,需要配置下option，如果是就不需要配置
            { name: '我是选中的label', code: '1', other: '额外数据' },
            { name: '我也是选中的label33333', code: '2', other: '额外数据' },
            { name: '我是选中的label', code: '21', other: '额外数据' },
            { name: '我也是选中的label555555555', code: '22', other: '额外数据' },
            { name: '我是选中的label', code: '11', other: '额外数据' },
            { name: '我也是选中的label', code: '52', other: '额外数据' },
            { name: '我是选中的label', code: '71', other: '额外数据' },
            { name: '我也是选中的label', code: '72', other: '额外数据' }
            ]
    }
  },
    methods: {
    confirm (data1, data2) { // select确定,
        // tips 正常获取值，用不到这个方法，用v-model获取值即可，这个方法是告诉你，可以获取任何你想要的数据
        // data1 是当前选中数据的value的数组
        // data2 是当前选中数据的整个obj集合
        console.log(data1, data2)
        this.value3 = data2
        },
    },
  components: {
    // "echarts-line": echartLine,
    // "table-show": tableShow,
    // "echarts-xbar": echartsXbar,
    // "echarts-ybar": echartsYbar,
    "select-multiple": selectMultiple,
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
