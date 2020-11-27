
let httpUrl = "http://192.168.124.57:7012";
// 内网发布地址
// let httpUrl = "http://192.168.124.15"

let http14 = "http://192.168.124.14:6080"
let http16 = "http://192.168.124.16:8080"

let arcgis = {
	// url: "http://192.168.124.16:8080/arcgis_js_api/library/3.32/3.32compact/init.js",
	// css: "http://192.168.124.16:8080/arcgis_js_api/library/3.32/3.32compact/esri/css/esri.css",
	url: http16 + "/arcgis_js_api/library/3.32/3.32/init.js",
	css: http16 + "/arcgis_js_api/library/3.32/3.32/esri/css/esri.css"
}
// 底图
let MapServer = {
	// 深色
	// baseMap: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
	// 浅色
	// baseMap: "http://192.168.124.18:6080/arcgis/rest/services/shanxi/shanxi/MapServer",
	baseMap: http14 + "/arcgis/rest/services/shanxi/shanxi/MapServer",

	// 影像地图
	Imglayer: {
		// img: "http://192.168.124.14:6080/arcgis/rest/services/shanxi/ankangBZ/MapServer",
		// label: "http://192.168.124.14:6080/arcgis/rest/services/shanxi/yingxiang/MapServer",
		img: http14 + "/arcgis/rest/services/shanxi/ankangBZ/MapServer",
		label: http14 + "/arcgis/rest/services/shanxi/yingxiang/MapServer"
	},

	// 动态服务图层
	// type:"http://192.168.124.14:6080/arcgis/rest/services/shanxi/scene_type/MapServer",
	type: http14 + "/arcgis/rest/services/shanxi/scene_type/MapServer",
	// 网格、微格
	moveService: {
		// shanxiWgridUrl:"http://192.168.124.14:6080/arcgis/rest/services/shanxi/GRID/FeatureServer/1",
		// shanxiGridUrl:"http://192.168.124.14:6080/arcgis/rest/services/shanxi/GRID/FeatureServer/2",

		shanxiWgridUrl: http14 + "/arcgis/rest/services/shanxi/GRID/FeatureServer/1",
		shanxiGridUrl: http14 + "/arcgis/rest/services/shanxi/GRID/FeatureServer/2"
	},

}

// 接口
let api = {
	sceneBasicInfo: '/unicomgridmanager/basicInfo/sceneBasicInfo',
	selectCount: '/unicomgridmanager/scene/selectCount',
	selectBuilding: '/unicomgridmanager/basicInfo/selectBuilding',
	selectBuildinginfo: 'unicomgridmanager/basicInfo/selectBuilding/info',
	getCustomerByeId: 'unicomgridmanager/scene/getCustomerByeId',
	selectGridNameByResNo: '/unicomgridmanager/gridmanager/selectGridNameByResNo',  /*根据网格resNo获取网格名称接口*/
	//2.根据场景查询图例数据接口  获取录入数量（已录入、未录入、部分录入数量）
	selectSceneLegendData: '/unicomgridmanager/SceneDetails/selectSceneLegendData/guow7_00440001800',
	// 3.根据场景和录入状态分页查询数据清单
	selectSceneDetailsPageList: '/unicomgridmanager/SceneDetails/selectSceneDetailsPageList/guow7_00440001800',
	// 预警信息汇总
	summarizeMarketWarning: '/unicomgridmanager/MarketWarning/summarizeMarketWarning',
	// 场景预警信息获取
	getMarketWarningDetails: '/unicomgridmanager/MarketWarning/getMarketWarningDetails',
	// 5.查询场景大类和小类以及总数
	selectSceneTypeAndCount: '/unicomgridmanager/scene/selectSceneTypeAndCount/guow7_00440001800',
	// 根据场景小类分页查询列表
	selectPageListBySceneSubClass: "/unicomgridmanager/scene/selectPageListBySceneSubClass/guow7_00440001800",
	// 获取一图四表
	selectFourTable: '/unicomgridmanager/SceneDetails/selectFourTable',
	// 8.根据微格编号和场景编号查询所属小区列表
	selectSceneDetailsPageListByResNo: '/unicomgridmanager/SceneDetails/selectSceneDetailsPageListByResNo',
	// 根据分局编码查询分局概况信息
	selectGridOfficeList:'/unicomgridmanager/basicInfo/selectGridOfficeList'
}

// 默认参数
let defaultParam = {
	/**
	   * @majorDategoriesArr
	   * @id 是根据GIS服务对应的id添加的，用来控制动态图层内显示的图层；
	   * @tableName  表名称
	   */
	majorDategoriesArr: [
		{
			name: "居民小区",
			id: 12,
			tableName: "hxtt_jumingxiaoqu",
			aliasTableName: "JM",
		},
		{
			name: "商务楼宇",
			id: 8,
			tableName: "hxtt_shangwulouyu",
			aliasTableName: "SW",
		},

		{
			name: "企业",
			id: 10,
			tableName: "hxtt_qiye",
		},

		{
			name: "民宅",
			id: 11,
			tableName: "hxtt_mingzhai",
		},
		{
			name: "商铺",
			id: 9,
			tableName: "hxtt_shangpu",
			aliasTableName: "SP",
		},
		{
			name: "学校",
			id: 3,
			tableName: "hxtt_xuexiao",
		},
		{
			name: "政府机关",
			id: 1,
			tableName: "hxtt_zhengfujiguan",
			aliasTableName: "ZF",
		},
		{
			name: "医疗",
			class: "medicalCare",

			id: 2,
			tableName: "hxtt_yiliao",
			aliasTableName: "YL",
		},
		{
			name: "社区",
			id: 6,
			tableName: "hxtt_shequ",
		},
		{
			name: "住宿",
			id: 0,
			tableName: "hxtt_zhusu",
		},
		{
			name: "市场",
			id: 5,
			tableName: "hxtt_shichang",
		},
		{
			name: "商业综合体",
			id: 7,
			tableName: "hxtt_shangyezongheti",
		},
		{
			name: "园区",
			id: 16,
			tableName: "hxtt_yuanqu",
		},
		{
			name: "交通枢纽",
			id: 15,
			tableName: "hxtt_jiaotongshuniu",
		},
		{
			name: "交通服务",
			id: 13,
			tableName: "hxtt_jiaotongfuwu",
		},
		{
			name: "文化旅游",
			id: 4,
			tableName: "hxtt_wenhualvyou",
		},
		{
			name: "村委会",
			id: 14,
			tableName: "hxtt_cunweihui",
		},
	],
}
export {
	api, httpUrl, arcgis, MapServer,defaultParam
}
