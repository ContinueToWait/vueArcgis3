<template>
  <div class="position-r height100 mapBox">
    <el-row :gutter="20" class="cumulativeBox" v-if="fullScreen">
      <el-col :span="12">
        <div
          class="btBox"
          @click="typeActiveClick('1')"
          :class="isTypeActive === '1' ? 'activeBt' : ''"
        >
          目标市场视图
        </div>
        <div
          class="btBox"
          @click="typeActiveClick('2')"
          :class="isTypeActive === '2' ? 'activeBt' : ''"
        >
          营销预警视图
        </div>
        <div
          class="btBox"
          @click="typeActiveClick('3')"
          :class="isTypeActive === '3' ? 'activeBt' : ''"
        >
          指标分析视图
        </div>
      </el-col>
    </el-row>
    <!-- 地图 -->
    <div
      id="viewDiv"
      ref="map"
      class="viewDiv"
      :class="fullScreen ? 'heightMap' : ''"
    >
      <!-- 17大类区域 -->
      <div v-if="scene" class="z9 majorDategories">
        <!-- 上箭头 -->
        <div
          @click="rollBtClick(2)"
          class="arrowIcon shadow-down"
          :class="upBtShow ? 'bgShow' : ''"
        >
          <span class="el-icon-arrow-up"></span>
        </div>
        <!-- 17大类 -->
        <div class="div-roll" ref="roll">
          <el-tooltip
            v-for="(item, index) in majorDategoriesArr"
            :key="index"
            effect="dark"
            :content="item.name"
            placement="right"
          >
            <div
              :class="[item.class, item.active ? 'activeBox' : '']"
              class="majorDategoriesBt mg-t10"
              @click="sceneTypeClick(item)"
            ></div>
          </el-tooltip>
        </div>
        <!-- 下箭头 -->
        <div
          class="bg-f arrowIcon shadow-top"
          :class="downBtShow ? 'bgShow' : ''"
          @click="rollBtClick(1)"
        >
          <span class="el-icon-arrow-down"></span>
        </div>
      </div>
      <!-- 网格、微格、场景 -->
      <div class="z9 cheakbox">
        <el-checkbox
          @change="checkboxChange('gridCheckbox', gridCheckbox)"
          v-model="gridCheckbox"
          label="网格"
        ></el-checkbox>

        <el-checkbox
          @change="checkboxChange('scene', scene)"
          v-model="scene"
          label="场景"
        ></el-checkbox>
        <!-- 微格 -->
        <Microteaching :childrenCallBack="childrenCallBack" />
      </div>
      <!-- 影像、矢量底图切换 -->
      <div class="z9 mapTypeBox">
        <div class="realScene" @click="mapVectorClick('realScene')">
          <div class="text" @click="mapVectorClick('realScene')">影像</div>
        </div>
        <div class="vector" @click="mapVectorClick('vector')">
          <div class="text">地图</div>
        </div>
      </div>
      <!--目标市场视图----- 图例 -->
      <div class="legendBox" v-if="fullScreen && isTypeActive === '1'">
        <div class="legendTitleBox">
          {{ legendTitle }}总数&nbsp;:{{ legendNum }}
        </div>
        <!-- <div class="legendDetail" @click="drawerSummaryDetailClick">
            查看详情
          </div> -->
        <el-button
          class="float-r"
          type="primary"
          size="mini"
          @click="drawerSummaryDetailClick"
        >
          查看详情</el-button
        >
        <el-checkbox-group v-model="legendListVal" @change="legendCheckboxFn">
          <el-checkbox
            :label="item.name"
            v-for="(item, index) in legendList"
            :key="index"
            style="margin-top: 5px"
          >
            <div class="legendCheckbox" :class="item.class">
              {{ item.name }}({{ item.num ? item.num : 0 }})个
            </div>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <!--营销预警视图----- 图例 -->
      <div class="legendBox" v-if="fullScreen && isTypeActive === '2'">
        <div>
          <div class="clear line-h30">
            说明：<el-button
              class="float-r"
              type="primary"
              size="mini"
              @click="drawerSummaryDetailClick"
            >
              查看详情</el-button
            >
          </div>
          <div>对区域内最近3个月有产品到期的场景面进行预警提示</div>
        </div>
      </div>
      <!-- 图例 -->
      <Legend
        class="legendBox"
        v-if="fullScreen && isTypeActive === '3'"
        :fullScreen="fullScreen"
        :isTypeActive="'3'"
      />
      <!--  全屏  -->
      <div class="fullScreenBox" @click="fullScreenClick">
        <img
          v-if="!fullScreen"
          src="@/assets/images/fullScreen.png"
          width="30"
          alt=""
        />
        <img
          v-if="fullScreen"
          src="@/assets/images/exitFullScreen.png"
          width="30"
          alt=""
        />
      </div>
    </div>
    <!-- 区域汇总抽屉 -->
    <el-drawer
      title="区域汇总清单"
      :visible.sync="drawerSummary"
      direction="ltr"
      size="30vw"
      :modal="false"
      :modal-append-to-body="false"
      :wrapperClosable="false"
      class="drawerBox"
    >
      <SummaryList
        style="width: 100%; overflow-x: auto"
        :param="summaryListParam"
        :childrenCallBack="childrenCallBack"
        v-if="drawerSummary"
      />
    </el-drawer>

    <!-- 场景信息弹框 -->
    <el-dialog
      title="场景信息"
      :visible.sync="sceneDialogVisible"
      
      width="60%"
      class="sceneDialogVisibleClass"
    >
      <SceneInformation
        :param="sceneInformationParam"
        v-if="sceneDialogVisible"
      />
    </el-dialog>
    <!-- 场景预警信息弹框 -->
    <el-dialog title="场景营销预警信息" :visible.sync="sceneWarnDialogVisible">
      <SceneWarnInfo
        v-if="sceneWarnDialogVisible"
        :param="sceneInformationParam"
      />
    </el-dialog>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import { mapGetters } from "vuex";

