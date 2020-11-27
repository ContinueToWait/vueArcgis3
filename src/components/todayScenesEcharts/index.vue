
<template>
  <div class="mainBox">
      <div class="title"><img src="./../../assets/images/comm/jt.png" class="titImg">场景日累计占比</div>
      <div ref="todayScenesEcharts" class="chartBox"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },

  
 mounted () {
    var self = this;
    self.$nextTick(() => {
      var echarts = self.$refs.todayScenesEcharts;
      var scenesCharts = self.$echarts.init(echarts);

      // 绘制图表
      scenesCharts.setOption({
        legend: {
          show:false,
        },
         tooltip: {
          trigger: 'item',
          formatter: "{b}: {c}"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            magicType: { show: true, type: ["bar", "line"] },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          iconStyle:{
              normal:{
                backgroundColor:'#205488',
                borderColor:'#205488',
              }
          }
        },
        yAxis: {
          type: "value",
          axisLine:{
              lineStyle:{
                show:false,
                  color:'#205488',
                  width:1,
              }
          },
          axisTick:{ //刻度线
            show:false
          }, 
          splitLine: {//网格线
            show: true,
            lineStyle:{
              color: ['#205488'],
              width: 1,
            }
          },
        },
        xAxis: {
          type: "category",
          axisLine:{
              lineStyle:{
                show:false,
                color:'#CACCD9',
                width:1,//这里是为了突出显示加上的
              }
          }, 
          axisLabel: { //坐标轴文字
            show: true,
              textStyle: {
                color: '#CACCD9',  //更改坐标轴文字颜色
                fontSize : 12      //更改坐标轴文字大小
              }
          },
          axisTick:{ //刻度线
            show:false
          }, 
          splitLine: {//网格线
            show: false
          },
          data: [
            "政府机关",
            "学校",
            "医疗",
            "社区",
            "住宿",
            "市场",
            "商铺",
            "商业综合体",
            "企业",
            "园区",
            "交通枢纽",
            "交通服务",
            "商务楼宇",
            "居民小区",
            "民宅",
            "文化旅游",
            "村委会",
          ]
        },
        series: [
          {
            barWidth: "1",
            barCategoryGap: "50%",
            name: "",
            type: "line",
            stack: "总量",
            color: "#209af5",
            right: "4",
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#fff"
              }
            },
            data: [12, 46, 34, 70, 20, 56,100,89,78,56,57,87,45,62,35,15,12]
          }
        ]
      });

    });

  },


  methods: {
    
  },
  created() {

  },
};
</script>
<style  lang="scss" scoped>
.mainBox{
  .chartBox{
    height: calc(100% - .625rem /* 10/16 */);
    position: relative;
    top: -1.25rem /* 20/16 */;
  }
}
</style>