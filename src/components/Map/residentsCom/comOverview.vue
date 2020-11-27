<template>
    <div class="rootNode">
        <div class="divInfo">{{comName}} 地址:{{comAddres}}</div>
            <el-row class="rowh">
              <el-col :span="8" >
                <el-card class="box-card" >
                  <div slot="header" class="divh bgcolor1">
                    <span class="titlespan">市场</span>
                  </div>
                  <!-- <div v-for="o in 4" :key="o" class="text">
                    {{ "列表内容 " + o }}
                  </div> -->
                  <!-- <div class="text">住户数:{{ResidentNum}}户</div> -->
                  <div>
                    <el-row>
                      <el-col :span="6">
                        <img class ="image" :src="require('@/assets/images/comOverview/residentNum.png')">
                      </el-col>
                      <el-col :span="18">
                        <div class="divText textColor1">
                          {{ResidentNum}}<span>户</span>
                        </div>
                        <div>
                          住户数
                        </div>
                        </el-col>
                    </el-row>
                  </div>
                  <div>
                    <el-row>
                      <el-col :span="8">
                        <img class ="image" :src="require('@/assets/images/comOverview/netNum.png')">
                      </el-col>
                      <el-col :span="16">
                        <div class="divText textColor1">
                          {{netNum}}<span>个</span>
                        </div>
                        <div>
                          宽带数
                        </div>
                        </el-col>
                    </el-row>
                  </div>
                  <!-- <div class="text">宽带数:{{netNum}}个 </div> -->
                  <div>
                    <el-row>
                      <el-col :span="8">
                        <img class ="image" :src="require('@/assets/images/comOverview/netPenetration.png')">
                      </el-col>
                      <el-col :span="16">
                        <div class="divText textColor1">
                          {{netPenetration}}
                        </div>
                        <div>
                          宽带渗透率
                        </div>
                        </el-col>
                    </el-row>
                  </div> 
                  <!-- <div class="text">宽带渗透率:{{netPenetration}}</div>-->
                </el-card>
              </el-col>
              <el-col :span="8" >
                <el-card class="box-card">
                  <div slot="header" class="divh bgcolor2">
                    <span>资源</span>
                  </div>
                  <!-- <div v-for="o in 4" :key="o" class="text">
                    {{ "列表内容 " + o }}
                  </div> -->
                  <div>
                    <el-row>
                      <el-col :span="8">
                        <img class ="image" :src="require('@/assets/images/comOverview/portsNum.png')">
                      </el-col>
                      <el-col :span="16">
                        <div class="divText textColor2">
                          {{portsNum}}<span>个</span>
                        </div>
                        <div>
                          端口数
                        </div>
                        </el-col>
                    </el-row>
                  </div> 
                  <!-- <div class="text">端口数:{{portsNum}}个</div> -->
                  <div>
                    <el-row>
                      <el-col :span="8">
                        <img class ="image" :src="require('@/assets/images/comOverview/usePortNum.png')">
                      </el-col>
                      <el-col :span="16">
                        <div class="divText textColor2">
                          {{usePortNum}}<span>个</span>
                        </div>
                        <div>
                          端口占用数
                        </div>
                        </el-col>
                    </el-row>
                  </div>
                  <!-- <div class="text">端口占用数:{{usePortNum}}个</div> -->
                  <div>
                    <el-row>
                      <el-col :span="8">
                        <img class ="image" :src="require('@/assets/images/comOverview/freePortNum.png')">
                      </el-col>
                      <el-col :span="16">
                        <div class="divText textColor2">
                          {{freePortNum}}<span>个</span>
                        </div>
                        <div>
                          端口空闲数
                        </div>
                        </el-col>
                    </el-row>
                  </div>
                  <!-- <div class="text">端口空闲数:{{freePortNum}}个</div> -->
                </el-card>
              </el-col>
              <el-col :span="8" >
                <el-card class="box-card">
                  <div slot="header" class="divh bgcolor3">
                    <span>竞对</span>
                  </div>
                  <!-- <div v-for="o in 4" :key="o" class="text">
                    {{ "列表内容 " + o }}
                  </div> -->
                  <div>
                    <el-row>
                      <el-col :span="8">  
                        <img class ="image" :src="require('@/assets/images/comOverview/unicomUser.png')">
                      </el-col>
                      <el-col :span="16">
                        <div class="divText textColor3">
                          {{unicomUserNum}}<span>个</span>
                        </div>
                        <div>
                          联通宽带用户数
                        </div>
                        </el-col>
                    </el-row>
                  </div>
                  <!-- <div class="text">联通宽带用户数:{{unicomUserNum}}户</div> -->
                  <div>
                    <el-row>
                      <el-col :span="8">
                        <img class ="image" :src="require('@/assets/images/comOverview/telecomUser.png')">
                      </el-col>
                      <el-col :span="16">
                        <div class="divText textColor3">
                          {{telecomUserNum}}<span>个</span>
                        </div>
                        <div>
                          电信宽带用户数
                        </div>
                        </el-col>
                    </el-row>
                  </div>
                  <div class="h59"></div>
                  <!-- <div class="text">电信宽带用户数:{{telecomUserNum}}户</div> -->
                </el-card>
              </el-col>
            </el-row>
    </div>