/**
 * sceneInformation  场景信息
 * microteaching 微格
 * SummaryList （录入）汇总信息
 * SceneWarnInfo 场景营销预警信息
 */
import {
  SceneInformation,
  Microteaching,
  SceneWarnInfo,
  SummaryList,
  Legend,
} from "@/components/Map/index";
export default {
  data() {
    return {
      view: "",
      map: "",
      gisModules: [],
      scrollTop: 0,
      sceneAllNum: 0, // 累计场景录入数
      gridCheckbox: false, //  分局网格
      microteaching: false, // 下辖微格
      scene: true, // 场景
      upBtShow: false, // 上按钮
      downBtShow: true, // 下按钮
      sceneInformationParam: "", // 场景组件所需参数
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
      /**
       * @isTypeActive // 1 目标市场视图  ,2 营销预警视图 , 3 指标分析视图
       */
      isTypeActive: "1",
      /**
       * @legendList  “目标市场视图”下 图例列表
       */
      legendList: [
        {
          name: "数据完整录入",
          num: "0",
          class: "bg1",
        },
        {
          name: "数据部分录入",
          num: "0",
          class: "bg2",
        },
        {
          name: "数据未录入",
          num: "0",
          class: "bg3",
        },
      ],
      summaryListParam: "",
      legendListVal: ["数据完整录入", "数据部分录入", "数据未录入"], // 选中的图例
      legendTitle: "", // 图例名称
      legendNum: 0, //图例名称：数量
      drawerSummary: false, // 汇总抽屉
      sceneDialogVisible: false, // 场景信息弹框
      sceneWarnDialogVisible: false, //场景预警信息弹框
      gisConstructor: {},
    };
  },
  components: {
    SceneInformation,
    Microteaching,
    SceneWarnInfo,
    SummaryList,
    Legend,
  },
  watch: {
    /**
     * 目标市场视图、营销预警视图、指标分析视图 切换
     */
    isTypeActive(data) {
      let self = this;
      let layerIds = [
        "legendStyleLayer",
        "marketingWarningLayer",
        "dynamicLayersGraphicsLayerId",
        "targetLayer",
      ];
      this.mapUtil.removeLayer(this, layerIds);
      this.drawerSummary = false;
      switch (data) {
        case "1":
          let param;
          // 默认选中居民小区
          self.majorDategoriesArr.map((item) => {
            if (item.name === "居民小区") {
              param = item;
            }
          });
          self.sceneTypeClick(param);
          break;
        case "2":
          // 更新营销预警打点
          self.marketingWarningFn();
          break;
        case "3":
          break;
      }
    },
    /**
     * 专题图层过滤
     *
     * 根据微格变化，监听图层过滤条件变化，从而修改图层
     */
    comExpression(data) {
      let self = this;
      let layerIds;
      switch (this.isTypeActive) {
        case "1":
          layerIds = ["legendStyleLayer"];
          this.mapUtil.thematicLayerFiltering(
            this,
            layerIds,
            this.comExpression
          );
          /**
           * 根据图例复选框
           * 过滤
           */
          self.legendCheckboxFn(self.legendListVal);
          break;
        case "2":
          self.mapUtil.removeLayer(self, "marketingWarningLayer");
          // 营销预警
          self.marketingWarningFn();
          break;
        case "3":
          layerIds = ["targetLayer"];
          this.mapUtil.thematicLayerFiltering(
            this,
            layerIds,
            this.comExpression
          );
          break;
      }
    },
    /**
     * 外部 选中面
     * 
     */
    sceneInformationParamVux(data) {
      let self = this;
      if (data) {
        self.sceneInformationParam = data.features[0].attributes;
        self.sceneDialogVisible = true;
        self.mapUtil.zoomMap(this, data);
        self.dynamicLayersFn(data);
      }
    }
  },
  computed: {
    /**
     * fullScreen   是否全屏
     * comExpression  选中的微格过滤条件
     */
    ...mapGetters(["fullScreen", "comExpression", "mapModular", "sceneInformationParamVux", "selectScene", "mapLoadingComplete"]),
  },
  methods: {
    loadModules() {
      let self = this;
      let loadModulesArr = [
        "esri/map",
        "esri/layers/ArcGISTiledMapServiceLayer", // 瓦片图
        "esri/layers/ArcGISDynamicMapServiceLayer", // 动态地图服务
        "esri/symbols/SimpleMarkerSymbol", // 用来在graphics图层上画点和多点的
        "esri/symbols/TextSymbol", // 用来在graphics图层上写文字
        "esri/layers/GraphicsLayer", // 包含图形的图层
        "esri/Color", // 继承dojo/_base/Color中的所有属性，以提供设置颜色的函数
        "esri/graphic", // 用来创建几何图层的
        "esri/geometry/Point", // 几何图形中的点类
        "esri/SpatialReference", // 定义图层的空间参考
        "esri/layers/FeatureLayer",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/tasks/query", // 查询
        "esri/tasks/QueryTask",
        "esri/renderers/UniqueValueRenderer",
        "esri/renderers/ClassBreaksRenderer",
        "esri/graphicsUtils",
        "dojo/domReady!",
      ];
      this.gisModules = loadModulesArr;
      const options = {
        // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败.后面会讲到自己本地如何配置资源
        // url: "https://js.arcgis.com/3.34/",
        // css: "https://js.arcgis.com/3.34/esri/css/esri.css",
        url: self.configUrl.arcgis.url,
        css: self.configUrl.arcgis.css,
      };

      loadModules(loadModulesArr, options)
        .then(this.TDTinstance)
        .then(this.gisInit);
    },
    TDTinstance(args) {
      let self = this;
      // 这里处理了一下传参，构造函数全部保存到 gisConstructor 对象中，对应的函数
      // key 值为加载模块的最后一个单词
      // 将引入的模块添加到vuex中
      for (let k in args) {
        let name = this.gisModules[k].split("/").pop();
        name = name.replace(/^\S/, (s) => s.toUpperCase());
        this.gisConstructor[name] = args[k];
        // 提交到vuex
        let param = {
          name: name,
          Fn: args[k],
        };
        self.$store.commit("mapModular", param);
      }
    },
    gisInit() {
      let self = this;
      let map;
      map = new self.mapModular.Map("viewDiv", {
        center: new self.mapModular.Point(
          109.02479399322853,
          32.69607182534896,
          new self.mapModular.SpatialReference({
            wkid: 4326,
          })
        ),
        zoom: 9,
        maxZoom: 12,
        showLabels: true,
        logo: false,
      });

      /**
       *  底图 （影像底图、矢量底图）
       */
      // 矢量底图
      self.vecLayer = new self.mapModular.ArcGISTiledMapServiceLayer(
        self.configUrl.MapServer.baseMap,
        {
          id: "generalTile",
        }
      );
      // 影像底图
      self.imgLayer = new self.mapModular.ArcGISTiledMapServiceLayer(
        self.configUrl.MapServer.Imglayer.img,
        {
          id: "imageTile",
        }
      );
      self.imgLabel = new self.mapModular.ArcGISTiledMapServiceLayer(
        self.configUrl.MapServer.Imglayer.label,
        {
          id: "labelTile",
        }
      );

      /**
       *
       * 图层
       * @selectionSymbol   选中图层样式（高亮）样式
       *
       *  */
      let selectionSymbol = new self.mapModular.SimpleFillSymbol().setColor(
        new self.mapModular.Color([3, 4, 31, 0.8])
      );

      // 网格
      self.gridLayer = new self.mapModular.FeatureLayer(
        self.configUrl.MapServer.moveService.shanxiGridUrl,
        {
          id: "layerShanxiGrid",
          outFields: ["*"], // 指定[“*”]来获取图层中所有字段的值，这在编辑要素时非常有用
          visible: false, // 隐藏
          // model: FeatureLayer.MODE_AUTO
        }
      );

      // 过滤条件
      let expression = "RESNAME = '城区老城分局'";
      self.gridLayer.setDefinitionExpression(expression);

      // 微格
      self.mGridLayer = new self.mapModular.FeatureLayer(
        self.configUrl.MapServer.moveService.shanxiWgridUrl,
        {
          id: "layerShanxiWgrid",
          outFields: ["*"], // 指定[“*”]来获取图层中所有字段的值，这在编辑要素时非常有用
          visible: false, // 隐藏
          // model: FeatureLayer.MODE_AUTO
        }
      );
      let mGridLayerExpression = "GRID_NAME = '城区老城分局'";
      self.mGridLayer.setDefinitionExpression(mGridLayerExpression);
      /**
       * 17大类图层
       */
      self.sceneLayer = new self.mapModular.ArcGISDynamicMapServiceLayer(
        self.configUrl.MapServer.type,
        {
          id: "featureLayerId",
        }
      );

      // 添加图层
      map.addLayers([self.vecLayer, self.mGridLayer, self.gridLayer]);
      map.addLayer(self.sceneLayer, 50);

      //   在地图上隐藏缩放模块
      map.on("load", function () {
        map.hideZoomSlider();
      });
      self.map = map;

      // 图层点击事件添加
      self.map.on("click", self.mapClick);
      // 添加到vuex
      // self.$store.commit("MAP", self.map);
      let param = {
        name: "Map",
        Fn: self.map,
      };
      self.$store.commit("mapModular", param);
      // 获取17大类面详情信息
      self.selectCount();
      // 地图服务加载完成
      self.$store.commit("mapLoadingComplete", true);

    },
    //  滚动条上下按钮点击
    rollBtClick(data) {
      let self = this;
      // 获取容器高度
      let scrollHeight =
        this.$refs.roll.scrollHeight - this.$refs.roll.offsetHeight;
      // 获取滚动条高度
      self.scrollTop = this.$refs.roll.scrollTop;
      switch (data) {
        case 1:
          if (this.scrollTop < scrollHeight) {
            self.scrollTop += 50;
            this.$refs.roll.scrollTop = self.scrollTop;
            self.downBtShow = true;
            self.upBtShow = true;
          } else {
            self.downBtShow = false;
          }
          break;
        case 2:
          if (this.scrollTop > 0) {
            self.scrollTop -= 50;
            this.$refs.roll.scrollTop = self.scrollTop;
            self.upBtShow = true;
            self.downBtShow = true;
          } else {
            self.upBtShow = false;
          }
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

          // 全屏时默认选中居民小区
          // if (self.fullScreen) {
          let param;
          self.majorDategoriesArr.map((item) => {
            if (item.name === "居民小区") {
              param = item;
            }
          });
          self.sceneTypeClick(param);
          // }
        })
    },
    // 底图切换
    mapVectorClick(type) {
      let self = this;
      /* 
       self.map.addLayer（地图，图层顺序）
      */
      // 切影像
      if (type === "realScene") {
        self.mapModular.Map.removeLayer(self.vecLayer);
        self.mapModular.Map.addLayer(self.imgLayer, 1);
        self.mapModular.Map.addLayer(self.imgLabel, 0);
      } else {
        // 切矢量地图
        self.mapModular.Map.removeLayer(self.imgLayer);
        self.mapModular.Map.removeLayer(self.imgLabel);
        self.mapModular.Map.addLayer(self.vecLayer, 0);
      }
    },
    /* 网格、微格、场景复选框点击 */
    checkboxChange(type, value) {
      let self = this;
      switch (type) {
        // 分局网格
        case "gridCheckbox":
          self.gridLayer.setVisibility(value);
          break;
        // 下辖微格
        case "microteaching":
          self.mGridLayer.setVisibility(value);
          break;
        // 场景
        case "scene":
          // 显示隐藏图层
          self.sceneLayer.setVisibility(value);
          // 场景图层恢复初始状态
          if (!value) {
            if (self.mapModular.Map.getLayer("dynamicLayersGraphicsLayerId")) {
              self.mapModular.Map.getLayer(
                "dynamicLayersGraphicsLayerId"
              ).clear();
            }

            let activeIdArr = [];
            self.majorDategoriesArr.forEach((data) => {
              data.active = false;
              activeIdArr.push(data.id);
            });
            self.sceneLayer.setVisibleLayers(activeIdArr);
          }
          break;
      }
      this.detailObj = "";
    },
    //  17大类场景点击
    sceneTypeClick(item) {
      let self = this;
      // 显示选中的分类动态图层
      self.sceneLayer.setVisibleLayers([item.id]);
      self.majorDategoriesArr.forEach((data) => {
        if (data.id !== item.id) {
          data.active = false;
        } else {
          data.active = true;
          // 图例名称
          self.legendTitle = data.name;
          // self.legendNum = data.count;
        }
      });
      self.$store.commit("selectScene", item);
      if (self.isTypeActive === "1") {
        // 获取图例数量
        self.getLegendNum(item);
        // 清空图层选择样式
        self.mapModular.Map.graphicsLayerIds.map((item) => {
          if (item === "dynamicLayersGraphicsLayerId") {
            self.mapModular.Map.getLayer(item).clear();
          }
        });
        // 绘制
        if (self.fullScreen) {
          this.conditionalRendering(item.id);
        }
      } else if (self.isTypeActive === "2") {
        // 营销预警
        self.marketingWarningFn();
      } else if (self.isTypeActive === "3") {
        // 指标分析
        self.mapUtil.removeLayer(this, "targetLayer");
      }
    },
    // "目标市场视图" ==>  渲染数据完整录入、数据部分录入、数据未录入样式
    conditionalRendering(id) {
      let self = this;
      let server = `${this.configUrl.MapServer.type}/${id}`;

      // 清空图层选择样式
      this.mapUtil.removeLayer(this, "legendStyleLayer");

      /**
       * 根据"GWM_STATUS"判断设置渲染的方式
       * identification 录入状态(0:数据完整录入；1：数据部分录入；2数据未录入)
       */

      let identification = [0, 1, 2];
      let colors = ["#47d872", "#ff0000", "#ffc000"];
      this.mapUtil.conditionalRenderLayer(
        this,
        server,
        "legendStyleLayer",
        "GWM_STATUS",
        identification,
        colors
      );
      /*根据微格过滤图层*/
      if (self.comExpression) {
        let comExpression = self.comExpression;
        /*场景图层*/
        let comGridLayer = this.map._layers["featureLayerId"];
        let gridLayerCount = comGridLayer.layerInfos.length;
        comGridLayer.setLayerDefinitions([]);
        let layerDefinitions = new Array(gridLayerCount).fill(comExpression);
        comGridLayer.setLayerDefinitions(layerDefinitions);

        /*专题图层过滤*/
        let layerIds = ["legendStyleLayer"];
        self.mapUtil.thematicLayerFiltering(self, layerIds, comExpression);
      }
      /**
       * 根据图例过滤
       */
      self.legendCheckboxFn(self.legendListVal);
    },
    // 地图点击事件
    mapClick(e) {
      let self = this;
      //获得用户点击的地图坐标
      let point = e.mapPoint;
      // 筛选的服务URL
      let queryTaskUrl = "";
      // 筛选条件
      let where = {
        where: self.comExpression,
        geometry: point,
      };
      /**
       * 筛选地图服务URL
       */

      this.majorDategoriesArr.forEach((item) => {
        if (item.active) {
          queryTaskUrl = `${this.configUrl.MapServer.type}/${item.id}`;
        }
      });
      // 查询
      self.mapUtil.queryUtil(self, queryTaskUrl, where, self.dynamicLayersFn);
    },
    // 图层选中事件
    dynamicLayersFn(queryResult) {

      let self = this;
      // 点击的地方是否有绘制的图层
      if (queryResult.features == 0) {
        return;
      }
      if (queryResult.features[0].attributes.GWM_STATUS === 1) {
        return
      }

      // 绘制图层的id
      let graphicsLayerId = "dynamicLayersGraphicsLayerId";
      // 创建绘制（选中的图层样式添加）
      self.mapUtil.selectLayers(this, queryResult, graphicsLayerId, callBack);
      // 回调
      function callBack(attributes) {
        self.sceneInformationParam = attributes;
        //当前视图为预警视图时，只有在要素预警状态为1时才显示预警信息对话框
        if (
          self.isTypeActive === "2" &&
          attributes &&
          attributes.GWM_WARN_STATUS == 1
        ) {
          self.sceneWarnDialogVisible = true;
        }
      }
      // 场景弹层
      if (self.isTypeActive === "1") {
        self.sceneDialogVisible = true;
      }
    },

    // 全屏
    fullScreenClick() {
      let self = this;
      this.$store.commit("fullScreen", !this.fullScreen);
    },
    // 地图上三个按钮选择
    typeActiveClick(data) {
      let self = this;
      self.isTypeActive = data;
    },
    // "目标市场视图" ==>"汇总详情"抽屉
    drawerSummaryDetailClick() {
      // 汇总抽屉
      let self = this;
      self.summaryListParam = {
        legendList: self.legendList,
        majorDategoriesArr: self.majorDategoriesArr,
        isTypeActive: self.isTypeActive,
      };
      self.drawerSummary = true;
      // 场景信息弹框
      // this.sceneDialogVisible = true;
      // 场景预警信息弹框
      // this.sceneWarnDialogVisible = true;
    },
    // "目标市场视图" ==> 图例复选框事件
    legendCheckboxFn(data) {
      let self = this;
      // let list = ["数据完整录入", "数据部分录入", "数据未录入"];
      let mGridLayerExpression = "";
      data.map((item) => {
        switch (item) {
          case "数据完整录入":
            if (mGridLayerExpression) {
              mGridLayerExpression += " or GWM_STATUS = 0";
            } else {
              mGridLayerExpression = "GWM_STATUS = 0";
            }
            break;
          case "数据未录入":
            if (mGridLayerExpression) {
              mGridLayerExpression += " or GWM_STATUS = 1";
            } else {
              mGridLayerExpression = "GWM_STATUS = 1";
            }
            break;
          case "数据部分录入":
            if (mGridLayerExpression) {
              mGridLayerExpression += " or GWM_STATUS = 2";
            } else {
              mGridLayerExpression = "GWM_STATUS = 2";
            }

            break;
        }
      });
      if (!mGridLayerExpression) {
        mGridLayerExpression = "GWM_STATUS = 404";
      }

      // 清除选中面图层
      if (self.mapModular.Map.getLayer("dynamicLayersGraphicsLayerId")) {
        self.mapModular.Map.getLayer("dynamicLayersGraphicsLayerId").clear();
      }
      // 根据微格筛选渲染部分
      mGridLayerExpression = self.comExpression
        ? `(${mGridLayerExpression})` + " and " + self.comExpression
        : `(${mGridLayerExpression})`;
      self.mapUtil.thematicLayerFiltering(self, ['legendStyleLayer'], mGridLayerExpression)

      /**
       * 筛选地图服务URL
       */
      let queryTaskUrl = '';
      this.majorDategoriesArr.forEach((item) => {
        if (item.active) {
          queryTaskUrl = `${this.configUrl.MapServer.type}/${item.id}`;
        }
      });
      // 查询范围并缩放图层
      self.mapUtil.queryUtil(self, queryTaskUrl, mGridLayerExpression, (queryResult) => {
        self.mapUtil.zoomMap(self, queryResult)
      })
    },
    // 营销预警
    marketingWarningFn() {
      let self = this;
      let id = "";
      // 清除历史图层
      this.mapUtil.removeLayer(this, "marketingWarningLayer");
      self.majorDategoriesArr.map((item) => {
        if (item.active) {
          id = item.id;
        }
      });
      let queryTaskUrl = `${self.configUrl.MapServer.type}/${id}`;
      let where = self.comExpression
        ? "GWM_WARN_STATUS = 1" + " and " + self.comExpression
        : "GWM_WARN_STATUS = 1";

      self.mapUtil.queryUtil(self, queryTaskUrl, where, (queryResult) => {
        self.showFindResult(queryResult);
      });
    },
    showFindResult(queryResult) {
      let self = this;
      if (queryResult.features == 0) {
        return;
      }

      let graphicsLayer = new this.mapModular.GraphicsLayer({
        id: "marketingWarningLayer",
      });

      let icon = require("../assets/images/localRed.png");
      for (let i = 0; i < queryResult.features.length; i++) {
        let feature = queryResult.features[i];
        self.mapUtil.PointUtil(this, feature, icon, "", callBack);
      }
      // 回调函数
      function callBack(picGraphic) {
        graphicsLayer.add(picGraphic);
        self.map.addLayer(graphicsLayer);
      }
    },
    //  "目标市场视图" ==> 获取录入数量（数据完整录入、数据部分录入、数据未录入数量）
    getLegendNum(data) {
      let self = this;
      let url = this.configUrl.api.selectSceneLegendData;
      let param = {
        tableName: data.tableName,
      };
      this.postAxios(url, param)
        .then((result) => {
          if (result.code === 200) {
            let data = result.data;
            self.legendNum = 0;
            // 图例数组
            self.legendList.map((item) => {
              switch (item.name) {
                case "数据完整录入":
                  item.num = data.entered;
                  self.legendNum += data.entered;
                  break;
                case "数据部分录入":
                  item.num = data.partialEntry;
                  self.legendNum += data.partialEntry;
                  break;
                case "数据未录入":
                  item.num = data.notEntered;
                  self.legendNum += data.notEntered;
                  break;
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 子组件回调
    /**
     * data  用来区分子组件
     * param 子组件返回参数
     */
    childrenCallBack(data, param) {
      let self = this;
      switch (data) {
        case "SummaryList":
          // self.drawerSummary = false;
          if (param.name === "detail" && param.type === "target") {
            self.sceneDialogVisible = true;
            self.sceneInformationParam = param.features;
          } else if (param.name === "detail" && param.type === "marketing") {
            self.sceneWarnDialogVisible = true;
            self.sceneInformationParam = param.features;
          }
          break;
        case "microteaching":
          // 微格显示隐藏
          self.mGridLayer.setVisibility(param);
          break;
      }
      // console.log(data)
    },
  },
  beforeDestroy() {
    // 地图服务加载完成
    this.$store.commit("mapLoadingComplete", false);
  },
  created() {
    this.loadModules();
  },
};
</script>

<style  lang="scss" scoped>
.mapBox {
  .drawerBox {
    top: 100px;
    height: calc(100% - 110px);
    width: 30%;
    left: 40px;
    >>> .el-drawer__header {
      padding: 0.625rem /* 10/16 */;
      margin-bottom: 0;
    }
  }
  :focus {
    outline: none;
  }
  .position-r {
    position: relative;
    >>> .el-collapse-item__wrap {
      background: transparent;
    }
  }
  .viewDiv {
    height: calc(100vh - 75px);
    width: 100%;
    box-sizing: border-box;
    position: relative;
    transition: height 0.2s;
  }
  .heightMap {
    height: calc(100vh - 6.25rem /* 100/16 */);
  }
  .heigit70 {
    /*  5.625rem 90/16 */
    height: calc((100vh - 5.625rem) * 0.67) !important;
  }
  .majorDategories {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 40px;
    text-align: center;
    background-color: #0f1953;
    cursor: pointer;

    ::-webkit-scrollbar {
      width: 0 !important;
    }
    ::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    }
  }
  .div-roll {
    overflow-y: auto;
    height: 90%;
  }
  .bg-f {
    background-color: #0f1953;
  }
  .majorDategoriesBt {
    width: 40px;
    height: 40px;
    box-shadow: 1px 1px 10px #000000;
    position: relative;
    background-size: 30px 30px !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
  }
  .majorDategoriesBt:hover {
    background-color: #2099f554;
  }

  .school {
    background: url("../assets/images/school.png");
  }
  .governmentOrgans {
    background: url("../assets/images/governmentOrgans.png");
  }
  .medicalCare {
    background: url("../assets/images/medicalCare.png");
  }

  .community {
    background: url("../assets/images/community.png");
  }
  .stay {
    background: url("../assets/images/stay.png");
  }
  .market {
    background: url("../assets/images/market.png");
  }
  .shops {
    background: url("../assets/images/shops.png");
  }
  .commercialComplex {
    background: url("../assets/images/commercialComplex.png");
  }
  .enterprise {
    background: url("../assets/images/enterprise.png");
  }
  .park {
    background: url("../assets/images/park.png");
  }
  .transportationHub {
    background: url("../assets/images/transportationHub.png");
  }

  .transportServices {
    background: url("../assets/images/transportServices.png");
  }
  .commercialBuildings {
    background: url("../assets/images/commercialBuildings.png");
  }
  .residentialArea {
    background: url("../assets/images/residentialArea.png");
  }
  .privateHome {
    background: url("../assets/images/privateHome.png");
  }
  .culturalTourism {
    background: url("../assets/images/culturalTourism.png");
  }
  .villageCommittee {
    background: url("../assets/images/villageCommittee.png");
  }

  .arrowIcon {
    color: #caccd9;
    height: 5%;
    line-height: 30px;
    text-align: center;
  }
  .shadow-top {
    box-shadow: 1px -3px 10px #000000;
  }
  .shadow-down {
    box-shadow: 1px 1px 10px #000000;
  }

  .mapTypeBox {
    position: absolute;
    right: 60px;
    bottom: 0;
    height: 52px;
    width: 90px;
    text-align: center;
    .realScene {
      background: url("../assets/images/realScene.png") no-repeat;
      background-position: center;
      height: 40px;
      position: relative;
      cursor: pointer;
      float: left;
      width: 40px;
    }
    .vector {
      background: url("../assets/images/vector.png") no-repeat;
      background-position: center;
      height: 40px;
      position: relative;
      cursor: pointer;
      float: left;
      width: 40px;
      margin-left: 10px;
    }
    .text {
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      font-size: 12px;
      color: #caccd9;
    }
  }
  .cheakbox {
    position: absolute;
    top: 10px;
    left: 60px;
    height: 40px;
    line-height: 40px;
    max-width: 400px;
    background-color: #0f1953;
    border-radius: 5px;
    padding: 0 10px;
    >>> .el-checkbox {
      color: #caccd9;
    }
    >>> .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #caccd9;
    }
  }
  .activeBox {
    background-color: #209af554;
  }

  .bgShow {
    background-color: #209af5;
  }
  .width100 {
    width: 100%;
  }
  .z9 {
    z-index: 9;
  }
  >>> .el-collapse-item__header {
    background: none;
    color: #fff;
  }
  .textCol {
    color: #209af5;
    font-weight: bold;
  }

  .cumulativeBox {
    height: 1.875rem /* 30/16 */;
    // line-height: 2.5rem /* 40/16 */;
    padding-left: 3.125rem /* 50/16 */;
  }
  .bg {
    /* background-color: #101638; */
    background: url("../assets/images/content.png") no-repeat;
    background-position: center;
    background-size: 100% 100%;
    box-shadow: 1px 1px 10px #000;
  }
  .fullScreenBox {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 9;
  }
  .btBox {
    padding: 0.3125rem /* 5/16 */ 1.25rem /* 20/16 */;
    height: 1.875rem /* 30/16 */;
    line-height: 1.25rem /* 20/16 */;
    color: #fff;
    background-color: #0f1953;
    float: left;
    font-size: 0.8125rem /* 13/16 */;
    margin-right: 0.625rem /* 10/16 */;
    cursor: pointer;
  }
  .btBox:hover {
    background-color: #209af5;
  }
  .activeBt {
    background-color: #209af5;
  }
  .legendBox {
    position: absolute;
    right: 0;
    // top: 3.75rem /* 60/16 */;
    top: 0;
    min-width: 12.5rem /* 200/16 */;
    max-width: 240px;
    // background-color: #ffffff10;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    padding: 10px;
    text-align: left;
    color: #fff;
    font-size: 14px;
    .legendCheckbox {
      height: 1.875rem /* 30/16 */;
      line-height: 1.875rem /* 30/16 */;
      color: #fff;
      border-radius: 0.3125rem /* 5/16 */;
      padding: 0 0.625rem /* 10/16 */;
      width: calc(12.5rem /* 200/16 */ - 0.3125rem /* 5/16 */);
    }
    .bg1 {
      background-color: #47d872;
    }
    .bg2 {
      background-color: #ffc000;
    }
    .bg3 {
      background-color: #ff0000;
    }
    .legendDetail {
      text-align: right;
      cursor: pointer;
      padding: 5px 10px;
      color: #209af5;
    }
  }
  >>> .el-dialog__body {
    padding: 10px;
  }

  .sceneDialogVisibleClass {
    // margin-left: 2.5rem /* 40/16 */;
    >>> .el-dialog,
    .el-pager li {
      // background: #101638;
    }
    >>> .el-dialog__title {
      // color: #fff;
    }
  }
  .el-dialog__wrapper{
    overflow: hidden;
  }
}
</style>
