
<template>
  <div class="mainBox1">
    <div class="title">
      <img
        src="./../../assets/images/comm/jt.png"
        class="titImg"
      />场景总累计占比
    </div>
    <div ref="allScenesEcharts" class="chartBox"></div>
  </div>
</template>
<script>
import * as configUrl from "@/assets/js/config.js";

export default {
  data() {
    return {
      sceneNumList: [],
      sceneNameList: [],
      sceneNumList: []
    };
  },


  mounted() {

  },


  methods: {
    // 获取17大类面详情信息
    selectCount() {
      let url = configUrl.api.selectCount;
      let param = {}
      let self = this;
      this.postAxios(url, param).then(result => {
        let sceneNumList = result.data.count;
        self.sceneNameList = [];
        self.sceneNumList = [];
        sceneNumList.map(item => {
          // self.sceneNameList.push(item.type.split("").join("\n"));
          self.sceneNameList.push(item.type);
          self.sceneNumList.push(item.count)
        })
        self.echerFn();

      }).catch(err => {
        console.log(err)
      })
    },

    // echer
    echerFn() {
      var self = this;
      var echarts = self.$refs.allScenesEcharts;
      var scenesCharts = self.$echarts.init(echarts);
      // 绘制图表
      scenesCharts.setOption({
        legend: {
          show: false,
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c}"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            magicType: { show: true, type: ["line", "bar"] },
            // restore: { show: true }, // 刷新
            // saveAsImage: { show: true } // 下载
          },
          iconStyle: {
            normal: {
              backgroundColor: '#205488',
              borderColor: '#205488',
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: { //坐标轴文字
            show: true,
            textStyle: {
              color: '#CACCD9',  //更改坐标轴文字颜色
              fontSize: 12      //更改坐标轴文字大小
            }
          },
          axisLine: {
            lineStyle: {
              show: false,
              color: '#205488',
              width: 1,
            }
          },
          axisTick: { //刻度线
            show: false
          },
          splitLine: {//网格线
            show: true,
            lineStyle: {
              color: ['#205488'],
              width: 1,
            }
          },
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              show: false,
              color: '#CACCD9',
              width: 1,//这里是为了突出显示加上的
            }
          },
          axisLabel: { //坐标轴文字
            show: true,
            textStyle: {
              color: '#CACCD9',  //更改坐标轴文字颜色
              fontSize: 12      //更改坐标轴文字大小
            }
          },
          axisTick: { //刻度线
            show: false
          },
          splitLine: {//网格线
            show: false
          },
          data: self.sceneNameList,
          axisLabel: {
            interval: 1,//横轴信息全部显示
            rotate: -30,//-30度角倾斜显示
          }
        },
        series: [
          {
            barWidth: "10",
            barCategoryGap: "50%",
            name: "",
            type: "bar",
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
            data: self.sceneNumList
          }
        ]

      });

    }
  },
  created() {
    this.selectCount();
  },
};
</script>
<style  lang="scss" scoped>
.mainBox1 {
  .chartBox {
    height: calc(100% - 0.625rem /* 10/16 */);
    position: relative;
    top: -1.25rem /* 20/16 */;
  }
}
</style>