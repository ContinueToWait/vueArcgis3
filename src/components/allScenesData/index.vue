<template>
  <div class="mainBox">
    <div class="title">
      <img src="@/assets/images/comm/jt.png" class="titImg" />全量场景统计(个)
    </div>
    <!-- <vue-seamless-scroll
      :data="list"
      class="seamless-warp"
      :class-option="classOption"
    > -->
    <el-row
      class="typeItem"
      v-for="(item, index) in sceneStatisticsList"
      :key="index"
    >
      <div v-if="item.children" class="">
        <el-col :span="4" class="text-c">
          <img
            @click="fourTable(item)"
            :src="require(`@/assets/images/${item.class}.png`)"
            width="30"
            height="30"
            alt=""
          />
        </el-col>
        <el-col :span="7">
          <span @click="fourTable(item)"> {{ item.name }}</span>
        </el-col>
        <el-col :span="9">
          <div class="font13">场景面数量：{{ item.count }}个</div>
        </el-col>
        <el-col :span="4">
          <span class="color-00A0E8 font13" @click="openClick(item)"
            >展开 <span class="el-icon-arrow-down"></span
          ></span>
        </el-col>
        <transition name="el-zoom-in-top">
          <el-col :span="24" class="rightBox" v-show="item.active">
            <div class="childrenBox">
              <div class="introduce">当前采集目标实体数量：</div>
              <el-row
                class="item"
                v-for="(child, ind) in item.children"
                :key="ind"
              >
                <div @click="listClick(child)">
                  <el-col :span="2"> &nbsp; </el-col>
                  <el-col :span="6">
                    <span>{{ child.name }}</span>
                  </el-col>
                  <el-col :span="16">
                    <el-progress
                      class="mt5"
                      :format="format"
                      :percentage="child.val"
                      :color="colors[ind]"
                    ></el-progress>
                  </el-col>
                </div>
              </el-row>
            </div>
          </el-col>
        </transition>
      </div>

      <!-- <el-col :span="8" class="leftBox">
        <el-card>
          <span>{{ item.type }}</span>
        </el-card>
      </el-col>
      <el-col :span="16" class="rightBox">
        <el-row class="item" v-for="(child, ind) in item.children" :key="ind">
          <div @click="listClick(child)">
            <el-col :span="8">
              <span>{{ child.name }}</span>
            </el-col>
            <el-col :span="16">
              <el-progress
                :format="format"
                :percentage="child.val"
                :color="colors[ind]"
              ></el-progress>
            </el-col>
          </div>
        </el-row>
      </el-col> -->
    </el-row>
    <!-- </vue-seamless-scroll> -->

    <!-- 细类小区 -->
    <el-drawer
      :title="title"
      :with-header="true"
      show-close
      :visible.sync="typeListVisible"
      direction="ltr"
      size="50vh"
      class="drowBox"
      :modal="false"
      :modal-append-to-body="false"
      :wrapperClosable="false"
    >
      <!-- <div > -->
      <el-table
        :data="typeList"
        style="width: 100%"
        height="calc(100% - 40px)"
        @current-change="cellListClick"
      >
        <el-table-column align="center" type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="gwmUsername" label="小区名称" width="120">
        </el-table-column>
        <el-table-column prop="gwmDistrict" label="所属分局"> </el-table-column>
        <el-table-column prop="gwmCity" label="城市"> </el-table-column>
        <el-table-column prop="gwmInfotype" label="所属分类"> </el-table-column>
        <el-table-column prop="gwmAddress" label="地址"> </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @current-change="turnPageChange"
        :page-size="10"
        layout="prev, pager, next"
        :total="total"
        background
        small
        :pager-count="5"
      >
      </el-pagination>
      <!-- </div> -->
    </el-drawer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      colors: ["#1de0ce", "#00A0E8", "#6f7ad3", "#1BC85D", "#FEC107", "#f74db4", "#ff0000",],
      list: [
        {
          type: "政府机关",
          img: "xuexiao",
          children: [
            {
              name: "委办局",
              val: 80,
              color: "#00A0E8",
            }
          ]
        },
        {
          type: "学校",
          img: "xuexiao",
          children: [
            {
              name: "幼儿园",
              val: 20,
              color: "#CE595F",
            },
            {
              name: "小学",
              val: 60,
              color: "#1BC85D",
            },
            {
              name: "中学",
              val: 40,
              color: "#00A0E8",
            },
            {
              name: "大学",
              val: 80,
              color: "#6f7ad3",
            },
            {
              name: "技校",
              val: 70,
              color: "#FEC107",
            },
            {
              name: "职高",
              val: 50,
              color: "#f74db4",
            },
            {
              name: "其它",
              val: 100,
              color: "#1de0ce",
            }
          ]
        },
        {
          type: "医疗",
          img: "xuexiao",
          children: [
            {
              name: "医院",
              val: 90,
              color: "#CE595F",
            },
            {
              name: "卫生院",
              val: 70,
              color: "#1BC85D",
            },
            {
              name: "卫生室",
              val: 60,
              color: "#00A0E8",
            },
            {
              name: "其它",
              val: 20,
              color: "#1de0ce",
            },

          ]
        },
        {
          type: "社区",
          img: "xuexiao",
          children: [
            {
              name: "社区",
              val: 80,
              color: "#00A0E8",
            }
          ]
        },
        {
          type: "住宿",
          img: "xuexiao",
          children: [
            {
              name: "旅馆",
              val: 20,
              color: "#CE595F",
            },
            {
              name: "招待所",
              val: 60,
              color: "#1BC85D",
            },
            {
              name: "宾馆",
              val: 40,
              color: "#00A0E8",
            },
            {
              name: "酒店",
              val: 80,
              color: "#6f7ad3",
            },
            {
              name: "其它",
              val: 100,
              color: "#1de0ce",
            }
          ]
        },
        {
          type: "市场",
          img: "xuexiao",
          children: [
            {
              name: "农贸市场",
              val: 20,
              color: "#CE595F",
            },
            {
              name: "花卉市场",
              val: 60,
              color: "#1BC85D",
            },
            {
              name: "虫鸟市场",
              val: 40,
              color: "#00A0E8",
            },
            {
              name: "建材市场",
              val: 80,
              color: "#6f7ad3",
            },
            {
              name: "古玩市场",
              val: 70,
              color: "#FEC107",
            }
          ]
        },
        {
          type: "商铺",
          img: "xuexiao",
          children: [
            {
              name: "理发店",
              val: 20,
              color: "#CE595F",
            },
            {
              name: "餐饮",
              val: 60,
              color: "#1BC85D",
            },
            {
              name: "零售",
              val: 40,
              color: "#00A0E8",
            },
            {
              name: "药店",
              val: 80,
              color: "#6f7ad3",
            },
            {
              name: "辅导机构",
              val: 70,
              color: "#FEC107",
            },
            {
              name: "中介机构",
              val: 50,
              color: "#f74db4",
            },
            {
              name: "其它",
              val: 100,
              color: "#1de0ce",
            }
          ]
        },
        {
          type: "商业综合体",
          img: "xuexiao",
          children: [
            {
              name: "赛格国际",
              val: 80,
              color: "#CE595F",
            },
            {
              name: "万达广场",
              val: 100,
              color: "#1BC85D",
            },
            {
              name: "世纪金花",
              val: 70,
              color: "#00A0E8",
            }
          ]
        },
        {
          type: "企业",
          img: "xuexiao",
          children: [
            {
              name: "房地产",
              val: 80,
              color: "#CE595F",
            },
            {
              name: "银行",
              val: 100,
              color: "#1BC85D",
            },
            {
              name: "保险",
              val: 70,
              color: "#00A0E8",
            },
            {
              name: "商贸公司",
              val: 80,
              color: "#6f7ad3",
            },
            {
              name: "律师事务所",
              val: 70,
              color: "#FEC107",
            },
            {
              name: "其它",
              val: 100,
              color: "#1de0ce",
            }
          ]
        },
        {
          type: "园区",
          img: "xuexiao",
          children: [
            {
              name: "工业园区",
              val: 80,
              color: "#CE595F",
            },
            {
              name: "科技园区",
              val: 100,
              color: "#1BC85D",
            },
            {
              name: "综合性园区",
              val: 70,
              color: "#00A0E8",
            },
            {
              name: "其它",
              val: 100,
              color: "#1de0ce",
            }
          ]
        },
        {
          type: "交通枢纽",
          img: "xuexiao",
          children: [
            {
              name: "机场",
              val: 80,
              color: "#CE595F",
            },
            {
              name: "汽车站",
              val: 100,
              color: "#1BC85D",
            },
            {
              name: "火车站",
              val: 70,
              color: "#00A0E8",
            }
          ]
        },
        {
          type: "交通服务",
          img: "xuexiao",
          children: [
            {
              name: "加油站",
              val: 80,
              color: "#CE595F",
            },
            {
              name: "加气站",
              val: 100,
              color: "#1BC85D",
            },
            {
              name: "高速公路服务区",
              val: 70,
              color: "#00A0E8",
            },
            {
              name: "充电站",
              val: 80,
              color: "#6f7ad3",
            },
            {
              name: "其它",
              val: 100,
              color: "#1de0ce",
            }
          ]
        },
        {
          type: "商务楼宇",
          img: "xuexiao",
          children: [
            {
              name: "商务楼宇",
              val: 80,
              color: "#00A0E8",
            }
          ]
        },
        {
          type: "居民小区",
          img: "xuexiao",
          children: [
            {
              name: "居民小区",
              val: 80,
              color: "#00A0E8",
            }
          ]
        },
        {
          type: "民宅",
          img: "xuexiao",
          children: [
            {
              name: "私人自建",
              val: 80,
              color: "#6f7ad3",
            },
            {
              name: "城中村",
              val: 70,
              color: "#FEC107",
            },
            {
              name: "农村",
              val: 50,
              color: "#f74db4",
            },
          ]
        },
        {
          type: "文化旅游",
          img: "xuexiao",
          children: [
            {
              name: "公园",
              val: 80,
              color: "#CE595F",
            },
            {
              name: "宗教场所",
              val: 100,
              color: "#1BC85D",
            },
            {
              name: "广场",
              val: 70,
              color: "#00A0E8",
            },
            {
              name: "景区",
              val: 80,
              color: "#6f7ad3",
            },
            {
              name: "剧院",
              val: 70,
              color: "#FEC107",
            },
            {
              name: "博物馆",
              val: 50,
              color: "#f74db4",
            },
            {
              name: "动物园",
              val: 100,
              color: "#1de0ce",
            },
            {
              name: "游乐场",
              val: 70,
              color: "#CE595F",
            },
            {
              name: "图书馆",
              val: 50,
              color: "#1BC85D",
            },
          ]
        },
        {
          type: "村委会",
          img: "xuexiao",
          children: [
            {
              name: "村委会",
              val: 80,
              color: "#00A0E8",
            }
          ]
        },
      ],
      sceneStatisticsList: [], // 统计列表
      typeListVisible: false, // 分类列表弹框
      typeList: [], // 分类列表
      total: 0, // 分页
      getTypeParam: {}, // 翻页所需参数
      /**
      * @majorDategoriesArr
      * @id 是根据GIS服务对应的id添加的，用来控制动态图层内显示的图层；
      * @active 是否选中
      * @tableName  表名称
      */
      majorDategoriesArr: [
        {
          name: "居民小区",
          class: "residentialArea",
          active: false,
          id: 12,
          tableName: "hxtt_jumingxiaoqu",
          aliasTableName: "JM",
        },
        {
          name: "商务楼宇",
          class: "commercialBuildings",
          active: false,
          id: 8,
          tableName: "hxtt_shangwulouyu",
          aliasTableName: "SW",
        },

        {
          name: "企业",
          class: "enterprise",
          active: false,
          id: 10,
          tableName: "hxtt_qiye",
        },

        {
          name: "民宅",
          class: "privateHome",
          active: false,
          id: 11,
          tableName: "hxtt_mingzhai",
        },
        {
          name: "商铺",
          class: "shops",
          active: false,
          id: 9,
          tableName: "hxtt_shangpu",
          aliasTableName: "SP",
        },
        {
          name: "学校",
          class: "school",
          id: 3,
          active: false,
          tableName: "hxtt_xuexiao",
        },
        {
          name: "政府机关",
          class: "governmentOrgans",
          id: 1,
          active: false,
          tableName: "hxtt_zhengfujiguan",
          aliasTableName: "ZF",
        },
        {
          name: "医疗",
          class: "medicalCare",
          active: false,
          id: 2,
          tableName: "hxtt_yiliao",
          aliasTableName: "YL",
        },
        {
          name: "社区",
          class: "community",
          active: false,
          id: 6,
          tableName: "hxtt_shequ",
        },
        {
          name: "住宿",
          class: "stay",
          active: false,
          id: 0,
          tableName: "hxtt_zhusu",
        },
        {
          name: "市场",
          class: "market",
          active: false,
          id: 5,
          tableName: "hxtt_shichang",
        },
        {
          name: "商业综合体",
          class: "commercialComplex",
          active: false,
          id: 7,
          tableName: "hxtt_shangyezongheti",
        },
        {
          name: "园区",
          class: "park",
          active: false,
          id: 16,
          tableName: "hxtt_yuanqu",
        },
        {
          name: "交通枢纽",
          class: "transportationHub",
          active: false,
          id: 15,
          tableName: "hxtt_jiaotongshuniu",
        },
        {
          name: "交通服务",
          class: "transportServices",
          active: false,
          id: 13,
          tableName: "hxtt_jiaotongfuwu",
        },
        {
          name: "文化旅游",
          class: "culturalTourism",
          active: false,
          id: 4,
          tableName: "hxtt_wenhualvyou",
        },
        {
          name: "村委会",
          class: "villageCommittee",
          active: false,
          id: 14,
          tableName: "hxtt_cunweihui",
        },
      ],
      sceneAllNum: 0, // 累计场景录入数
      gridId: null, //网格ID
      // selectFourTableList: [], // 一图四表获取的list
      selectFourTableListVisible: false, // 一图四表 弹框
      // getSelectSceneDetailsPageListByResNoParam: {}, //根据微格编号和场景编号查询所属小区列表所需参数
      cellListVisible: false,
      cellList: [], // 小区列表
      cellListTotal: 0,
      title: '', //细类小区
    };
  },
  computed: {
    ...mapGetters(["mapModular", "sceneInformationParamVux"]),
  },
  computed: {
    classOption() {
      return {
        step: .5, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
    ...mapGetters(['mapModular']),
  },

  mounted() {

  },
  methods: {
    // 进度条文字内容
    format(percentage) {
      return `${percentage}个`
    },
    // 获取列表数据
    getList() {
      let self = this;
      let url = this.configUrl.api.selectSceneTypeAndCount;
      let param = {};
      this.getAxios(url, param).then(result => {
        if (result.code === 200) {
          let list = result.data;
          self.sceneStatisticsList = [];
          list.map(item => {
            self.majorDategoriesArr.map(val => {
              if (item.type === val.name) {
                val.children = item.children
                self.sceneStatisticsList.push(val)
              }
            })
          })
          // console.log(self.sceneStatisticsList)
        } else {
          this.$message.error('暂无数据');
        }
      })
    },
    // 分类点击 根据场景小类分页查询列表
    listClick(item) {
      let param = {
        sceneSubClass: item.name,
        sceneType: item.name,
        pageStart: 1,
        pageSize: 10
      }
      this.getTypeParam = item;
      this.getTypeList(param)
      this.title = item.name;
    },
    // 根据场景小类分页查询列表
    getTypeList(param) {
      let self = this;
      let url = this.configUrl.api.selectPageListBySceneSubClass;
      this.postAxios(url, param).then(result => {
        // console.log(result)
        self.typeListVisible = true
        self.typeList = result.data.list;
        self.total = result.data.total

      })
    },
    // 翻页
    turnPageChange(val) {
      if (!this.selectFourTableListVisible) {
        let param = {
          sceneSubClass: this.getTypeParam.name,
          sceneType: this.getTypeParam.name,
          pageStart: val,
          pageSize: 10
        }
        this.getTypeList(param)
      } else {
        let param = {
          resNo: this.getSelectSceneDetailsPageListByResNoParam.resNo,
          sceneType: this.getSelectSceneDetailsPageListByResNoParam.sceneType,
          pageStart: val,
          pageSize: 10
        }
        this.getSelectSceneDetailsPageListByResNo(param)
      }

    },
    // 获取17大类面详情信息
    selectCount() {
      let url = this.configUrl.api.selectCount;
      let param = {};
      let self = this;
      this.postAxios(url, param)
        .then((result) => {
          let sceneNumList = result.data.count;
          let countAll = 0;
          self.majorDategoriesArr.map((item) => {
            sceneNumList.map((val) => {
              if (item.name == val.type) {
                item.count = val.count;
              }
            });
          });
          sceneNumList.map((val) => {
            countAll += val.count;
          });
          self.sceneAllNum = countAll;

          self.getList();

        })
    },
    // 展开
    openClick(item) {
      item.active = !item.active;

      // 是否关闭其他展开框
      // this.sceneStatisticsList.map(data => {
      //   if (data.name === item.name) {
      //     item.active = true;
      //   } else {
      //     data.active = false;
      //   }
      // })
    },
    // 列表点击
    fourTable(item) {
      // 获取网格ID
      let self = this;
      let queryTaskUrl = this.configUrl.MapServer.moveService.shanxiGridUrl;
      let condition = "RESNAME = '城区老城分局'"
      this.mapUtil.queryUtil(this, queryTaskUrl, condition, (request) => {
        self.gridId = request.features[0].attributes.RESNO;
        // self.getSelectFourTable(item)
        let param = {
          resNo: self.gridId,
          gwmUserName: item.name
        }
        this.$router.push({
          name: 'list',
          params: param
        })
      })

    },
    // 小区列表点击
    cellListClick(item) {
      let self = this;
      let id = '';

      // 查询的图层地址
      this.configUrl.defaultParam.majorDategoriesArr.map(val => {
        if (val.name === item.gwmInfotype) {
          id = val.id
        }
      })
      let queryTaskUrl = `${self.configUrl.MapServer.type}/${id}`;
      // 条件
      let condition = `GWM_FID = ${item.gwmFid}`;
      this.mapUtil.queryUtil(this, queryTaskUrl, condition, (picGraphic) => {
        // 地图服务返回的信息
        setTimeout(() => {
          self.$store.commit("sceneInformationParamVux", picGraphic);
        }, 500)
      })
    }
    // 获取4表
    // getSelectFourTable(item) {
    //   let self = this;
    //   let param = {
    //     resNo: this.gridId,
    //     gwmUserName: item.name
    //   }
    //   let url = this.configUrl.api.selectFourTable;
    //   this.postAxios(url, param).then(result => {
    //     self.selectFourTableList = result.data;
    //     self.selectFourTableListVisible = true;
    //   })
    // },
    // 根据微格编号和场景编号查询所属小区列表
    // getSelectSceneDetailsPageListByResNo(param) {
    //   let self = this;
    //   let url = this.configUrl.api.selectSceneDetailsPageListByResNo;
    //   this.postAxios(url, param).then(result => {
    //     self.cellListVisible = true
    //     self.cellList = result.data.list;
    //     self.cellListTotal = result.data.total
    //   })
    // },
    // 列表点击
    // selectFourTableListClick(item) {
    //   let param = {
    //     resNo: item.resNo,
    //     sceneType: item.sceneType,
    //     pageStart: 1,
    //     pageSize: 10
    //   }
    //   this.getSelectSceneDetailsPageListByResNoParam = item;
    //   this.selectFourTableListVisible = false;
    //   this.getSelectSceneDetailsPageListByResNo(param)
    // }
  },

  created() {
    this.selectCount()
  },
};
</script>
<style  lang="scss" scoped>
.mainBox {
  overflow-y: auto;
  padding-bottom: 0.625rem /* 10/16 */;
  :focus {
    outline: none;
  }
  .pd10 {
    padding: 10px;
    box-sizing: border-box;
  }
  .seamless-warp {
    width: 100%;
    height: calc(100% - 3.125rem /* 50/16 */);
    overflow: hidden;
  }
  .typeItem {
    margin-bottom: 0.625rem /* 10/16 */;
    cursor: pointer;
    line-height: 1.875rem /* 30/16 */;
  }
  .leftBox {
    text-align: center;
    padding: 0.3125rem /* 5/16 */ 0.625rem /* 10/16 */;
    font-size: 0.875rem; /* 14/16 */
  }
  .rightBox {
    width: 100%;
    text-align: left;
    padding: 0.3125rem /* 5/16 */;
    .item {
      padding-bottom: 0.3125rem /* 5/16 */;
      font-size: 0.8125rem /* 13/16 */;
    }
    .item :hover {
      color: #00a0e8;
    }
  }
  >>> .el-drawer__header {
    padding: 0.625rem /* 10/16 */;
    color: #fff;
    margin-bottom: 0;
  }
  .el-card {
    border: none;
    background: transparent;
    color: #caccd9;
    >>> .el-card__body {
      padding: 0;
    }
  }
  >>> .el-progress__text {
    color: #caccd9;
  }
  >>> .el-dialog__body {
    padding: 10px;
  }

  .pagination {
    padding: 0.625rem /* 10/16 */ 0 0 0;
    text-align: center;
  }
  .color-00A0E8 {
    color: #00a0e8;
  }
  .mt5 {
    margin-top: 0.3125rem /* 5/16 */;
  }
  .introduce {
    padding: 0.625rem /* 10/16 */;
    font-size: 13px;
    line-height: 0.9375rem /* 15/16 */;
  }
  .childrenBox {
    border: 1px solid #00a0e8;
  }
  >>> .el-drawer {
    background-color: #101638;
  }

  .drowBox {
    top: 66px;
    height: calc(100% - 70px);
    width: 30%;
    >>> .el-table {
      position: inherit;
    }
    >>> .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      background-color: #101638;
    }
    >>> .el-table,
    >>> .el-table__expanded-cell {
      background: transparent;
    }
    >>> .el-table,
    >>> .el-table thead {
      color: #caccd9;
    }
    >>> .el-table th {
      color: #209af5;
      background: #101638;
      // background: none;
      // background: transparent;
    }
    >>> .el-table tr {
      background: #101638;
      // background: none !important;
      // background: transparent;
    }
    >>> .el-table td,
    >>> .el-table th.is-leaf {
      border-bottom: 1px solid #205488;
    }
    >>> .el-table td,
    >>> .el-table th {
      padding: 0.3125rem /* 5/16 */ 0;
    }
    >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #29509a;
      // color: #fff;
    }
    >>> .el-table td .cell span {
      display: block;
      width: 1.25rem /* 20/16 */;
      height: 1.25rem /* 20/16 */;
      text-align: center;
      border-radius: 0.25rem /* 4/16 */;
      // color: #fff;
      font-size: 0.8125rem /* 13/16 */;
      line-height: 1.25rem /* 20/16 */;
    }

    >>> .el-table__body-wrapper::-webkit-scrollbar {
      /*width: 0;宽度为0隐藏*/
      width: 2px;
      height: 5px;
    }
    >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
      border-radius: 2px;
      height: 10px;
      background: #209af5;
    }
    >>> .el-table__body-wrapper::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 2px;
      background: rgba(0, 0, 0, 0.4);
    }
    >>> .el-table__body tr.current-row > td {
      background-color: #205488;
    }
    >>> .hover-row {
      color: #205488;
    }
    >>> .el-table--border td,
    .el-table--border th,
    .el-table__body-wrapper
      .el-table--border.is-scrolling-left
      ~ .el-table__fixed {
      // border: 1px solid #00a0e8;
    }
    >>> .el-table th.is-leaf {
      //  border: 1px solid #00a0e8;
    }
    >>> .el-table--border,
    .el-table--group {
      //  border: 1px solid #00a0e8;
    }
  }
}
</style>