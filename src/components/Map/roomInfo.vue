<template>
  <div class="roomBox">
      <div class="right-top">移动</div>
      <div class="roomNum">{{123 + num}}室</div>
      <el-row class="row">
          <el-col :span="8">
              <img class ="image" :src="require('../../assets/images/room/'+imgsrckd+'.png')">
          </el-col>
          <el-col :span="8">
              <img class ="image" :src="require('../../assets/images/room/'+imgsrctv+'.png')">
          </el-col>
          <el-col :span="8">
              <img class ="image" :src="require('../../assets/images/room/'+imgsrcp+'.png')">
          </el-col>
      </el-row>
      <div class="alignRight">
          <el-divider class="divider"></el-divider>
          <el-link type="primary" class="link">详情 &nbsp;</el-link>
      </div>
      
  </div>
</template>

<script>
export default {
    name: 'roomInfo', //房间信息
    data(){
        return {
            isActive: true,
            imgsrckd:'broadbandLight',
            imgsrctv:'TVLight',
            imgsrcp:'phoneLight',
        }
        
    },
    props:{
        num :{
            type:Number
        }
    }
}
</script>

<style lang="scss" scoped>
.roomBox{
    // width: 100px;
    height:120px;
    border: 1px solid rgba(0, 140, 255, 0.959);
    position: relative;
    .right-top{
        position: absolute;
        width: 35px;
        right: 0px;
        top: 0px;
        text-align:center;
        background-color: #0E2C93;
        color: white;
        
    }
    .roomNum{
        padding-top: 30px;
        text-align:center; 
        font-size: large;
        color: #9F3B20;
    }
    .row{
        padding-top: 15px;
        text-align:center;
        
    }
    .alignRight{
        text-align:right;
    }
    .divider{
        margin:2px 0px 2px 0px;
    }
    .activekd{
        background: url("../../assets/images/room/broadbandLight.png");

    }
    .disActivekd{
        background: url("../../assets/images/room/broadband.png");
    }
    .activetv{
        background: url("../../assets/images/room/TVLight.png");
    }
    .disActivetv{
        background: url("../../assets/images/room/TV.png");
    }
    .activep{
        background: url("../../assets/images/room/phoneLight.png");
    }
    .disActivep{
        background: url("../../assets/images/room/phone.png");
    }
    .image{
        width: 20px;
    }
}

</style>