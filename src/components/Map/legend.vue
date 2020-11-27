<template>
  <div class="commonLegend">
    <!--指标视图----- 图例 -->
    <div v-show="isTypeActive == 3">
      <el-row>
        <el-radio-group v-model="indexName" size="small">
          <el-radio-button label="宽带渗透率"></el-radio-button>
          <el-radio-button label="端口空闲数"></el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row>
        <!-- 宽带渗透率 -->
        <el-checkbox-group
          v-show="indexName == '宽带渗透率'"
          v-model="targetLegendListVal"
          @change="checkItemChanged"
        >
          <el-checkbox
            :label="item.name"
            v-for="(item, index) in targetLegendList"
            :key="index"
          >
            <div class="legendCheckbox" :class="item.class">
              {{ item.name }}
            </div>
          </el-checkbox>
        </el-checkbox-group>
        <!-- 端口空闲数 -->
        <el-checkbox-group
          v-show="indexName == '端口空闲数'"
          v-model="portFreeVal"
          @change="portFreeChanged"
        >
          <el-checkbox
            :label="item.name"
            v-for="(item, index) in portFreeList"
            :key="index"
          >
            <div class="legendCheckbox" :class="item.class">
              {{ item.name }}
            </div>
          </el-checkbox>
        </el-checkbox-group>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "commonlegend",
  data() {
    return {
      indexName: "宽带渗透率",
      radio1: "1",
      targetLegendList: [
        {
          name: "渗透率 >= 60%",
          num: "0",
          class: "bg1",
          section: [60, 100],
          color: '#47d872',
        },
        {
          name: "30% =< 渗透率 < 60%",
          num: "0",
          class: "bg2",
          section: [30, 60],
          color: '#40d0e0',
        },
        {
          name: "10% =< 渗透率 < 30%",
          num: "0",
          class: "bg3",
          section: [10, 30],
          color: '#ffc000',
        },
        {
          name: " 0 < 渗透率 <10%",
          num: "0",
          class: "bg4",
          section: [1, 10],
          color: '#ff6347',
        },
        {
          name: "渗透率 0",
          num: "0",
          class: "bg5",
          section: [0, 1],
          color: '#ff0000',
        },
      ],
      targetLegendListVal: [], // 选中的图例
      portFreeVal: [],
      portFreeList: [
        {
          name: "空闲数 >= 300",
          num: "0",
          class: "bg1",
          section: [300, 400],
          color: '#47d872',
        },
        {
          name: "200 =< 空闲数 < 300",
          num: "0",
          class: "bg2",
          section: [200, 300],
          color: '#40d0e0',
        },
        {
          name: "100 =< 空闲数 < 200",
          num: "0",
          class: "bg3",
          section: [100, 200],
          color: '#ffc000',
        },
        {
          name: "1 =< 空闲数 < 100",
          num: "0",
          class: "bg4",
          section: [1, 100],
          color: '#ff6347',
        },
        {
          name: "空闲数 = 0",
          num: "0",
          class: "bg5",
          section: [0, 1],
          color: '#ff0000',
        },
      ]
    };
  },
  props: {
    fullScreen: {
      type: Boolean,
    },
    isTypeActive: {
      type: String,
    },
  },
  computed: {
    ...mapGetters(["mapModular", "comExpression","selectScene"]),
  },
  watch: {
    indexName(data) {
      let self = this;
      if (data === '宽带渗透率') {
        this.legendRendering('permeability');
        this.targetLegendCheckboxFn(this.targetLegendListVal);
      } else if (data === '端口空闲数') {
        this.legendRendering('port');
        this.portCheckboxFn(this.portFreeVal);
      }
    }
  },
  methods: {
    // 指标图例复选框选择事件
    checkItemChanged(value) {
      this.targetLegendCheckboxFn(value)
    },
    // 端口选择
    portFreeChanged(val) {
      this.portCheckboxFn(val)
    },
    // "指标分析视图" ==> 图例复选框事件
    targetLegendCheckboxFn(data) {
      let self = this;
      // let list = ["已录入", "未录入", "部分录入"];
      let mGridLayerExpression = '';
      data.map(item => {
        switch (item) {
          case '渗透率 >= 60%':
            if (mGridLayerExpression) {
              mGridLayerExpression += " or GWM_BROADBAND_RATE >= 60";
            } else {
              mGridLayerExpression = "GWM_BROADBAND_RATE >= 60";
            }
            break;
          case '30% =< 渗透率 < 60%':

            if (mGridLayerExpression) {
              mGridLayerExpression += " or (GWM_BROADBAND_RATE < 60 and GWM_BROADBAND_RATE >= 30)";
            } else {
              mGridLayerExpression = "(GWM_BROADBAND_RATE < 60 and GWM_BROADBAND_RATE >= 30)";
            }

            break;
          case '10% =< 渗透率 < 30%':
            if (mGridLayerExpression) {
              mGridLayerExpression += " or (GWM_BROADBAND_RATE < 30 and GWM_BROADBAND_RATE >= 10)";
            } else {
              mGridLayerExpression = "(GWM_BROADBAND_RATE < 30 and GWM_BROADBAND_RATE >= 10)";
            }
            break;
          case '0 < 渗透率 <10%':
            if (mGridLayerExpression) {
              mGridLayerExpression += " or (GWM_BROADBAND_RATE >=1 and GWM_BROADBAND_RATE < 10)";
            } else {
              mGridLayerExpression = " GWM_BROADBAND_RATE >=1 and GWM_BROADBAND_RATE < 10";
            }
            break;
          case '渗透率 0':
            if (mGridLayerExpression) {
              mGridLayerExpression += " or GWM_BROADBAND_RATE = 0";
            } else {
              mGridLayerExpression = " GWM_BROADBAND_RATE = 0";
            }
            break;
        }
      })
      if (!mGridLayerExpression) {
        mGridLayerExpression = "GWM_BROADBAND_RATE = 404";
      }

      // 清除选中面图层
      if (self.mapModular.Map.getLayer("dynamicLayersGraphicsLayerId")) {
        self.mapModular.Map.getLayer("dynamicLayersGraphicsLayerId").clear();
      }
      // 根据微格筛选渲染部分
      mGridLayerExpression = self.comExpression ? `(${mGridLayerExpression})` + ' and ' + self.comExpression : `(${mGridLayerExpression})`;
      if (self.mapModular.Map.getLayer('targetLayer')) {
        self.mapModular.Map.getLayer('targetLayer').setDefinitionExpression(mGridLayerExpression);
      }
    },
    // "指标分析视图" ==> 端口空闲数复选框
    portCheckboxFn(data) {
      let self = this;
      let mGridLayerExpression = '';
      data.map(item => {
        switch (item) {
          case '空闲数 >= 300':
            if (mGridLayerExpression) {
              mGridLayerExpression += " or GWM_USER_UNACCESS >= 300";
            } else {
              mGridLayerExpression = "GWM_USER_UNACCESS >= 300";
            }
            break;
          case '200 =< 空闲数 < 300':

            if (mGridLayerExpression) {
              mGridLayerExpression += " or (GWM_USER_UNACCESS < 300 and GWM_USER_UNACCESS >= 200)";
            } else {
              mGridLayerExpression = "(GWM_USER_UNACCESS < 300 and GWM_USER_UNACCESS >= 200)";
            }

            break;
          case '100 =< 空闲数 < 200':
            if (mGridLayerExpression) {
              mGridLayerExpression += " or (GWM_USER_UNACCESS >= 100 and GWM_USER_UNACCESS < 200)";
            } else {
              mGridLayerExpression = "(GWM_USER_UNACCESS >= 100 and GWM_USER_UNACCESS < 200)";
            }
            break;
          case '1 =< 空闲数 < 100':
            if (mGridLayerExpression) {
              mGridLayerExpression += " or (GWM_USER_UNACCESS >=1 and GWM_USER_UNACCESS < 100)";
            } else {
              mGridLayerExpression = " GWM_USER_UNACCESS >=1 and GWM_USER_UNACCESS < 100";
            }
            break;
          case '空闲数 = 0':
            if (mGridLayerExpression) {
              mGridLayerExpression += " or GWM_USER_UNACCESS = 0";
            } else {
              mGridLayerExpression = " GWM_USER_UNACCESS = 0";
            }
            break;
        }
      })
      if (!mGridLayerExpression) {
        mGridLayerExpression = "GWM_USER_UNACCESS = 404";
      }

      // 清除选中面图层
      if (self.mapModular.Map.getLayer("dynamicLayersGraphicsLayerId")) {
        self.mapModular.Map.getLayer("dynamicLayersGraphicsLayerId").clear();
      }
      // 根据微格筛选渲染部分
      mGridLayerExpression = self.comExpression ? `(${mGridLayerExpression})` + ' and ' + self.comExpression : `(${mGridLayerExpression})`;
      if (self.mapModular.Map.getLayer('targetLayer')) {
        self.mapModular.Map.getLayer('targetLayer').setDefinitionExpression(mGridLayerExpression);
      }
    },
    // 根据图例渲染图层
    legendRendering(type) {
      let self = this;
      let server = `${this.configUrl.MapServer.type}/${this.selectScene.id}`
      // 清空图层选择样式
      this.mapUtil.removeLayer(this, "targetLayer")
      let identification = [];
      // let colors=[];
      let colors = ['#47d872', '#40d0e0', '#ffc000', '#ff6347', '#ff0000'];
      if (type == 'permeability') {
        /**
          * 根据"GWM_BROADBAND_RATE"判断设置渲染的方式 
          * identification 区间
        */
        identification = [];
        // colors=[];
        // this.targetLegendListVal.map(item => {
          self.targetLegendList.map(data => {
            // if (item == data.name) {
              identification.push(data.section)
              // colors.push(data.color)
            // }
          })
        // })
        this.mapUtil.IntervalRendering(this, server, 'targetLayer', 'GWM_BROADBAND_RATE', identification, colors)
      } else {
        identification = [];
        // colors=[];
        // this.portFreeVal.map(item => {
          self.portFreeList.map(data => {
            // if (item == data.name) {
              identification.push(data.section);
              //  colors.push(data.color)
            // }
          })
        // })
        this.mapUtil.IntervalRendering(this, server, 'targetLayer', 'GWM_USER_UNACCESS', identification, colors)
      }
      /*专题图层过滤*/
      let layerIds = ['targetLayer'];
      self.mapUtil.thematicLayerFiltering(self, layerIds, self.comExpression)
    },

  },
  created() {
    let self = this;

    // 默认选中 
    // 渗透率
    this.targetLegendList.map(item => {
      self.targetLegendListVal.push(item.name)
    })
    // 端口空闲
    this.portFreeList.map(item => {
      self.portFreeVal.push(item.name)
    })

    this.legendRendering('permeability');
  },
};
</script>

<style lang="scss" scoped>
.commonLegend {
  position: absolute;
  background: #ffffff;
  z-index: 1;
  right: 0%;
  top: 1%;
  >>> .el-checkbox-group {
    width: 12.5rem;

    margin-top: 2%;
  }
}
.legendCheckbox {
  height: 1.875rem /* 30/16 */;
  line-height: 1.875rem /* 30/16 */;
  color: #fff;
  border-radius: 0.3125rem /* 5/16 */;
  padding: 0 0.625rem /* 10/16 */;
  width: calc(12.5rem /* 200/16 */ - 1.4375rem /* 23/16 */);
  margin-top: 0.3125rem /* 5/16 */;
}
.bg1 {
  background-color: #47d872;
}
.bg2 {
  background-color: #40d0e0;
}
.bg3 {
  background-color: #ffd700;
}
.bg4 {
  background-color: #ff6347;
}
.bg5 {
  background-color: #ff0000;
}
</style>