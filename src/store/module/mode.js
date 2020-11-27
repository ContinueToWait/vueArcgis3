const state = {
    map: '',
    position: "", // 定位坐标
    fullScreen: false, // 地图是否全屏展示
    comExpression: '', // 场景过滤条件
    mapModular:{}, // arcgis引入模块
    sceneInformationParamVux:{},
    selectScene:'' , //当前选择的场景
    mapLoadingComplete:false, // 地图场景加载是否完成


}

const mutations = {
    position(state, res) {
        state.position = res;
    },
    // 地图是否全屏
    fullScreen(state, res) {
        state.fullScreen = res;
    },
    // 场景过滤条件
    comExpression(state, res) {
        state.comExpression = res;
    },
    // arcgis引入模块
    mapModular(state, res){
        state.mapModular[res.name] = res.Fn
    },
    // 全量场景统计->小区选择弹层所需参数
    sceneInformationParamVux(state, res){
        state.sceneInformationParamVux = res;
    },
    // 场景ID
    selectScene(state, res){
        state.selectScene = res;
    },
    // 地图服务加载是否完成
    mapLoadingComplete(state, res){
        state.mapLoadingComplete = res;
    }
}

const actions = {


}

export default {
    state,
    mutations,
    actions
}