</template>

<script>
export default {
    name: 'comOverview', //小区概况
    data() {
        return {
          comName:'土产公司家属院小区',
          comAddres:'大南街',
          ResidentNum: 100,//住户数
          netNum:80,//宽带数
          netPenetration:'80%',//宽带渗透率
          portsNum:200,//端口数
          usePortNum:100,//端口占用数
          freePortNum:100,//端口空闲数
          unicomUserNum:0,//联通宽带用户数
          telecomUserNum:0,//电信宽带用户数


        }
    },
    props:{
        ComInfo :{
            type:Array
        }
    },
    created(){
      
      let self = this;
      if(this.ComInfo.length > 0){
        
          self.comName =this.ComInfo[0].gwmUsername;
          self.comAddres = this.ComInfo[0].gwmAddress;
          
          self.ResidentNum = this.ComInfo[0].gwmSceneScale === null ? 0 :this.ComInfo[0].gwmSceneScale;//住户数
          self.netNum = this.ComInfo[0].gwmWideBand === null ? 0 :this.ComInfo[0].gwmWideBand//宽带数
          if(self.ResidentNum !== 0){
              self.netPenetration = self.netNum / self.ResidentNum;//宽带渗透率
              if (self.netPenetration !== 0) {
                // Math.round(this * 10000)/100).toFixed(2) + '%'
                var str=Number(self.netPenetration*100).toFixed();
                str+="%";
                self.netPenetration = str;
            }
          }
          self.portsNum = this.ComInfo[0].gwmPortCount;//端口数
          self.usePortNum = this.ComInfo[0].gwmPortUsed;//端口占用数
          self.freePortNum = this.ComInfo[0].gwmPortFree;//端口空闲数
          
          for (var i=0;i<this.ComInfo.length;i++)
          {
            if (/联通/.test(this.ComInfo[i].gwmSpType)){
                self.unicomUserNum =this.ComInfo[i].count;
                continue;
            }
            if (/电信/.test(this.ComInfo[i].gwmSpType)){
                self.telecomUserNum =this.ComInfo[i].count;
                continue;
            }
          }
          
          // self.unicomUserNum = this.ComInfo[0].count;//联通宽带用户数
          // self.telecomUserNum = this.ComInfo[1].count;//电信宽带用户数

      }else{

      }

    }

}
</script>

<style lang="scss" scoped>
    .rootNode{
        .divInfo {
            padding: 10px;
        }
        .h59{
          height: 3.6875rem /* 59/16 */;
        }
        // .rowh{
        //   // height: 100%;
        // }
        .box-card {
            text-align: center;
            width: 90%;
            margin: auto;
            // height: 300px;
            
        }
        .divText{
          font-size: 35px;
        }
        span{
            font-size: 20px;
          }
        .textColor1{
          color: #B09AFF;
        }
        .textColor2{ 
          color: #FBB298;
        }
        .textColor3{
          color: #FE8977;          
        }
        img{
          width:80%;
          height:80%;
        }
        >>>.el-card__header{
          padding: 0px;
        }
        .divh{
          height: 30px;
        }
        .titlespan{
          margin: 10px;
        }
        .bgcolor1{
          background-color: #B09AFF;
        }
        .bgcolor2{
          background-color: #FBB298;
        }
        .bgcolor3{
          background-color: #FE8977;
        }
        

    }
</style>