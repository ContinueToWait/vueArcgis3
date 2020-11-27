<template>
  <div class="mainBox">
    <div class="title">
      <img
        src="@/assets/images/comm/jt.png"
        class="titImg"
      />安康市汉滨区老城分局简介
    </div>
    <vue-seamless-scroll
      v-if="areaDetailList"
      :data="areaDetailList"
      class="seamless-warp"
      :class-option="classOption"
    >
      <div class="content" v-for="(item, index) in areaDetailList" :key="index">
        <!-- 基础信息 -->
        <el-row class="border-btn" :gutter="10">
          <el-col :span="24">
            <el-col :span="24">
              <div class="leftBox text-l mg-b10">
                <!-- <div class="imgBox">
                <img src="./../../assets/images/comm/fenju.png" />
              </div> -->
                <p class="col-209">基础信息:</p>
              </div>
            </el-col>
            <el-col :span="24">
              <el-col :span="12" class="item">
                <div>
                  <span>{{ item.area }}</span>
                </div>
                <label>面积<span>(km²)</span></label>
              </el-col>
              <el-col :span="12" class="item">
                <div>
                  <span>{{ item.populations }}</span>
                </div>
                <label>常驻人口<span>(户)</span></label>
              </el-col>
              <el-col :span="12" class="item">
                <div>
                  <span>{{ item.familys }}</span>
                </div>
                <label>家庭数<span>(户)</span></label>
              </el-col>
            </el-col>
          </el-col>
        </el-row>

        <!-- 人员信息： -->
        <el-row class="mg-t10 border-btn" :gutter="10">
          <el-col :span="24">
            <el-col :span="24">
              <div class="leftBox text-l mg-b10">
                <!-- <div class="imgBox">
                <img src="./../../assets/images/comm/tuandui.png" />
              </div> -->
                <p>人员信息：</p>
              </div>
            </el-col>
            <el-col :span="24">
              <el-col :span="12" class="item">
                <div>
                  <span class="font13">{{ item.managerName }}</span>
                </div>
                <label>分局长姓名</label>
              </el-col>
              <el-col :span="12" class="item">
                <div>
                  <span>{{ item.employees }}</span>
                </div>
                <label>员工人数<span>(人)</span></label>
              </el-col>
              <el-col :span="12" class="item">
                <div>
                  <span>{{ item.managerWgrid }}</span>
                </div>
                <label>微格经理<span>(人)</span></label>
              </el-col>
              <el-col :span="12">
                <div>
                  <span>{{ item.salesTeam }}</span>
                </div>
                <label>直销团队<span>(人)</span></label>
              </el-col>
            </el-col>
          </el-col>
        </el-row>

        <!-- 渠道信息： -->
        <el-row class="mg-t10 border-btn" :gutter="10">
          <el-col :span="24">
            <el-col :span="24">
              <div class="leftBox text-l mg-b10">
                <!-- <div class="imgBox">
                <img src="./../../assets/images/comm/jizhan.png" />
              </div> -->
                <p>渠道信息：</p>
              </div>
            </el-col>
            <el-col :span="24">
              <el-col :span="12" class="item3">
                <div>
                  <span>{{ item.self }}</span>
                </div>
                <label>自营厅<span>(个)</span></label>
              </el-col>
              <el-col :span="12" class="item3">
                <div>
                  <span>{{ item.channels }}</span>
                </div>
                <label>社会渠道<span>(个)</span></label>
              </el-col>
              <el-col :span="12" class="item3">
                <div>
                  <span>{{ item.kuanfuStation }}</span>
                </div>
                <label>宽服站<span>(个)</span></label>
              </el-col>
              <el-col :span="12" class="item3">
                <div>
                  <span>{{ item.panChannel }}</span>
                </div>
                <label>泛渠道<span>(户)</span></label>
              </el-col>
            </el-col>
          </el-col>
        </el-row>

        <!-- 宽带信息 -->
        <el-row class="mg-t10 border-btn" :gutter="10">
          <el-col :span="24">
            <el-col :span="24">
              <div class="leftBox text-l mg-b10">
                <!-- <div class="imgBox">
                <img src="./../../assets/images/comm/jizhan.png" />
              </div> -->
                <p>宽带信息:</p>
              </div>
            </el-col>
            <el-col :span="24">
              <el-col :span="12" class="item3">
                <div>
                  <span>{{ item.communities }}</span>
                </div>
                <label>小区数量<span>(个)</span></label>
              </el-col>
              <el-col :span="12" class="item3">
                <div>
                  <span>{{ item.connecteds }}</span>
                </div>
                <label>已接入数量<span>(个)</span></label>
              </el-col>
              <el-col :span="12" class="item3">
                <div>
                  <span>{{ item.points }}</span>
                </div>
                <label>信息点数量<span>(个)</span></label>
              </el-col>
              <el-col :span="12" class="item3">
                <div>
                  <span>{{
                    item.pointsCoverage > 100 ? "10.9" : item.pointsCoverage
                  }}</span>
                </div>
                <label>信息点覆盖率<span>(%)</span></label>
              </el-col>

              <el-col :span="12" class="item3">
                <div>
                  <span>{{ item.ports }}</span>
                </div>
                <label>端口数<span>(个)</span></label>
              </el-col>
              <el-col :span="12" class="item3">
                <div>
                  <span>{{ item.portsRate >100 ?'54.4':'item.portsRate' }}</span>
                </div>
                <label>端口利用率<span>(%)</span></label>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
      </div>
    </vue-seamless-scroll>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      areaDetailList: []
    };
  },

  computed: {
    classOption() {
      return {
        step: .3, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
    ...mapGetters(["fullScreen", "mapModular", "mapLoadingComplete"]),
  },
  watch: {
    mapLoadingComplete(data) {
      let self = this;
      if (data) {
        self.getSynopsis()
      }
    }
  },

  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    // 获取区域简介
    getSynopsis() {
      let self = this;
      let id = '';
      // 查询网格ID
      let queryTaskUrl = this.configUrl.MapServer.moveService.shanxiGridUrl;
      let condition = "RESNAME = '城区老城分局'"
      this.mapUtil.queryUtil(this, queryTaskUrl, condition, (result) => {
        id = result.features[0].attributes.RESNO;
        let url = `${self.configUrl.api.selectGridOfficeList}/${id}`;
        self.postAxios(url, null).then(result => {
          self.areaDetailList = result.data;
          // console.log(self.areaDetailList)
        })
      })
    }
  },

  created() {

  },
};
</script>
<style lang="scss" scoped>
.mainBox {
  padding: 0.625rem /* 10/16 */;
  height: 100%;
  .seamless-warp {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .content {
    padding: 0 0.625rem /* 10/16 */;
    text-align: center;
    height: calc(100% - 2.25rem /* 36/16 */);
    >>> .el-carousel__indicator--vertical {
      padding: 0.25rem /* 4/16 */ 0;
    }
    >>> .el-carousel__indicator.is-active button {
      background-color: #2579f4;
    }
    >>> .el-card {
      border: none;
      background-color: transparent;
      color: #209af5;
      font-size: 0.625rem /* 10/16 */;
    }
    >>> .el-card__body {
      padding: 0.3125rem /* 5/16 */;
      height: 100%;
    }
    >>> .el-card.is-always-shadow,
    >>> .el-card.is-hover-shadow:focus,
    >>> .el-card.is-hover-shadow:hover {
      box-shadow: 0 0 1.25rem /* 20/16 */ 0 #209af5;
    }
    .leftBox {
      // height: 8.125rem /* 130/16 */;
      position: relative;
      transform: translateY(25%);
      .imgBox {
        background: #2579f4;
        border-radius: 50%;
        width: 2.5rem /* 40/16 */;
        height: 2.5rem /* 40/16 */;
        padding: 0.3125rem /* 5/16 */ 0 0.3125rem /* 5/16 */;
        margin: 0.3125rem /* 5/16 */;
        img {
          width: 75%;
          vertical-align: middle;
        }
      }
      p {
        color: #15d9f4;
        font-size: 0.875rem /* 14/16 */;
        font-weight: bold;
      }
    }
    .item {
      // margin: 0.9375rem /* 15/16 */ 0;
      margin: 0;
    }
    .item3 {
      margin-bottom: 0;
    }
    span {
      color: #209af5;
      display: inline-block;
      // font-size: 1.125rem /* 18/16 */;
      font-size: 1rem /* 16/16 */;
      //  font-weight: bolder;
    }
    label {
      font-size: 0.75rem /* 12/16 */;
      color: #caccd9;
      display: block;
      margin-bottom: 10px;
      span {
        font-size: 12px;
        color: #caccd9;
        display: inline-block;
        margin-left: 0.3125rem /* 5/16 */;
      }
    }
  }
  .border-btn {
    border-bottom: 1px solid #095894;
  }
  .mg-b10 {
    margin-bottom: 0.625rem /* 10/16 */;
  }
  .font13 {
    font-size: 0.8125rem !important /* 13/16 */;
  }
}
</style>