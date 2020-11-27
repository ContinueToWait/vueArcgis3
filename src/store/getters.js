const getters = {
    position: state =>  state.mode.position,
    fullScreen:state => state.mode.fullScreen,
    map: state =>  state.mode.map,
    comExpression: state=> state.mode.comExpression,
    mapModular:state=> state.mode.mapModular,
    sceneInformationParamVux:state=> state.mode.sceneInformationParamVux,
    selectScene:state=> state.mode.selectScene,
    mapLoadingComplete:state=> state.mode.mapLoadingComplete,
}




export default getters