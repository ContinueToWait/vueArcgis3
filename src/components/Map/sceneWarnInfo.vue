<template>
  <div class="warnDiv">
    <!-- <div class="mg">企业产品到期时间:{{ expireDate }}</div> -->
    <el-tabs v-model="editableTabsValue" type="border-card">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <!-- <el-tabs v-model="activetab">
          <el-tab-pane el-tab-pane label="小区信息" name="first"> -->
        <div class="clear">
          <div class="text-l mg-t10">
            {{ comName }}小区产品即将到期住户: {{ expireCustomerCount }}(户)
            &nbsp;&nbsp;&nbsp;&nbsp;<el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
          </div>
          <el-checkbox-group
            class="mg-t10 float-l"
            v-model="checkedOperators"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="operator in Operators"
              :label="operator"
              :key="operator"
              >{{ operator }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="250"
            max-height="250"
            border
            ref="table"
          >
            <el-table-column
              fixed="left"
              prop="userName"
              label="客户名称"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="phone" label="联系电话" width="120">
              <template slot-scope="scope">
                {{scope.row.phone?scope.row.phone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3"):""}}
              </template>
            </el-table-column>
            <el-table-column prop="spType" label="运营商类型" width="120">
            </el-table-column>
            <el-table-column prop="buildingName" label="楼宇号" width="80">
            </el-table-column>
            <el-table-column prop="unitName" label="单元号" width="80">
            </el-table-column>
            <el-table-column prop="floorName" label="层号" width="60">
            </el-table-column>
            <el-table-column prop="roomName" label="房号" width="60">
            </el-table-column>
            <el-table-column prop="expDate" label="到期时间" width="120">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- </el-tabs>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
const operatorOptions = ["移动", "电信", "联通"];
const mapTable = {
  JM: {
    title: "居民小区",
    name: "JM",
  },
  SP: {
    title: "商铺",
    name: "SP",
  },
  SY: {
    title: "商业",
    name: "SY",
  },
  ZF: {
    title: "政府",
    name: "ZF",
  },
  YL: {
    title: "医疗",
    name: "YL",
  },
};
export default {
  name: "sceneWarnInfor", //场景预警信息
  data() {
    return {
      expireDate: "2021年1月20号",
      editableTabsValue: "JM",
      editableTabs: [],
      activetab: "first",
      comName: "XX",
      expireCustomerCount: "", //用户数
      checkAll: false,
      checkedOperators: ["移动", "电信", "联通"],
      Operators: operatorOptions,
      isIndeterminate: true,
      tableData: [], //过滤后展示的表数据
      allData: [], //所有的查询到的过期用户数据
    };
  },
  watch: {
    editableTabsValue(value) {
      this.tableData = this.allData[value];
    },
  },
  props: {
    param: {
      type: Object,
    },
  },
  created() {
    let self = this;
    this.comName = this.param.GWM_NAME;
    let url = this.configUrl.api.getMarketWarningDetails;
    let param = {
      fId: this.param.GWM_FID,
    };
    this.getAxios(url, param).then((result) => {
      if (result.code == 200 && Object.keys(result.data).length > 0) {
        self.allData = result.data;
        let count = 0;
        Object.keys(result.data).forEach((element) => {
          count = count + result.data[element].length;
          self.editableTabs.push(mapTable[element]);
        });
        self.expireCustomerCount = count;
        self.filterData();
      }
    });
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedOperators = val ? operatorOptions : [];
      this.isIndeterminate = false;
      this.filterData();
    },
    handleCheckedCitiesChange(value) {
      let self = this;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.Operators.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.Operators.length;

      if (value.length == 0) {
        this.tableData = [];
        return;
      } else {
        this.filterData();
      }
    },
    /**
     * 根据移动、联通、电信过滤数据
     */
    filterData() {
      let self = this;
      this.tableData = this.allData[this.editableTabsValue].filter(function (
        e
      ) {
        return self.checkedOperators.indexOf(e.spType) !== -1;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.warnDiv {
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .mg {
    margin: 10px;
  }
  .box-card {
    width: 200px;
  }
}
</style>