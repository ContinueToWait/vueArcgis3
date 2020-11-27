<template>
  <el-container class="bg-img">
    <!-- 导航条 -->
    <el-header width="200px" class="headBgImg">
      <el-row>
        <el-col :span="8" class="text-l bothSides">
          <span class="color-f font13">
            <span class="el-icon-location-information"></span
            >陕西移动安康分公司汉滨区{{ locationTitle }}</span
          >
        </el-col>
        <el-col :span="8" class="text-c">
          <div class="font20 title">网格场景作战地图</div>
        </el-col>
        <el-col :span="8" class="text-r bothSides">
          <span class="color-f font13">
            <span class="el-icon-alarm-clock"></span> {{ time }}
          </span>
        </el-col>
      </el-row>
    </el-header>

    <!-- 主体内容 -->
    <el-main class="mainBox">
      <el-row :gutter="10" class="height100">
        <!-- left -->
        <el-col v-if="!isfullScreen" :span="6" class="height100">
          <el-row class="height70">
            <el-col :span="24" class="height100  bg">
              <!-- 区域简介 -->
              <AreaDetail  class="border-f height100 " />
            </el-col>
          </el-row>
          <el-row class="height30 mg-t10">
            <el-col :span="24" class="height100  bg">
              <!-- 场景总累计占比 -->
              <AllScenesEcharts class="border-f height100" />
            </el-col>
          </el-row>
        </el-col>
        <!-- center -->
        <el-col :span="mapSpan" class="height100">
          <!-- 地图 -->
          <Map :center="center" class="border-f"></Map>
        </el-col>
        <!-- right -->
        <el-col v-if="!isfullScreen" :span="6" >
          <!-- 全量场景统计 -->
          <el-row >
            <el-col :span="24" class="bg">
              <AllScenesData class="border-f" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import Map from "@/components/Map.vue";
import AreaDetail from "@/components/areaDetail";
import TodayScenesData from "@/components/todayScenesData";
import AllScenesData from "@/components/allScenesData";
import TodayScenesEcharts from "@/components/todayScenesEcharts";
import AllScenesEcharts from "@/components/allScenesEcharts";
import { utils } from "@/utils/util.js";
import { mapGetters } from "vuex";
import * as configUrl from "@/assets/js/config.js";

export default {
  components: {
    Map,
    AreaDetail,
    TodayScenesData,
    AllScenesData,
    TodayScenesEcharts,
    AllScenesEcharts,
  },
  data() {
    return {
      center: "", // 搜索位置坐标
      time: "",
      isfullScreen: false, // 地图全屏模式
      mapSpan: 12,
      locationTitle: "老城分局",
      areaDetailParam:[], // 区域简介参数
    };
  },
  computed: {
    ...mapGetters(["fullScreen", "mapModular"]),
  },
  watch: {
    fullScreen(data) {
      this.isfullScreen = data;
      if (data) {
        this.mapSpan = 24;
      } else {
        this.mapSpan = 12;
      }
    },
  },
  methods: {
    // 跳转
    goNext() {
      this.$router.push("/list");
    },
    // 获取本地时间
    getTime() {
      let time = new Date();
      let str = time.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
      let timeStr = str.substring(0, 8); //  '10:55:2
      let year = time.getFullYear();
      let month =
        time.getMonth() + 1 > 9
          ? time.getMonth() + 1
          : `0${time.getMonth() + 1}`;
      let day = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`;
      this.time = year + "-" + month + "-" + day + " " + timeStr;
    },
    // 获取标题
    getTitle() {
      /*两项参数后续通过用户登录信息获取*/
      let resNo = "G0G1018";
      let userTag = "guow7_00440001800";
      let url = `/unicomgridmanager/gridmanager/selectGridNameByResNo/${resNo}/${userTag}`;
      let self = this;
      this.postAxios(url, {})
        .then((result) => {
          if (result && result.code == 200) {
            self.locationTitle = result.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
 
  },
  mounted() {
    let self = this;
    self.timerInterVal = setInterval(() => {
      self.getTime();
    }, 1000);
  },
  beforeDestory() {
    clearInterval(this.timerInterVal);
  },
  created() {
    this.getTitle();
  },
};
</script>

<style lang="scss" scoped>
.mainBox {
  padding: 0.625rem /* 10/16 */ 0 0 0;
  box-sizing: border-box;
  overflow: hidden;
  height: calc(100vh - 60px);
}
.headBgImg {
  background: url("../assets/images/headBgImg.png");
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: 100% 3.125rem /* 50/16 */ !important;
}
.title {
  text-align: center;
  line-height: 2.1875rem /* 35/16 */;
}

.bothSides {
  padding: 1.875rem /* 30/16 */ 0.625rem /* 10/16 */;
  box-sizing: border-box;
}
.cumulativeBox {
  height: 2.5rem /* 40/16 */;
  line-height: 2.5rem /* 40/16 */;
  // padding: 10px;
  font-size: 0.75rem /* 12/16 */;
  // box-shadow: 1px 1px 10px #000;
  .textColor {
    color: #ffeb77;
    font-weight: bold;
    font-size: 2.5rem /* 40/16 */;
    font-family: -webkit-pictograph;
    // background: url("../assets/images/num.png") no-repeat;
    // background-position: center;
  }
}

.bg-img {
  background: url("../assets/images/bg.png") no-repeat;
  background-position: center;
  background-size: 100% 100%;
}
.bg {
  /* background-color: #101638; */
  background: url("../assets/images/content.png") no-repeat;
  background-position: center;
  background-size: 100% 100%;
  box-shadow: 1px 1px 10px #000;
}
.el-icon-location-information,
.el-icon-alarm-clock {
  margin-right: 0.3125rem /* 5/16 */;
}
</style>
