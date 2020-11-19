<template>
    <div id="pie_one_echarts">
        <div ref="echarts"></div>
    </div>
</template>

<script>
import echarts from "@/pages/commonJS/echartsNeed.js";//按需加载
export default {
    name: 'pieOneEcharts',
    props: {
        // 配置数据
        data: {
            type: Object,
            default: () => {
                return {
                    seriesData:[],

                }
            }
        },
    },
    data(){
        return {
            dataIndex:0,
            timeInterval:'',
            pieChart:'',
            nullDataFlag:false,
        }
    },
    // 父组件传入更新数据时，重新渲染图表展示新数据
    watch : {
        data:{
            // 数据更新后更新视图，初次绑定时不执行方法
            handler(oldVal,newVal){
                this.$nextTick(() => {
                    this.initEcharts()
                })
            },
            deep:true,
            immediate: false
        }
    },
    methods: {
        initEcharts () {
            var myChart = echarts.init(this.$refs.echarts)
            this.pieChart = myChart;
            var sData = this.data.seriesData;
            var curIndex = 0;
            var colorList = [];
            // debugger
            // var colorList = ['#2039C3', '#2B63D5', '#0F9AF8', '#2ECACE', '#6F81DA', '#30BB45', '#FC962C','#D83472'];

            if (this.data && this.data.seriesData && this.data.seriesData.length > 0){
                this.nullDataFlag = false;
                this.setBarInterval();
                sData = this.data.seriesData
                colorList = ['#2039C3', '#2B63D5', '#0F9AF8', '#2ECACE', '#6F81DA', '#30BB45', '#FC962C','#D83472'];
            } else {
                //无数据
                this.nullDataFlag = true;
                this.clearBarInterval();//无数据时不启动定时器
                sData = [0]
                colorList = ['#0d346d']
            }
            
            var option = {
                title: {
                    show:false,
                    text: '品种',
                    x: '30%',
                    y: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    show:false,
                    borderColor: 'rgba(255,255,255,.3)',
                    backgroundColor: 'rgba(13,5,30,.6)',
                    borderWidth: 1,
                    padding: 5,
                    formatter: function(parms) {
                        var str = parms.marker + "" + parms.data.name + "</br>" +
                            "数量：" + parms.data.value + "头</br>" +
                            "占比：" + parms.percent + "%";
                        return str;
                    }
                },
                series: [{
                    type: 'pie',
                    z: 3,
                    center: ['50%', '50%'],//饼图位置
                    radius: ['63%', '85%'],//饼图大小
                    clockwise: true,
                    avoidLabelOverlap: false,
                    hoverOffset: 6,//悬浮时扇区的放大半径
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    label: {
                        normal:{
                            show: false,
                            position: 'center',
                            formatter: this.nullDataFlag?'{c|暂无数据}':'\n {per|{d}%} \n {a|告警类型} \n {b|{b}}',
                            // formatter:function(params){
                            //     debugger
                            //     let nm = params.data.name
                            //     let per = params.data.value ;
                            //     // return [`{b|${nm}}\n{per|${per}(台)}`]
                            //     return [`{per|{d}%} \n {a|告警类型} \n {b|{b}}`]
                            // },
                            // backgroundColor: '#eee',
                            // borderColor: '#aaa',
                            // borderWidth: 1,
                            // borderRadius: 4,
                            rich: {
                                a: {
                                    color: '#fff',
                                    lineHeight: this.$util.remToPx(0.26),
                                    fontSize: this.$util.remToPx(0.18),
                                    align: 'center'
                                },
                                b: {
                                    color: '#0f9af8',
                                    fontSize: this.$util.remToPx(0.18),
                                    lineHeight: this.$util.remToPx(0.26),
                                },
                                per: {
                                    color: '#FFED51',
                                    // backgroundColor: '#334455',
                                    padding: [2, 4],
                                    fontSize: this.$util.remToPx(0.18),
                                    lineHeight: this.$util.remToPx(0.32),
                                    fontFamily: 'lianmengqiyilushuaizhengruiheiti',
                                    borderRadius: 2
                                },
                                c:{
                                    color: '#fff',
                                    fontSize: this.$util.remToPx(0.18)
                                }
                            }
                        },
                        emphasis: {
                            show: true, //文字置于中间时，这里需为true
                            textStyle: { //设置文字样式
                                fontSize: '12',
                                color:"#ffffff"
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show:false,
                            length: 20,
                            length2: 30,
                            lineStyle: {
                                width: 1
                            }
                        }
                    },
                    data: sData
                }]
            }
            myChart.setOption(option);
            //容器大小发生变化时自适应
            window.addEventListener("resize", e => { 
                myChart.resize();
                this.refreshSize();
            });

            // 默认选中最大比例，静态展示start
            // var index = curIndex; //默认选中的index
            // myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: index});

            // // 当鼠标移入时，如果不是第一项，则把当前项置为选中，如果是第一项，则设置第一项为当前项
            // myChart.on('mouseover',function(e){
            //     myChart.dispatchAction({type: 'downplay',seriesIndex: 0,dataIndex:index}); 
            //     if(e.dataIndex != index){            
            //         myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index  });     
            //     }
            //     if(e.dataIndex == index){
            //         myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex:e.dataIndex});
            //     }
            // });

            // //当鼠标离开时，把当前项置为选中 
            // myChart.on('mouseout',function(e){
            //     index = e.dataIndex;
            //     myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex}); 
            // });
            // 默认选中最大比例，静态展示end

            myChart.dispatchAction({
                type:'highlight',
                dataIndex: 0
            });
            // myChart.on('mouseover',function(e){//此写法改变this指针无法访问clearBarInterval
            myChart.on('mouseover',e => {
                // console.log("mouseover")
                //鼠标移入停止计时器
                this.clearBarInterval();
                myChart.dispatchAction({
                    type:'downplay',
                    seriesIndex:0
                });
                myChart.dispatchAction({
                    type:'highlight',
                    dataIndex:e.dataIndex
                });
                this.dataIndex = e.dataIndex;
            });
            myChart.on('mouseout',e => {
                //鼠标离开开启计时器
                // console.log("mouseout")
                if (!this.nullDataFlag){
                    this.setBarInterval();
                }
                
            });
        },
        refreshSize(){
            //重新计算文字大小并刷新
            var option = this.pieChart.getOption();
            // console.log("per fontsize-" + option.series[0].label.rich.per.fontSize)
            option.series[0].label.rich.a.fontSize = this.$util.remToPx(0.18)
            option.series[0].label.rich.a.lineHeight = this.$util.remToPx(0.26)
            option.series[0].label.rich.b.fontSize = this.$util.remToPx(0.18)
            option.series[0].label.rich.b.lineHeight = this.$util.remToPx(0.26)
            option.series[0].label.rich.per.fontSize = this.$util.remToPx(0.18)
            option.series[0].label.rich.per.lineHeight = this.$util.remToPx(0.32)
            option.series[0].label.rich.c.fontSize = this.$util.remToPx(0.18)
            this.pieChart.setOption(option);    
        },
        clearBarInterval(){
            //console.log("clearBarInterval");
            clearInterval(this.timeInterval);
            this.timeInterval = null;
        },
        setBarInterval(){
            //console.log("setBarInterval 1");
            if (!this.timeInterval){
                this.timeInterval = setInterval(this.changeHighlight, 2000);
                //console.log("setBarInterval 2:" + this.timeInterval);
            }
        },
        changeHighlight(){
            let chartData = this.pieChart;
            // console.log("dataindex:" + this.dataIndex);
            this.dataIndex++;
            if (this.data.seriesData.length == this.dataIndex){
                this.dataIndex = 0
            }
            //跳过空数据 开始
            for (let i=this.dataIndex; i <this.data.seriesData.length; i++){
                if (this.data.seriesData[this.dataIndex].value == 0){
                    this.dataIndex++;
                }
            }
            if (this.data.seriesData.length == this.dataIndex){
                this.dataIndex = 0
            }
            //跳过空数据 结束

            chartData.dispatchAction({
                type: 'downplay',
                seriesIndex: 0
            });
            chartData.dispatchAction({
                type:'highlight',
                dataIndex: this.dataIndex
            });
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.initEcharts()
        })
    },
    destroyed(){
        this.clearBarInterval();
    },
}
</script>

<style lang="less" scoped>
/* 保证可以撑满父组件用来包裹本组件的盒子 */
#pie_one_echarts {
    width: 100%;
    height: 100%;
    div {
        width: 100%;
        height: 100%;
    }
}
</style>