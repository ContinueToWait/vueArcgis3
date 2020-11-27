/***
 *
 *   █████▒█    ██  ▄████▄   ██ ▄█▀       ██████╗ ██╗   ██╗ ██████╗
 * ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒        ██╔══██╗██║   ██║██╔════╝
 * ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░        ██████╔╝██║   ██║██║  ███╗
 * ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄        ██╔══██╗██║   ██║██║   ██║
 * ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄       ██████╔╝╚██████╔╝╚██████╔╝
 *  ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒       ╚═════╝  ╚═════╝  ╚═════╝
 *  ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
 *  ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
 *           ░     ░ ░      ░  ░
 */

/**
 * 
 * 图层 ==>（FeatureLayer）
 * 
 * 搜索关键 字定位到方法： 
 * 查询，打点、坐标定位，图层选中，图层过滤，图层显示隐藏，
 * 删除图层、清除图层，根据条件对服务进行查询并渲染图层，定位到选中面范围
 * 
 * 
 */

/**
 * 关键字：查询  支持(where,geometry)
 * @param {Object} self 
 * @param {String} queryTaskUrl 服务地址
 * @param {String} condition 筛选条件
 * @param {Function} callBack 回调函数
 * 
 *   通过condition类型 object、string 区分查询条件
 *   condition类型 object  {where：'xx',geometry:'xx'}
 *   condition类型 string  'xxxxx'
 */


export function queryUtil(self, queryTaskUrl, condition, callBack) {
  let query = new self.mapModular.Query();
  query.outFields = ["*"];
  query.outSpatialReference = self.mapModular.Map.spatialReference; // 空间参考
  query.returnGeometry = true; // 查询返回Geometry

  if (typeof (condition) == 'object') {
    query.where = condition.where; // 筛选条件
    query.geometry = condition.geometry;
  } else {
    query.where = condition; // 筛选条件
  }
  //实例化查询对象
  // var queryTask = new self.QueryTask("http://192.168.124.14:6080/arcgis/rest/services/shanxi/scene_type/MapServer/12");
  var queryTask = new self.mapModular.QueryTask(queryTaskUrl);
  //进行查询
  queryTask.execute(query, queryResult => {
    callBack(queryResult)
  })
}

/**
 * 关键字：打点、坐标定位   (分为只添加一个，也可以添加多个情况)
 * @param {*} self this
 * @param {Object} feature 特征信息
 * @param {String} icon  图标
 * @param {String} graphicsLayerId 图层ID  和callBack 二存一
 * @param {Function} callBack 回调函数
 */
export function PointUtil(self, feature, icon, graphicsLayerId, callBack) {
  let newPoint = new self.mapModular.Point(feature.attributes.GWM_X, feature.attributes.GWM_Y, self.mapModular.Map.spatialReference);
  let picSymbol = new self.mapModular.PictureMarkerSymbol(icon, 30, 30);
  let picGraphic = new self.mapModular.Graphic(newPoint, picSymbol);
  /** 
   * 如果有 graphicsLayerId ，直接添加绘制图层
   * 没有 返回绘制信息
   */
  if (graphicsLayerId) {
    let graphicsLayer;
    if (self.mapModular.Map.getLayer(graphicsLayerId)) {
      self.mapModular.Map.removeLayer(self.mapModular.Map.getLayer(graphicsLayerId))
    }
    graphicsLayer = new self.mapModular.GraphicsLayer({
      id: graphicsLayerId,
    });
    // 添加到图层
    graphicsLayer.add(picGraphic)
    // 将图层添加到地图
    self.mapModular.Map.addLayer(graphicsLayer);
    // 定位并居中
    self.mapModular.Map.centerAndZoom(newPoint, 11);
  } else {
    callBack(picGraphic)
  }

}

/**
 * 关键字：图层选中
 * @param {Object} self 
 * @param {Object} queryResult 
 * @param {String} graphicsLayerId 
 * @param {Function} callBack 
 */
export function selectLayers(self, queryResult, graphicsLayerId, callBack) {
  /* 是否存在图层 */
  let isTrue = false;
  // 清除图层绘制
  for (let i = 0; i < queryResult.features.length; i++) {
    self.mapModular.Map.graphicsLayerIds.map((item) => {
      if (item === graphicsLayerId) {
        self.mapModular.Map.getLayer(item).clear();
        isTrue = true;
      }
    });


    //获得该图形的形状
    let feature = queryResult.features[i];
    let geometry = feature.geometry;
    /**
       * 定义高亮图形的符号
       * 边框样式
       * new SimpleLineSymbol(style, color, width)
       * 面样式
       * new SimpleFillSymbol(style, outline, color)
       */
    //1.定义面的边界线符号
    let outline = new self.mapModular.SimpleLineSymbol(
      self.mapModular.SimpleLineSymbol.STYLE_SOLID,
      new self.mapModular.Color([64, 158, 255]),
      1
    );
    //2.定义面符号
    let PolygonSymbol = new self.mapModular.SimpleFillSymbol(
      self.mapModular.SimpleFillSymbol.STYLE_SOLID,
      outline,
      new self.mapModular.Color([3, 4, 31, 0.8])
    );
    //创建客户端图形
    let graphic = new self.mapModular.Graphic(geometry, PolygonSymbol);

    /**
 * 将客户端图形添加到map中
 * 1.创建“绘制图层”GraphicsLayer
 * 2.将图形（Graphic）添加到“绘制图层”
 * 3.将“绘制图层”添加到地图(map)上
 */

    if (!isTrue) {
      let graphicsLayer = new self.mapModular.GraphicsLayer({
        id: graphicsLayerId,
      });
      graphicsLayer.add(graphic);
      self.mapModular.Map.addLayer(graphicsLayer,1);
    } else {
      self.mapModular.Map.getLayer(graphicsLayerId).add(graphic);
    }

    // 返回选中的面
    if (typeof (callBack) == 'function') {
      callBack(feature.attributes)
    }

  }
}

