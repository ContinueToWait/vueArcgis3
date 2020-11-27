<template>
  <div class="rootNode">
      <el-tabs  v-model="activetab"  @tab-click="tabActiveClick" > 
          <el-tab-pane el-tab-pane label="概况" name="first">
            <ComOverview  v-if="comInfocShow" :ComInfo = reidentComInfo.CommunityInfo />
          </el-tab-pane>
          <el-tab-pane label="楼栋清单" name="second">
            <BuildingList v-if="bListIsShow" :buildingListInfo = reidentComInfo.buildingListInfo />
          </el-tab-pane>
        </el-tabs>
  </div>
</template>

<script>
import ComOverview from './comOverview'; //小区概况
import BuildingList from './buildingList'; //楼栋详情
export default {
    name: 'residentCommunity', //居民小区
    data(){
        return {
            comInfocShow:false,
            bListIsShow:false,//楼栋清单列表信息组件是否显示
            activetab:"first"
        }
    },
    components:{
        ComOverview,
        BuildingList
    },
    props: {
        reidentComInfo: {
        type: Object,
        }
    },
    methods: {
        tabActiveClick(tab, event){
            let self = this;
            switch (tab.name) {
                case "first"://概况
                self.bListIsShow = false;
                if(self.reidentComInfo.CommunityInfo &&  self.reidentComInfo.CommunityInfo.length >0 ){
                    self.comInfocShow = true;
                }else{
                    this.$message.error("未获取到小区概况信息");
                }
                    
                break;
                case "second"://楼栋清单
                    self.comInfocShow = false;
                    if(self.reidentComInfo.buildingListInfo &&  self.reidentComInfo.buildingListInfo.buildingList.length >0 ){
                        self.bListIsShow = true;
                    }else{
                        this.$message.error("未获取到楼宇信息");
                    }
                // if(self.noodlesList.length > 0){
                //     // 获取详细信息
                //     self.noodlesList.map((item) => {
                //         if(item){//需要判断是否是居民小区
                //             self.selectBuilding(item.gwm_ownerid, (data) => {
                //             item.selectBuildingList = data;
                //             self.buildingListInfo = data;
                //             self.bListIsShow = true;
                //         });
                //         }
                        
                //     });
                    //console.log(self.noodlesList);
                    // if(self.noodlesList[0].selectBuildingList.length>0){
                    //   let bulidInfo = self.noodlesList[0].selectBuildingList[0];
                    //   self.buildings = bulidInfo.length;

                    // }
                //}
                break;
                default:
                break;
            }
        },
    },
    created(){
        
        if(this.reidentComInfo.CommunityInfo && this.reidentComInfo.CommunityInfo.length>0){
            this.comInfocShow = true;
        }
        
    }
    

}
</script>

<style lang="scss" scoped>
.tab{
    text-align: center
  }
</style>