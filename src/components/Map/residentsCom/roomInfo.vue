<template>
  <div class="roomBox">
    <div :class="{ 'right-top': true, divcolor: isActive }">{{ operator }}</div>
    <div class="roomNum">{{ roomInfo.roomName }}</div>
    <el-row class="row">
      <el-col :span="8">
        <img
          class="image"
          :src="require('@/assets/images/room/' + imgsrckd + '.png')"
        />
      </el-col>
      <el-col :span="8">
        <img
          class="image"
          :src="require('@/assets/images/room/' + imgsrctv + '.png')"
        />
      </el-col>
      <el-col :span="8">
        <img
          class="image"
          :src="require('@/assets/images/room/' + imgsrcp + '.png')"
        />
      </el-col>
    </el-row>
    <el-divider class="divider"></el-divider>
    <el-popover placement="right" width="200" ref="popover1" trigger="click">
      <el-row>
        <el-col :span="24"
          >姓名 &nbsp;:&nbsp;{{
            gwmUsername == null
              ? "-"
              : gwmUsername
          }}
        </el-col>
        <el-col :span="24"
          >电话 &nbsp;:&nbsp;{{
            gwmPhone == null
              ? "-"
              : gwmPhone
          }}</el-col>
        <el-col :span="24"
          >是否有老人 &nbsp;:&nbsp;{{
            gwmHasold == null
              ? "-"
              : gwmHasold
          }}</el-col>
        <el-col :span="24"
          >是否有儿童 &nbsp;:&nbsp;{{
            gwmHaschilds == null
              ? "-"
              : gwmHaschilds
          }}</el-col>
        <el-col :span="24"
          >是否办理宽带 &nbsp;:&nbsp;{{
            gwmHasnet == null
              ? "-"
              : gwmHasnet
          }}</el-col>
        <el-col :span="24"
          >宽带到期时间 &nbsp;:&nbsp;{{
            gwmExpdate == null
              ? "-"
              : gwmExpdate
          }}</el-col>
        <el-col :span="24"
          >是否是电视用户 &nbsp;:&nbsp;{{
            gwmHastv == null
              ? "-"
              : gwmHastv
          }}</el-col>
        <el-col :span="24"
          >家庭成员数 &nbsp;:&nbsp;{{
            gwmHomePeople == null
              ? "-"
              : gwmHomePeople
          }}</el-col>
      </el-row>
      <!-- <el-button v-if="!visible" type="text" slot="reference" class="alignRight" @click="btnClik(roomInfo.roomEid)"
      >详情</el-button>
       <el-button v-if="visible" type="text" slot="reference" class="alignRight" @click="visible =false"
      >详情</el-button> -->
      
    </el-popover>
    <el-button  type="text" v-popover:popover1 :class="{ 'alignRight': true, btnColor: roomInfo.roomEid ? false:true }" :disabled="roomInfo.roomEid ? false:true" @click="btnClik(roomInfo.roomEid)"
      >详情</el-button>
  </div>
</template>

<script>
import * as configUrl from "@/assets/js/config.js";
export default {
  name: "roomInfo", //房间信息
  data() {
    return {
      isActive: false,
      imgsrckd: "broadbandLight",
      imgsrctv: "TVLight",
      imgsrcp: "phoneLight",
      gwmUsername:'',
      gwmPhone:'',
      gwmHasold:'',   
      gwmHaschilds:'',
      gwmHasnet:'',
      gwmExpdate:'',   
      gwmHastv:'',
      gwmHomePeople:'',
      visible:false,
      operator:'1'
    };
  },
  methods:{
    btnClik(id){
      
      let url = configUrl.api.getCustomerByeId + `/${id}`;
      let self = this;
      let param = {};
      this.postAxios(url, param)
        .then((result) => {
          if (result.data.length > 0) {
            let customerInfo = result.data[0];
            self.gwmUsername  = customerInfo.gwmUsername;
            self.gwmPhone = customerInfo.gwmPhone;
            self.gwmHasold = customerInfo.gwmHasold;
            self.gwmHaschilds  = customerInfo.gwmHaschilds;
            self.gwmHasnet = customerInfo.gwmHasnet;
            self.gwmExpdate = customerInfo.gwmExpdate;
            self.gwmHastv = customerInfo.gwmHastv;
            self.gwmHomePeople = customerInfo.gwmHomePeople;
          } 
        })
        .catch((err) => {
          console.log(err);
        });
      
    }
  },
  props: {
    roomInfo: {
      type: Object,
    },
  },
  created() {
    
    //判断是否有固话
    if (this.roomInfo.customer[0].gwmHastelephone === "是") {
      this.imgsrcp = "phoneLight";
    } else {
      this.imgsrcp = "phone";
    }
    //判断是否有宽带
    if (this.roomInfo.customer[0].gwmHasnet === "是") {
      this.imgsrckd = "broadbandLight";
    } else {
      this.imgsrckd = "broadband";
    }
    //判断是否有Tv
    if (this.roomInfo.customer[0].gwmHastv === "是") {
      this.imgsrctv = "TVLight";
    } else {
      this.imgsrctv = "TV";
    }
    //判断运营商
    //#region   old 后面可能会用
    // if (this.roomInfo.customer[0].gwmHasnet === "是") {
    //   this.isActive = true;
    //   if (/电信|移动|联通/.test(this.roomInfo.customer[0].gwmSptype)) {
    //     if (/电信/.test(this.roomInfo.customer[0].gwmSptype)) {
    //       this.operator = "电信";
    //     }
    //     if (/移动/.test(this.roomInfo.customer[0].gwmSptype)) {
    //       this.operator = "移动";
    //     }
    //     if (/联通/.test(this.roomInfo.customer[0].gwmSptype)) {
    //       this.operator = "联通";
    //     }
    //   } else {
    //     this.operator = "其他";
    //   }
    // } else {
    //   this.operator = "未装";
    // }
    //#endregion
    this.operator = this.roomInfo.customer[0].OperatorType;
    if(this.operator !=='未装'){
      this.isActive = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.roomBox {
  width: 80px;
  height: 100px;
  border: 1px solid rgba(0, 140, 255, 0.959);
  position: relative;
  .right-top {
    position: absolute;
    width: 35px;
    right: 0px;
    top: 0px;
    text-align: center;
    background-color: #d3d3d3;
  }
  .divcolor {
    background-color: #0e2c93;
    color: white;
  }
  .btnColor {
    color: #696969;
  }
  .roomNum {
    padding-top: 20px;
    text-align: center;
    font-size: large;
    color: #9f3b20;
  }
  .row {
    padding-top: 5px;
    text-align: center;
  }
  .alignRight {
    float: right;
    padding: 5px 5px 0 0;
  }
  .divider {
    margin: 0px;
  }
  .image {
    width: 20px;
  }
}
</style>