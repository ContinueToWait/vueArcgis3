<template>
  <div class="microteachingBox" >
    <el-checkbox
      v-model="gridCheckboxVal"
      label="微格"
      v-if="!gridCheckboxVal"
      class="mg-l30"
      @change="checkboxChangeFn('microteaching', gridCheckboxVal)"
    ></el-checkbox>

    <el-select
      v-if="gridCheckboxVal"
      class="microteaching"
      v-model="selectItem"
      multiple
      clearable
      collapse-tags
      style="margin-left: 20px"
      placeholder="请选择"
      popper-class ="microteaching-option"
    >

      <el-option
        v-for="item in Grids"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        class="option"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "microteaching", // 微格
  data() {
    return {
      microteaching: false,
      gridCheckboxVal: false, //  分局网格
      checkAll: false,
      checkedGrids: [],
      Grids: [],
      isIndeterminate: true,
      microFeatures: [],
      initMapExtent: null,
      selectItem: [],
      microGridMap: null, // 建立格网id与名称的映射
      microGridNames: [],
    };
  },
  props: {
    childrenCallBack: {
      type: Function,
      default: null,
    },
  },
  computed: {
    ...mapGetters(["mapModular"]),
  },
  watch: {
    selectItem(data) {
      let self = this;
      // 判断是显示复选框还是选择框
      if (data.length === 0) {
        self.gridCheckboxVal = false;
        self.selectItem = self.microGridNames;
        self.microGridNames = [];
        // 不能同时执行，需要差值
        setTimeout(function () {
          self.childrenCallBack('microteaching', false);
        }, 50)
      } else {
        // self.selectItem= [];
        self.handleCheckGridChange(data);
      }
    },
    gridCheckboxVal(val) {
      let self = this;
      if (val) {
        self.getMircroGrids();
      } else {
        self.$store.commit("comExpression", '');
      }
    }
  },
  methods: {
    /*回调父级方法*/
    checkboxChangeFn(type, value) {
      this.childrenCallBack('microteaching', value);
    },

    isCheckedAll() {
      return this.selectItem.indexOf("all") > -1 ? true : false;
    },

    handleCheckGridChange(value) {
      if (this.isCheckedAll()) {
        this.selectItem = this.microGridNames;
      }
      this.microGridLayer.setVisibility(true);
      this.checkedGrids = value;
      this.setDefinitionExpression();
      this.getGraphicsExtent();
    },
    /*获取微格Graphic的范围*/
    getGraphicsExtent() {
      let self = this;
      let microFeatures = [];
      //  let checkGrids = Array.from(new Set(this.checkedGrids));
      let checkGrids = this.checkedGrids;
      for (let index = 0; index < this.checkedGrids.length; index++) {
        const element = checkGrids[index];
        let microFeature = self.microFeatures[element];
        if (microFeature) {
          microFeatures.push(microFeature);
        }
      }
      if (microFeatures.length > 0) {
        
        let extent = this.mapModular.GraphicsUtils.graphicsExtent(microFeatures);
        this.zoomToGeo(extent);
      }
    },
    /*对图层添加定义过滤数据*/
    setDefinitionExpression() {
      //  let checkedGrids = Array.from(new Set(this.checkedGrids));
      let checkedGrids = this.checkedGrids;
      let grids = this.checkedGrids
        .filter((name) => name !== "全部")
        .join("','");
      let expression = "RESNAME in ( '" + grids + "')";
      this.microGridLayer.setDefinitionExpression(expression);

      /*场景图层*/
      let comGridLayer = this.mapModular.Map._layers["featureLayerId"];
      let gridLayerCount = comGridLayer.layerInfos.length;

      let ids = this.getGWM_W_GRIDs().join(",");
      // 图层过滤条件
      let comExpression = "GWM_W_GRID in (" + ids + ")";
      this.$store.commit("comExpression", comExpression);

      comGridLayer.setLayerDefinitions([]);
      if (this.selectItem.length > 0) {
        let layerDefinitions = new Array(gridLayerCount).fill(comExpression);
        comGridLayer.setLayerDefinitions(layerDefinitions);
      }

    },
    /*定位*/
    zoomToGeo(extent) {
      this.mapModular.Map.centerAt(extent.getCenter());
      this.mapModular.Map.setExtent(extent);
    },
    // 获取微格列表
    getMircroGrids() {
      let self = this;
      this.initMapExtent = this.mapModular.Map.extent;
      this.microGridLayer = this.mapModular.Map._layers["layerShanxiWgrid"];
      let query = this.mapModular.Query;
      let microGridNames = [];
      this.microGridLayer.queryFeatures(query, function (result) {
        if (result.features && result.features.length > 0) {
          microGridNames.push({ value: "all", label: "全部" });
          result.features.forEach((feature) => {
            let resname = feature.attributes["RESNAME"];
            if (!!resname) {
              let param = {
                value: resname,
                label: resname,
                GWM_W_GRID: feature.attributes["RESNO"],
              };
              microGridNames.push(param);
              self.microGridMap = microGridNames;
              self.microFeatures[resname] = feature;
              self.microGridNames.push(resname);
            }
          });
          self.checkedGrids = microGridNames;
          self.Grids = [...microGridNames];


          // select全选
          self.selectItem = [];
          self.selectItem = self.microGridNames;
        }
      });
    },
    /*获取GWM_W_GRIDs*/
    getGWM_W_GRIDs() {
      let gwmWGrids = [];
      let self = this;
      this.selectItem.forEach((element) => {
        let id = self.getGWM_W_GRID(element);
        if (!!id) {
          gwmWGrids.push("'" + id + "'");
        }
      });
      return gwmWGrids;
    },
    /*获取GWM_W_GRID*/
    getGWM_W_GRID(name) {
      for (let index = 0; index < this.microGridMap.length; index++) {
        const element = this.microGridMap[index];
        if (element.value === name) return element.GWM_W_GRID;
      }
    },
  },
  created() {
    // marketingWarningLayer
  },
  mounted() { },
};
</script>

<style lang="scss"  scoped>
.microteachingBox{
  float: right;
 
.microteaching {
  >>> .el-input__inner {
    height: 40px;
    line-height: 40px;
    background-color: #0f1953;
    border: none;
  }
  >>> .el-tag.el-tag--info {
    background-color: #0f1953;
    color: #ffffff;
    border: none;
  }

  >>> .el-select-dropdown__item {
    padding: 0 5px;
    color: #ffffff;
  }
}
.mg-l30{
    margin-left: 30px;
 }
}
</style>
<style lang="scss">
.microteaching-option {
    // >>> .el-select-dropdown {
      background-color: #0f1953 !important;
      color: #ffffff !important;
    // }
    li{
       background-color: #0f1953 !important;
      color: #ffffff !important;
    }
    li:hover{
       background-color: #1d31a7 !important;
      color: #ffffff !important;
    }
    li.selected{
       background-color: #1d31a7 !important;
      color: #ffffff !important;
    }
    li::after{
    color: #18c9e0;
    }
  }
</style>
