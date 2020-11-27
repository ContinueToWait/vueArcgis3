<template>
  <div class="mainBox">
    <el-tabs class="tab" 
      v-loading="loading"
      element-loading-text="加载中，请稍后"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      v-if="noodlesList.length > 0"
      v-model="activeTabsValue"
      type="border-card"
      @tab-click="ScenceTabActiveClick"
    >
      <el-tab-pane
        v-for="(item, index) in noodlesList"
        :key="index"
        :label="item.gwm_infotype"
        :name="item.gwm_infotype"
      >
      <ReidentCommunity v-if="item.gwm_infotype==='居民小区' && ReidentComIsShow"   :reidentComInfo = reidentComInfo />
      </el-tab-pane>
    </el-tabs>

  
  </div>
</template>

<script>
import * as configUrl from "@/assets/js/config.js";
import { mapGetters } from "vuex";
import ReidentCommunity from './residentsCom/residentCommunity'; //居民小区场景信息
export default {
  name: 'sceneInformation', //场景信息
  data() {
    return {
      
      noodlesList: [], // 17大类获取面信息数组
      activeTabsValue: '',
      ReidentComIsShow:false,//居民小区场景是否显示
      // buildingListIsShow:false,//楼栋清单
      // buildingInfoIsShow:false,//概况
      reidentComInfo:{
        CommunityInfo:[],//小区概况
        buildingListInfo:null//楼宇清单
      },
      loading:true
    }
  },
  components:{
    ReidentCommunity
  },
  props: {
    param: {
      type: Object,
    }
  },
  watch: {
    param() {
      if(this.param){
        this.getListFn(this.param)
      }
    }
  },
  methods: {
    // 根据17大类图层点击获取列表信息
    getListFn(data) {
      
      let url = configUrl.api.sceneBasicInfo;
      let param = {
        gwmFid: data.GWM_FID,
        gwmSceneType: data.GWM_SCENE_TYPE,
      };
      let self = this;
      this.postAxios(url, param)
        .then((result) => {
          if (result.data.scene.length > 0) {
            self.noodlesList = result.data.scene;
            self.activeTabsValue = self.noodlesList[0].gwm_infotype;
            // 获取详细信息
              self.noodlesList.map((item) => {
                if(item.gwm_infotype ==="居民小区"){//需要判断是否是居民小区
                
                //获取楼栋清单信息 11873206
                
                  self.selectBuilding(item.gwm_id, (data) => {
                    //item.selectBuildingList = data;
                    self.reidentComInfo.buildingListInfo = data; //小区的楼宇清单
                    //获取小区概况信息
                    self.selectBuildingInfo(item.gwm_id,(itemInfo) =>{
                      // if(item.length == 0){

                        

                      //   // debugger
                      //   // this.$message.error("未获取到场景面概况数据");
                      //   // reutrn;
                      // }
                      // self.reidentComInfo.CommunityInfo = item;//小区概况信息
                      // self.ReidentComIsShow = true;

                      self.reidentComInfo.CommunityInfo = itemInfo;//小区概况信息
                      if(itemInfo.length==0){
                          this.$message.error("未获取到小区概况信息");
                      }
                        self.ReidentComIsShow = true;
                        self.loading = false;

                    });
                  });
                }
                
              });
          } else {
            this.$message.error("暂未录入场景面详细数据");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // selectBuilding
    selectBuilding(id, callBack){
      let url = configUrl.api.selectBuilding + `/${id}`;
      
      // let url = "/unicomgridmanager/basicInfo/selectBuilding" + `/${id}`;
      
      let param = {};
      let self = this;
      this.postAxios(url, param)
        .then((result) => {
          let selectBuildingList = result.data;
          callBack(selectBuildingList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取小区概况信息
    selectBuildingInfo(id,callBack){
      
      let url = configUrl.api.selectBuildinginfo + `/${id}`;
      //url = 'http://stati.com:7012/unicomgridmanager/basicInfo//selectBuilding/info/11873206'
      let param = {};
      let self = this;
      this.postAxios(url, param)
        .then((result) => {
           let selectBuildingInfo = result.data;//小区概况信息
          callBack(selectBuildingInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ScenceTabActiveClick(tab, event){
      let self = this;
      switch (tab.name) {
        case "居民小区"://居民小区
          if(self.noodlesList.length > 0){
              // 获取详细信息
              self.noodlesList.map((item) => {
                if(item.gwm_infotype ==="居民小区"){//需要判断是否是居民小区
                    self.selectBuilding(item.gwm_ownerid, (data) => {
                    //item.selectBuildingList = data;
                    self.reidentComInfo.buildingListInfo = data; //小区的楼宇清单
                    self.reidentComInfo.CommunityInfo = item;//小区概况信息
                    self.ReidentComIsShow = true;
                  });
                }
                
              });
              //console.log(self.noodlesList);
              // if(self.noodlesList[0].selectBuildingList.length>0){
              //   let bulidInfo = self.noodlesList[0].selectBuildingList[0];
              //   self.buildings = bulidInfo.length;

              // }
          }
          break;
        case "2"://商场
          self.ReidentComIsShow = false;
          break;
        default:
          break;
      }
    }

  },
  created(){       
    this.getListFn(this.param)
  }
}
</script>

<style lang="scss" scoped>
.mainBox{
  max-height: calc(100vh - 180px);
  overflow: hidden;
  .tab{
    height: 100%;
  }
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

  .box-card {
    
    text-align: center
  }
  >>> .el-tabs__header {
    margin: 0;
  }
  >>> .el-dialog__body {
    padding: 0 20px;
  }
  >>>.el-radio-group {
    background-color: #eff2f5;
    padding: 5px;
  }
  .mg{
    margin: 10px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #fcf9f9;
  }
  .buildRow{
    outline:#eff2f5 solid 2px;
    margin: 5px;
  }
  .arrowIcon{
    height: 2.5rem /* 40/16 */;
    line-height: 2.5rem /* 40/16 */;
  }
  .divInfo{
    padding: 10px;
  }
 
}

.mainBox /deep/ .el-radio-button--mini .el-radio-button__inner{
      padding: 7px 8px;
      margin-bottom: 3px;
    
}

</style>