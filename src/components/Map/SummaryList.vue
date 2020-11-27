<template>
  <div class="SummaryList">
    <!-- 目标市场 -->
    <div v-if="param.isTypeActive === '1'">
      <el-tabs type="border-card" @tab-click="tabsClick" v-model="activeName">
        <!-- 数据完整录入 -->
        <el-tab-pane
          name="数据完整录入"
          :label="`数据完整录入${
            param.legendList[0].num !== null ? param.legendList[0].num : 0
          }`"
        >
          <el-table
            height="calc(100vh - 236px)"
            :data="enteredList"
            style="width: 100%"
          >
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="50"
              fixed="left"
            >
            </el-table-column>
            <el-table-column prop="name" label="区域名称" width="200">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
            <el-table-column align="center" prop="id" label="区域ID">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="70">
              <template slot-scope="scope">
                <span
                  title="详情"
                  @click="detailClick(scope.row)"
                  class="el-icon-document icon"
                ></span>
                <span
                  title="定位"
                  @click="localClick(scope.row)"
                  class="el-icon-location icon"
                ></span>
                <!-- <el-button icon="el-icon-location" type="text" circle></el-button> -->
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="pagination"
            @current-change="turnPageChange"
            :page-size="10"
            layout="prev, pager, next"
            :total="enteredListTotal"
            small
            background
            v-if="enteredListTotal > 0"
            :pager-count="5"
          >
          </el-pagination>
        </el-tab-pane>

        <!-- 数据部分录入 -->
        <el-tab-pane
          name="数据部分录入"
          :label="`数据部分录入${
            param.legendList[1].num !== null ? param.legendList[1].num : 0
          }`"
        >
          <el-table
            height="calc(100vh - 236px)"
            :data="partialEntryList"
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column fixed="left" align="center" type="index" label="序号">
            </el-table-column>
            <el-table-column prop="name" label="区域名称" width="150">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
            <el-table-column align="center" prop="id" label="区域ID">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="70">
              <template slot-scope="scope">
                <span
                  title="详情"
                  @click="detailClick(scope.row)"
                  class="el-icon-document icon"
                ></span>
                <span
                  title="定位"
                  @click="localClick(scope.row)"
                  class="el-icon-location icon"
                ></span>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="pagination"
            @current-change="partialEntryChange"
            :page-size="10"
            layout="prev, pager, next"
            :total="partialEntryListTotal"
            :pager-count="5"
            small
            background
          >
          </el-pagination>
        </el-tab-pane>

        <!-- 数据未录入 -->
        <el-tab-pane
          name="数据未录入"
          :label="`数据未录入${
            param.legendList[2].num !== null ? param.legendList[2].num : 0
          }`"
        >
          <el-table
            height="calc(100vh - 236px)"
            :data="notEnteredList"
          
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="50"
            >
            </el-table-column>
            <el-table-column prop="name" label="区域名称" width="150">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
            <el-table-column prop="id" label="区域ID"> </el-table-column>
            <el-table-column  fixed="right" label="操作" >
              <template slot-scope="scope">
                <!-- <span
                  title="详情"
                  @click="detailClick(scope.row)"
                  class="el-icon-document icon"
                ></span> -->
                <span
                  title="定位"
                  @click="localClick(scope.row)"
                  class="el-icon-location icon"
                ></span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            @current-change="noTurnPageChange"
            :page-size="10"
            layout="prev, pager, next"
            :total="notEnteredListTotal"
            small
            background
            :pager-count="5"
          >
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 营销预警 -->
    <div v-if="param.isTypeActive === '2'" >
      <el-table
      :data="marketingWarningList"
        height="calc(100vh - 215px)"
        size="mini"
        style="width:100%"
      >
        <el-table-column
          align="center"
          type="index"
          fixed="left"
          label="序号"
          width="50"
        >
        </el-table-column>
        <el-table-column prop="userName" label="客户名称"> </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          width="110"
          label="联系方式"
        >
          <template slot-scope="scope">
                {{scope.row.phone?scope.row.phone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3"):""}}
          </template>
        </el-table-column>
        <el-table-column prop="spType" label="网络类型"> </el-table-column>
        <el-table-column prop="expDate" label="时间" width="100">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="70">
          <template slot-scope="scope">
            <span
              title="详情"
              @click="detailClick(scope.row)"
              class="el-icon-document icon"
            ></span>
            <span
              title="定位"
              @click="localClick(scope.row)"
              class="el-icon-location icon"
            ></span>
            <!-- <el-button icon="el-icon-location" type="text" circle></el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @current-change="turnPageChange"
        :page-size="10"
        layout="prev, pager, next"
        :total="marketingWarningTotal"
        small
        background
        :pager-count="5"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script> 
import * as configUrl from "@/assets/js/config.js";
import { mapGetters } from "vuex";
import { queryUtil } from '@/utils/mapUtil.js'
export default {
  name: "SummaryList", // 区域汇总清单
  data() {
    return {
      /**
          *  “目标市场视图”下 数据完整录入、数据未录入、数据部分录入列表及分页
          */
      enteredList: [],
      enteredListTotal: 0,
      notEnteredList: [],
      notEnteredListTotal: 0,
      partialEntryList: [],
      partialEntryListTotal: 0,
      //   标签页
      activeName: '数据部分录入',
      // 营销预警
      marketingWarningTotal: 0,
      marketingWarningList: [],
    }
  },
  computed: {
    ...mapGetters(['mapModular']),
  },
  props: {
    param: {
      type: Object
    },
    childrenCallBack: {
      type: Function
    }
  },
  watch: {
    param() {
      if (this.param.isTypeActive === '1') {
        this.getLegendList(2, 1)
      } else if (this.param.isTypeActive === '2') {
        this.getMarketingWarningList(1)
      }
    }
  },
  methods: {
    /**
     *  目标市场视图 ==>   获取录入列表
     *  @param {Number} status  类型 0 数据完整录入 1 数据未录入 2 数据部分录入
     *  @param {Number} pageStart  第几页
     */
    getLegendList(status, pageStart) {
      let self = this;
      
      let url = configUrl.api.selectSceneDetailsPageList;
      let tableName = '';
      // 获取选择的分类（17大类）
      self.param.majorDategoriesArr.map(item => {
        if (item.active) {
          tableName = item.tableName
        }
      })
      /**
       * @tableName  表名
       * @status  0 数据完整录入 1 数据未录入 2 数据部分录入
       * @pageStart   翻页 
       * @pageSize 每页多少条
       */
      let param = {
        tableName: tableName,
        status: status,
        pageStart: pageStart, //第几页 默认从1开始
        pageSize: 10
      };
      this.postAxios(url, param).then(result => {
        // console.log(result)
        if (result.code === 200) {
          let list = result.data.list;
          let total = result.data.total;
          switch (status) {
            case 0:
              self.enteredList = list;
              self.enteredListTotal = total;
              break;
            case 1:
              
              self.notEnteredList = list;
              self.notEnteredListTotal = total;
              break;
            case 2:
              self.partialEntryList = list;
              self.partialEntryListTotal = total;
              break;
          }

        }
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 营销预警 ==>   获取录入列表
     * @param {Number} pageStart  第几页
     */
    getMarketingWarningList(pageStart) {
      let self = this;
      let url = configUrl.api.summarizeMarketWarning;
      let tableName = '';
      // 获取选择的分类（17大类）
      self.param.majorDategoriesArr.map(item => {
        if (item.active) {
          // tableName = item.tableName
          tableName = item.aliasTableName
        }
      })
      /**
       * @tableName  表名
       * @page   翻页 
       * @pageSize 每页多少条
       */
      let param = {
        sceneType: tableName,
        page: pageStart, //第几页 默认从1开始
        pageSize: 10
      };
      this.getAxios(url, param).then(result => {
        // console.log(result)
        if (result.code === 200) {
          let list = result.data.list;
          let total = result.data.total;
          // self.marketingWarningList = list;
          list.map(item => {
            item.date = item.expDate.split(' ')[0]
          })
          self.marketingWarningList = [...list];

          self.marketingWarningTotal = total;

        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 翻页
    turnPageChange(val) {
      this.getLegendList(0, val)
    },
    noTurnPageChange(val) {
      this.getLegendList(1, val)
    },
    partialEntryChange(val) {
      this.getLegendList(2, val)
    },
    // 标签页点击
    tabsClick(tab) {
      let self = this;
      self.activeName = tab.name;
      let status = 0;
      switch (tab.name) {
        case '数据完整录入':
          status = 0;
          break;
        case '数据未录入':
          status = 1;
          break;
        case '数据部分录入':
          status = 2;
          break;
      }
      self.getLegendList(status, 1);
    },
    // 详情
    detailClick(data) {
      let self = this;
      let param;
      this.queryServe(data, (queryResult) => {
        // 选中面
        let graphicsLayerId1 = "dynamicLayersGraphicsLayerId";
        self.mapUtil.selectLayers(self, queryResult, graphicsLayerId1);
        // 缩放到面范围
        self.mapUtil.zoomMap(self, queryResult)

        if (self.param.isTypeActive === "1") {
          // 目标市场
          param = {
            features: queryResult.features[0].attributes,
            name: "detail",
            type: "target"
          }
        } else if (self.param.isTypeActive === "2") {
          // 营销预警
          param = {
            features: queryResult.features[0].attributes,
            name: "detail",
            type: "marketing"
          }

        }
        self.childrenCallBack('SummaryList', param);
      })
    },
    // 定位
    localClick(data) {
      let self = this;
      /**
       * 根据Id查询图层信息，并返回数据
       */
      this.queryServe(data, callBack);

      function callBack(queryResult) {
        // 选中面
        let graphicsLayerId1 = "dynamicLayersGraphicsLayerId";
        self.mapUtil.selectLayers(self, queryResult, graphicsLayerId1)

        // 添加坐标点
        let graphicsLayerId = "localIconLayer";
        let icon = require('@/assets/images/userLocal.png');
        self.mapUtil.PointUtil(self, queryResult.features[0], icon, graphicsLayerId);


        // 闪烁点
        let item = 0;
        let show = false;
        clearInterval(setIntervalFn);
        let setIntervalFn = setInterval(() => {
          if (item < 17) {
            show = !show
            try {
              self.mapModular.Map.getLayer(graphicsLayerId).setVisibility(show)
            } catch (err) {
              clearInterval(setIntervalFn);
              item = 0;
            }
            item++;
          } else {
            item = 0;
            clearInterval(setIntervalFn)
            self.mapModular.Map.removeLayer(self.mapModular.Map.getLayer(graphicsLayerId))
          }
        }, 500);


        // 调用父组件事件
        let param = {
          name: "local"
        }
        self.childrenCallBack('SummaryList', param);
      }

    },
    // 根据ID查询地图服务
    queryServe(data, callBack) {
      let self = this;
      let id = '';
      let where = `GWM_FID ='${data.id}'`;
      //   获取图层id
      self.param.majorDategoriesArr.map(item => {
        if (item.active) {
          id = item.id
        }
      })
      let queryTaskUrl = `${configUrl.MapServer.type}/${id}`;
      this.mapUtil.queryUtil(this, queryTaskUrl, where, callBack)

    }
  },
  created() {
    if (this.param.isTypeActive === '1') {
      this.getLegendList(2, 1)
    } else if (this.param.isTypeActive === '2') {
      this.getMarketingWarningList(1)
    }

  }
}
</script>

<style scoped lang="scss">
.padding-10-0 {
  padding: 0.625rem /* 10/16 */ 0;
}
.icon {
  font-size: 18px;
  color: #061386;
  cursor: pointer;
}
.SummaryList {
  height: 100%;
  width: 100%;
 >>>.el-tabs--border-card>.el-tabs__content{
   padding: 0
 }
 >>>.el-table__fixed-right{
   right:0 !important;
   height: 100% !important;
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
  // >>> .el-tabs__content {
  //   padding: 0 5px;
  // }
  .pagination {
    padding: 0.625rem /* 10/16 */ 0;
    text-align: center;
  }
}
</style>>