/**
 * 关键字  图层过滤 （FeatureLayer）
 * @param {Array} layerIds 需要过滤图层的Id
 * @param {String} comExpression 过滤条件
 */
export function thematicLayerFiltering(self, layerIds, comExpression) {
  layerIds.map(item => {
    let legendStyleLayer = self.mapModular.Map._layers[item];
    if (legendStyleLayer) {
      legendStyleLayer.setDefinitionExpression(comExpression);
    }
  })
}
/**
 * 关键字 ： 图层显示隐藏
 * @param {Object} self 
 * @param {String} layerId 图层ID
 * @param {Boolean} show  显示隐藏
 */
export function setVisibility(self, layerId, show) {
  let layer = self.mapModular.Map.getLayer(layerId);
  layer.setVisibility(show)
}

/**
 * 关键字：
 * 删除图层、清除图层
 * @param {Object} self 
 * @param {String} layerIds 图层ID(可以是数组，也可以是字符串)
 */
export function removeLayer(self, layerIds) {

  if (typeof (layerIds) === 'object') {
    layerIds.map(item => {
      if (self.mapModular.Map.getLayer(item)) {
        self.mapModular.Map.removeLayer(self.mapModular.Map.getLayer(item))
      }
    })
  } else {
    if (self.mapModular.Map.getLayer(layerIds)) {
      self.mapModular.Map.removeLayer(self.mapModular.Map.getLayer(layerIds))
    }
  }

}

/**
 * 关键字：
 *    根据条件对服务进行查询并渲染图层
 * @param {Object} self 
 * @param {String} serverUrl 服务地址
 * @param {String} layerId 图层Id
 * @param {String} where 判断条件
 * @param {Array} identification 区分条件
 * @param {Array} colors 颜色数组
 */
export function conditionalRenderLayer(self, serverUrl, layerId, where, identification, colors) {

  let featureLayer = new self.mapModular.FeatureLayer(
    serverUrl,
    {
      outFields: ["*"],
      id: layerId
    });

  //定义线符号
  let lineSymbol = new self.mapModular.SimpleLineSymbol(
    self.mapModular.SimpleLineSymbol.STYLE_SOLID,
    new self.mapModular.Color([64, 158, 255]),
    1
  );
  //定义面符号
  let fill = new self.mapModular.SimpleFillSymbol(self.mapModular.SimpleFillSymbol.STYLE_SOLID, lineSymbol, new self.mapModular.Color("#FFFFCC"));
  //定义唯一值渲染器，对字段alias进行渲染，fill是默认的渲染符号
  let renderer = new self.mapModular.UniqueValueRenderer('', where);
  /**
   * 根据"where == item"判断设置渲染的方式 
   * 
   */
  identification.map((item, index) => {
    renderer.addValue(item, new self.mapModular.SimpleFillSymbol(self.mapModular.SimpleFillSymbol.STYLE_SOLID, lineSymbol, new self.mapModular.Color(colors[index])));
  })

  featureLayer.setRenderer(renderer);
  self.mapModular.Map.addLayer(featureLayer);
}

/**
 * 关键字：
 *    根据条件(区间)对服务进行查询并渲染图层
 * @param {Object} self 
 * @param {String} serverUrl 服务地址
 * @param {String} layerId 图层Id
 * @param {String} where 判断条件
 * @param {Array} identification 区分条件
 * @param {Array} colors 颜色数组
 */

export function IntervalRendering(self, serverUrl, layerId, where, identification, colors){
  let featureLayer = new self.mapModular.FeatureLayer(
    serverUrl,
    {
      outFields: ["*"],
      id: layerId
    });

  //定义线符号
  let lineSymbol = new self.mapModular.SimpleLineSymbol(
    self.mapModular.SimpleLineSymbol.STYLE_SOLID,
    new self.mapModular.Color([64, 158, 255]),
    1
  );
  //定义面符号
  let fill = new self.mapModular.SimpleFillSymbol(self.mapModular.SimpleFillSymbol.STYLE_SOLID, lineSymbol, new self.mapModular.Color("#FFFFCC"));
  //定义唯一值渲染器，对字段alias进行渲染，fill是默认的渲染符号
  
  let renderer = new self.mapModular.ClassBreaksRenderer('', where);
  /**
   * 根据"where == item"判断设置渲染的方式 
   * 
   */
  identification.map((item, index) => {
    renderer.addBreak(item[0],item[1], new self.mapModular.SimpleFillSymbol(self.mapModular.SimpleFillSymbol.STYLE_SOLID, lineSymbol, new self.mapModular.Color(colors[index])));
  })

  featureLayer.setRenderer(renderer);
  self.mapModular.Map.addLayer(featureLayer);
}
/**
 * 关键字 ： 定位到选中面范围
 * @param {Object} self 
 * @param {Object} queryResult  (queryResult.features)
 */
export function zoomMap(self, queryResult) {
  let extent = self.mapModular.GraphicsUtils.graphicsExtent(queryResult.features);
  self.mapModular.Map.centerAt(extent.getCenter());
  self.mapModular.Map.setExtent(extent);
}