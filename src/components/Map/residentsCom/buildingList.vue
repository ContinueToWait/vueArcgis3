<template>
    <div class="rootNode">
      <el-row>
        <el-col  :span="5"><div class="mg line-h30">楼栋统计信息:{{buildings}}栋楼</div></el-col>
        <el-col :span="19">
            <!-- <el-row>
              <el-col :span="7">
                
                <div
                  @click="rollBtClick(2)"
                  class="arrowIcon shadow-down "
                  :class="leftBtShow ? 'bgShow' : ''"
                >
                  <span class="el-icon-arrow-left"></span>
                </div>
              </el-col>
              <el-col :span="10"> -->
              <el-row>
                <el-col :span="3"><div class="line-h40">楼栋:</div></el-col>
                <el-col :span="5">
                  <div class="select">
                    <el-select v-model="buildingRadio"  placeholder="请选择" @change="buildChange" size = "mini">
                      <el-option 
                      v-for=" item in buildingList"
                      :key="item.buildingEid"
                      :label="item.buildingName"
                      :value="item.buildingName"></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="3"><div class="line-h40">单元:</div></el-col>
                <el-col :span="5">
                  
                  <div class="select">
                    <el-select v-model="unitRadio" placeholder="请选择" @change="unitChange" size = "mini">
                      <el-option
                        v-for="item in unitsList"
                        :key="item.unitEid"
                        :label="item.unitName"
                        :value="item.unitName">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="3"><div class="line-h40">楼层:</div></el-col>
                <el-col :span="5">
                  <div class="select">
                    <el-select v-model="floorRadio" placeholder="请选择" @change="floorChange" size = "mini">
                      <el-option
                        v-for="item in floorList"
                        :key="item.floorEid"
                        :label="item.floorName"
                        :value="item.floorName">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <!-- </el-col>
              <el-col :span="7">
                
                  <div
                    class="bg-f arrowIcon shadow-top "
                    :class="rightBtShow ? 'bgShow' : ''"
                    @click="rollBtClick(1)"
                  >
                    <span class="el-icon-arrow-right"></span>
                  </div>
              </el-col>
          </el-row> -->
          
        </el-col>
      </el-row>
      <!--用户列表 --> 
      <div class="clear">
            <div class="text-l operatorBox">
              运营商: &nbsp;&nbsp;&nbsp;&nbsp;<el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
            </div>
            <el-checkbox-group
              class="mg-t10 mg-left"
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
      <div class="roomDiv mg-left">
          <el-row :gutter="8" v-if="roomList.length>0" > 
              <el-col :span="3" v-for="(item,index) in roomList" :key="index+'层'" class="roomcol">
              <RoomInfo v-if ="OperatorTypeFilter(item,checkedOperators)"  :roomInfo = item />
              </el-col>
          </el-row>
      </div>
    </div>
</template>

