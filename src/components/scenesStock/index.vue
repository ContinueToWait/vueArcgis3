<template>
   <div class="mainBox">
      <div class="title"><img src="./../../assets/images/comm/jt.png" class="titImg">场景存量</div>
        <div ref="scenesStockEcharts" class="chartBox"></div>
        <ul class="textBox">
          <li>
            <label>802</label>
            <span>已录入</span>
          </li>
          <li>
            <label>790</label>
            <span>未录入</span>
          </li>
        </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  
  mounted() {
    var self = this;
     self.$nextTick(() => {
      var echarts = self.$refs.scenesStockEcharts;
      var scenesCharts = self.$echarts.init(echarts);
      var value="0.504"
      var data = [value, value, value, value, value, ];
      // 绘制图表
      scenesCharts.setOption({
            series: [{
            type: 'liquidFill',
            radius: '85%',
            center: ['45%', '53%'],
            data: data,
            backgroundStyle: {
            borderWidth: 5,
            borderColor: '#6DC8EC',
            color: '#fff'
            },
            label: {
                normal: {
                    formatter: "完成率"+'\n'+(value * 100).toFixed(2) + '%',
                    textStyle: {
                        fontSize: 16,
                        lineHeight:25
                    }
                }
            }
        }]
       
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
    width:100%;
    height: calc(60% - .625rem /* 10/16 */);
  }
  .textBox{
    width:100%;
    height: calc(40% - .625rem /* 10/16 */);
    list-style: none;
    padding: 10px 15px; /* 35/16 */ ;
    li {
      float: left;
      width: 50%;
      text-align: center;
      label {
        display: inline-block;
        font-size: 1.25rem /* 28/16 */;
        font-weight: normal;
        font-size: #209af5;
      }
      span {
        display: inline-block;
        opacity: 0.5;
        font-size: .75rem /* 12/16 */;
      }
    }
  }
}
</style>