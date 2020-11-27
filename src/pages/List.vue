<template>
  <div class="drowBox">
    <!-- 面包屑导航 -->
    <div class="breadcrumbBox">
      <span v-for="(item, index) in breadcrumbList" :key="index">
        <span @click="breadcrumbFn(item)">
          <span v-if="index != 0">&nbsp; > &nbsp;</span>
          <span :class="index < breadcrumbList.length - 1 ? 'text' : ''">
            {{ item.name }}</span
          >
        </span>
      </span>
    </div>
    <!-- 一图四表 -->
    <transition name="el-zoom-in-left">
      <div v-show="selectFourTableListVisible">
        <el-table
          :data="selectFourTableList"
          style="width: 100%"
          height="68vh"
          highlight-current-row
          @current-change="selectFourTableListClick"
        >
          <el-table-column align="center" type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="gridName" label="所属分局" width="110">
          </el-table-column>
          <el-table-column align="center" label="网格经理">
            <template slot-scope="scope">
              {{ scope.row.gmanagerName ? scope.row.gmanagerName : "-" }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="resName" label="所属微格">
          </el-table-column>
          <el-table-column align="center" label="微格经理" width="120">
            <template slot-scope="scope">
              {{ scope.row.wgManagerName ? scope.row.wgManagerName : "-" }}
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="points"
            :label="`已覆盖小区数量(${pointsAll})`"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="pointsNo"
            :label="`未覆盖小区数量(${pointsNoAll})`"
          >
          </el-table-column>

          <el-table-column align="center" label="信息点数">
            <template slot-scope="scope">
              {{ scope.row.gwmInfoNum ? scope.row.gwmInfoNum : "0" }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客户数量">
            <template slot-scope="scope">
              {{ scope.row.gwmAccessNum ? scope.row.gwmAccessNum : "0" }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="mobleAccessShi"
            label="移动小区覆盖数"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="unicomAccess"
            label="联通小区覆盖数"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="telecomAccess"
            label="电信小区覆盖数"
          >
          </el-table-column>

          <el-table-column align="center" prop="gwmPortCount" label="端口数">
          </el-table-column>
          <el-table-column align="center" prop="gwmPortUsed" label="占用端口数">
          </el-table-column>
          <el-table-column align="center" prop="gwmPortFree" label="闲置端口数">
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          @current-change="turnPageChange"
          :page-size="10"
          layout="prev, pager, next"
          :total="total"
          background
          v-if="total > 11"
          :pager-count="5"
        >
        </el-pagination>
      </div>
    </transition>
    <!-- 列表 -->
    <transition name="el-zoom-in-right">
      <div v-show="cellListVisible">
        <el-table
          :data="cellList"
          style="width: 100%"
          @current-change="cellListClick"
        >
          <el-table-column align="center" type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="gwmUsername" label="小区名称">
          </el-table-column>
          <el-table-column prop="gwmDistrict" label="所属分局">
          </el-table-column>
          <el-table-column align="center" prop="gwmPortcount" label="端口数">
          </el-table-column>
          <el-table-column align="center" prop="gwmPortfree" label="空闲端口数">
          </el-table-column>
          <el-table-column align="center" prop="gwmPortused" label="占用端口数">
          </el-table-column>

          <el-table-column
            align="center"
            prop="gwmMobleAccess"
            label="移动接入"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="gwmTelecomAccess"
            label="电信接入"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="gwmUnicomAccess"
            label="联通接入"
          >
          </el-table-column>

          <el-table-column prop="gwmCity" label="城市"> </el-table-column>
          <el-table-column prop="gwmInfotype" label="所属分类">
          </el-table-column>
          <el-table-column prop="gwmAddress" label="地址"> </el-table-column>
          <!-- <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column> -->
        </el-table>

        <el-pagination
          class="pagination"
          @current-change="turnPageChange"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="cellListTotal"
          background
          v-if="cellListTotal > 11"
          :pager-count="5"
        >
        </el-pagination>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "list",
  data() {
    return {
      breadcrumbList: [
        { name: '首页' },
        { name: '列表' }
      ], // 面包屑列表
      getTypeParam: {}, // 翻页所需参数
      selectFourTableListVisible: true,
      selectFourTableList: [], // 一图四表获取的list
      selectFourTableParam: {}, //一图四表翻页所需参数
      total: 0, //一图四表翻页
      pointsAll: 0, // 已覆盖小区总数
      pointsNoAll: 0, // 未覆盖小区总数
      cellListVisible: false,
      cellList: [], // 小区列表
      cellListTotal: 0,
      getSelectSceneDetailsPageListByResNoParam: {}, //根据微格编号和场景编号查询所属小区列表所需参数

    }
  },
  computed: {
    /**
     * fullScreen   是否全屏
     * comExpression  选中的微格过滤条件
     */
    ...mapGetters(["mapModular", "sceneInformationParamVux"]),
  },
  methods: {
    // 面包屑导航
    breadcrumbFn(item) {
      if (item.name === "首页") {
        this.$router.back()
      } else if (item.name === "列表") {
        this.cellListVisible = false;
        this.selectFourTableListVisible = true;
        this.breadcrumbList.splice(2, 1)
        this.cellListTotal = 0;
      }
    },
    // 获取4表
    getSelectFourTable(param) {
      let self = this;
      self.pointsAll = 0;
      self.pointsNoAll = 0;
      let url = this.configUrl.api.selectFourTable;
      this.postAxios(url, param).then(result => {
        self.selectFourTableList = result.data.list;
        self.selectFourTableListVisible = true;
        self.total = result.data.total;
        // 统计已覆盖小区总数、未覆盖小区总数
        self.selectFourTableList.map(item => {
          self.pointsAll += item.points;
          self.pointsNoAll += item.pointsNo
        })
        // console.log(result)
      })
    },
    // 根据微格编号和场景编号查询所属小区列表
    getSelectSceneDetailsPageListByResNo(param) {
      let self = this;
      let url = this.configUrl.api.selectSceneDetailsPageListByResNo;
      this.postAxios(url, param).then(result => {
        self.cellListVisible = true
        self.cellList = result.data.list;
        // console.log(self.cellList)
        self.cellListTotal = result.data.total
      })
    },
    // 一图四表列表点击
    selectFourTableListClick(item) {
      let param = {
        resNo: item.resNo,
        sceneType: item.sceneType,
        pageStart: 1,
        pageSize: 10
      }
      this.getSelectSceneDetailsPageListByResNoParam = item;
      this.selectFourTableListVisible = false;
      let params = {
        name: item.resName
      }
      this.breadcrumbList.push(params);
      this.getSelectSceneDetailsPageListByResNo(param)
    },
    // 翻页
    turnPageChange(val) {
      let param
      // 一图四表翻页
      if (this.selectFourTableListVisible) {
        param = {
          resNo: selectFourTableParam.resNo,
          gwmUserName: selectFourTableParam.gwmUserName,
          pageStart: val,
          pageSize: 10
        }
      } else {
        // 用户列表翻页
        param = {
          resNo: this.getSelectSceneDetailsPageListByResNoParam.resNo,
          sceneType: this.getSelectSceneDetailsPageListByResNoParam.sceneType,
          pageStart: val,
          pageSize: 10
        }
        this.getSelectSceneDetailsPageListByResNo(param)
      }

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
        }, 1000)
        this.$router.back()
      })
    }
  },
  created() {
    let data = this.$route.params;
    let param = {
      resNo: data.resNo,
      gwmUserName: data.gwmUserName,
      pageStart: 1,
      pageSize: 10
    }
    this.selectFourTableParam = param
    this.getSelectFourTable(param)
    // console.log(this.$route.params)
  }
}
</script>

<style lang="scss" scoped>
.drowBox {
  background: #101638;
  height: 100vh;
  padding: 0.625rem /* 10/16 */;
  .breadcrumbBox {
    padding: 0.625rem /* 10/16 */;
    font-size: 14px;
    cursor: pointer;
    .text {
      font-weight: bold;
      font-size: 0.9375rem /* 15/16 */;
      color: #209af5;
    }
    .text:hover {
      color: aqua;
    }
  }
  .pagination {
    padding: 0.625rem /* 10/16 */ 0 0 0;
    text-align: center;
  }
  >>> .el-table {
    position: inherit;
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
</style>