<script>
import RoomInfo from './roomInfo' ;// 房间信息
const operatorOptions = ['电信', '移动', '联通', '其他', '未装'];
export default {
    name: 'buildingList', //楼栋清单
    data() {
        return {
            buildings:10,//楼栋数
            buildingList:[],//楼栋详情列表
            currentSelectbuildInfo:null,//当前所选楼栋的信息
            buildingRadio:'',
            leftBtShow: false, // 左按钮
            rightBtShow: true, // 右按钮
            isIndeterminate: true,
            checkAll: false,
            checkedOperators: ['电信', '移动', '联通', '其他', '未装'],
            unitRadio:'',
            units:5,
            unitsList:[],//所选楼栋下单元信息
            floorRadio:"",
            floorList:[],
            currentSelectUnitInfo:null,//当前所选单元下信息
            currentSelectFloorInfo:null,//当前所选楼层下信息(房间)
            roomList:[],
            Operators: operatorOptions,

        }
    },
    components:{
        RoomInfo
    },
    watch: {
        currentSelectFloorInfo: 'selectFloorChange', // 所选楼层改变
    },
    props:['buildingListInfo'],
    methods: {
      
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
                self.scrollTop += 60;
                this.$refs.roll.scrollTop = self.scrollTop;
                self.rightBtShow = true;
                self.leftBtShow = true;
            } else {
                self.rightBtShow = false;
            }
            break;
            case 2:
            if (this.scrollTop > 0) {
                self.scrollTop -= 60;
                this.$refs.roll.scrollTop = self.scrollTop;
                self.leftBtShow = true;
                self.rightBtShow = true;
            } else {
                self.leftBtShow = false;
            }
        }
        },
        // 个位数前面补0
        formatter(item){
        if(item < 10){
            item = '0'+item;
        }
        return item;
        },
        handleCheckAllChange(val) {
          
        this.checkedOperators = val ? operatorOptions : [];
        this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.Operators.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.Operators.length;
        },
        //对客户不规则的运营商类型进行规范，
        //根据选择运营商类型条件判断房间是否展示
        OperatorTypeFilter(roomItem,checkedOperators){
          
          if(checkedOperators.length > 0){
            if (roomItem.customer[0].gwmHasnet === "是") {
              if (/电信|移动|联通/.test(roomItem.customer[0].gwmSptype)) {
                if (/电信/.test(roomItem.customer[0].gwmSptype)) {
                  roomItem.customer[0].OperatorType = "电信";
                }
                if (/移动/.test(roomItem.customer[0].gwmSptype)) {
                  roomItem.customer[0].OperatorType = "移动";
                }
                if (/联通/.test(roomItem.customer[0].gwmSptype)) {
                  roomItem.customer[0].OperatorType = "联通";
                }
              } else {
                roomItem.customer[0].OperatorType = "其他";
              }
            } else {
              roomItem.customer[0].OperatorType = "未装";
            }
            let filter  = checkedOperators.join("|");
            filter = new RegExp(filter);
            if(filter.test(roomItem.customer[0].OperatorType)){
              return true;
            }
          }
          else{ //一个运营商类型都没有选择
            return false;
          }
        },
        //楼栋数选择该变
        buildChange(val){
          
            let self = this;
            self.unitRadio='';
            self.floorRadio='';
            if(self.buildingList.length > 0){
                self.buildingList.some(function(item){
                    if(item.buildingName === val){
                        self.currentSelectbuildInfo = item;
                        self.unitsList = self.currentSelectbuildInfo.units;
                        //所选楼栋是否存在单元
                        if(self.unitsList.length>0){
                            //存在单元默认1单元
                            self.currentSelectUnitInfo = self.unitsList[0];
                            self.unitRadio = self.unitsList[0].unitName;
                            if(self.currentSelectUnitInfo.floor.length>0){
                                self.floorList = self.currentSelectUnitInfo.floor;
                                if(self.floorList.length>0){
                                  self.floorRadio = self.floorList[0].floorName;
                                  self.currentSelectFloorInfo = self.floorList[0];
                                  // self.roomList = self.currentSelectFloorInfo.room;
                                }
                                // self.roomList.splice(0,self.roomList.length);//清空数组中的元素
                                // self.currentSelectUnitInfo.floor.forEach(element => {
                                //     self.roomList = self.roomList.concat(element.room);
                                // });
                            }
                        }
                        return true;
                    }
                });
            }
            
        },
        //单元改变
        unitChange(val){
          
            let self = this;
            self.floorRadio='';
            if(self.unitsList.length > 0){
                self.unitsList.some(function(item){
                    if(item.unitName === val){
                        self.currentSelectUnitInfo= item;
                        if(self.currentSelectUnitInfo){
                            if(self.currentSelectUnitInfo.floor.length>0){
                                self.floorList = self.currentSelectUnitInfo.floor;
                                if(self.floorList.length>0){
                                  self.floorRadio = self.floorList[0].floorName;
                                  self.currentSelectFloorInfo = self.floorList[0];
                                }
                                // self.roomList.splice(0,self.roomList.length);//清空数组中的元素
                                // self.currentSelectUnitInfo.floor.forEach(element => {
                                //     self.roomList = self.roomList.concat(element.room);
                                // });
                            }
                        }
                        return true;
                    }
                });
            }
        },
        //楼层发生变化
        floorChange(val){
          
          let self = this;
          self.roomList=[];
          if(self.floorList.length > 0){
            self.floorList.some(function(item){
                if(item.floorName === val){
                  setTimeout(()=>{
                      self.roomList = item.room;
                  },10)
                  return true;
                }
                
            })
          }
        },
        //监听运营商勾选条件变化，对住户进行筛选
        selectFloorChange(curVal,oldVal){
          let self = this;
          if(curVal ==='') return;
          self.roomList=[];
          
         setTimeout(()=>{
            self.roomList = self.currentSelectFloorInfo.room;
         },10)
        }
    },
    created(){
      
        let self = this;
        //默认选择楼栋、单元、楼层
        if(self.buildingListInfo){
            self.buildings = self.buildingListInfo.buildingList.length;
            self.buildingList = self.buildingListInfo.buildingList;//楼栋清单

            //默认情况下显示
            if(self.buildingList.length > 0){
                //默认选择第一栋
                self.currentSelectbuildInfo = self.buildingList[0];
                self.buildingRadio = self.currentSelectbuildInfo.buildingName;
                //第一栋下单元信息
                self.unitsList = self.currentSelectbuildInfo.units;
                if(self.unitsList.length > 0){
                    //默认选择第一单元
                    self.currentSelectUnitInfo = self.unitsList[0];
                     self.unitRadio = self.currentSelectUnitInfo.unitName;
                    if(self.currentSelectUnitInfo){
                        if(self.currentSelectUnitInfo.floor.length>0){
                          
                                self.floorList = self.currentSelectUnitInfo.floor;
                                if(self.floorList.length>0){
                                  self.floorRadio = self.floorList[0].floorName;
                                  self.currentSelectFloorInfo = self.floorList[0];
                                }
                                // self.roomList.splice(0,self.roomList.length);//清空数组中的元素
                                // //获取所选楼层的房间信息
                                // self.currentSelectUnitInfo.floor.forEach(element => {
                                //     self.roomList = self.roomList.concat(element.room);
                                // });
                            

                            // self.roomList.splice(0,self.roomList.length);//清空数组中的元素
                            // //获取一个单元下所有楼层的房间信息
                            // self.currentSelectUnitInfo.floor.forEach(element => {
                            //     self.roomList = self.roomList.concat(element.room);
                            // });
                        }
                    }
                }
                
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.rootNode{
  .line-h30{
    line-height: 30px;
  }
  .line-h40{
    line-height: 30px;
    margin: 10px;
    text-align: right;
  }
  .operatorBox{
    padding: 0 10px;
  }
    .mg{
        margin: 10px;
    }
    .select{
      width: 100%;
      margin-top: 10px;
    }
    .float{
      float: left;
      
    }
    .buildRow{
        outline:#eff2f5 solid 2px;
        margin: 5px;
    }
    .roomcol{
        margin-top: 5px;
    }
    .roomDiv{
        overflow-y: auto;
        max-height: 270px;
        overflow-x: hidden;
        
    }
    .mg-left{
        margin-left: 10px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both;
    }
    .divh{
      width: 100%;
      height: 40px;
      overflow-x: auto;
    }
    .bgShow {
      background-color: #209af5;
    }
    .bg-f {
      background-color: #0f1953;
    }
    .arrowIcon {
      color: #caccd9;
      height: 5%;
      line-height: 30px;
      text-align: center;
      padding-top: 10px;
    }
    .shadow-top {
      box-shadow: 1px -3px 10px #000000;
    }
    .shadow-down {
      box-shadow: 1px 1px 10px #000000;
    }

}

</style>