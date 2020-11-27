let imgUrl = "http://192.168.124.15/unicom-redsep-web/app/static/images/";

let arcgis = {
	url: "http://192.168.124.16:8080/arcgis_js_api/library/3.32/3.32compact/init.js",
	css: "http://192.168.124.16:8080/arcgis_js_api/library/3.32/3.32compact/esri/css/esri.css"
}
// 底图
let MapServer = {
	// 深色
	// baseMap: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
	// 浅色
	baseMap: "http://192.168.124.18:6080/arcgis/rest/services/shanxi/shanxi/MapServer",
	Imglayer: {
		img: "http://192.168.124.14:6080/arcgis/rest/services/shanxi/ankangBZ/MapServer",
		label: "http://192.168.124.14:6080/arcgis/rest/services/shanxi/yingxiang/MapServer"
	},
	type:"http://192.168.124.14:6080/arcgis/rest/services/shanxi/scene_type/MapServer",
	moveService:{
		shanxiComGridUrl:"http://192.168.124.14:6080/arcgis/rest/services/shanxi/GRID/FeatureServer/0",
		shanxiWgridUrl:"http://192.168.124.14:6080/arcgis/rest/services/shanxi/GRID/FeatureServer/1",
		shanxiGridUrl:"http://192.168.124.14:6080/arcgis/rest/services/shanxi/GRID/FeatureServer/2"
	},

}
export {
	imgUrl, arcgis, MapServer
}
