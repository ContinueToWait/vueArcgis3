<template>
  <div class="mainBox">
      <div class="title"><img src="./../../assets/images/comm/jt.png" class="titImg">top10排名</div>
      <vue-seamless-scroll :data="tableData" class="seamless-warp"  :class-option="classOption">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align="center" width="60" type="index"  label="排名">
            <template slot-scope="scope">
                <span v-if="scope.$index+1 ==1" class="no1">{{scope.$index+1}}</span>
                <span v-else-if="scope.$index+1 ==2" class="no2">{{scope.$index+1}} </span>
                <span v-else-if="scope.$index+1 ==3" class="no3">{{scope.$index+1}} </span>
                <span v-else class="no">{{scope.$index+1}} </span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="姓名"></el-table-column>
          <el-table-column align="center" prop="count" label="完成数量(个)"></el-table-column>
        </el-table>
    </vue-seamless-scroll>
  </div>
</template>
<script>
export default {
  computed:{
      classOption() {
        return {
          step: .8, // 数值越大速度滚动越快
          limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
          hoverStop: true, // 是否开启鼠标悬停stop
          direction: 1, // 0向下 1向上 2向左 3向右
          // openWatch: true, // 开启数据实时监控刷新dom
          singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
          singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
          waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
        };
      }
  },
  data() {
    return {
      tableData: [ {
        name: '王娟',
        count: 500
      }, {
        name: '张丽惠',
        count: 289
      },{
        name: '袁余兰',
        count: 135
      }]
    }
  },

  
  mounted() {
  },
  methods: {
   
  },
  created() {

  },
};
</script>
<style  lang="scss" scoped>
.mainBox{
  // .seamless-warp {
    width:100%;
    height: calc(100% - 50px);
    overflow: hidden;
    padding: 10px;
    >>>.el-table{
      position: inherit;
    }
    >>>.el-table, >>>.el-table__expanded-cell{
      background: transparent;
    }
    >>>.el-table, >>>.el-table thead{
      color:#CACCD9;
    }
    >>>.el-table th{
      color:#209af5;
      // background: #101638;
      background: none;
      background: transparent;
    }
    >>>.el-table tr{
      // background: #101638;
      background: none;
      background: transparent;
    }
    >>>.el-table td, >>>.el-table th.is-leaf{
      border-bottom: 1px solid #205488;
    }
    >>>.el-table td, >>>.el-table th{
      padding:.3125rem /* 5/16 */ 0;
    }
    >>>.el-table--enable-row-hover .el-table__body tr:hover>td{
      background-color: #29509A;
      color:#fff;
    }
    >>>.el-table td .cell span{
      display: block;
      width: 1.25rem /* 20/16 */;
      height: 1.25rem /* 20/16 */;
      text-align: center;
      border-radius: .25rem /* 4/16 */;
      color: #fff;
      font-size: .8125rem /* 13/16 */;
      line-height: 1.25rem /* 20/16 */;
    }
    >>>.el-table td .cell .no1{
      background: #FE6A68;
      border: 1px solid #FE6A68;
      margin: auto;
    }
    >>>.el-table td .cell .no2{
      background: #C164FA;
      border: 1px solid #C164FA;
      margin: auto;
    }
    >>>.el-table td .cell .no3{
      background: #6769FC;
      border: 1px solid #6769FC;
      margin: auto;
    }
    >>>.el-table td .cell .no{
      background: #34F696;
      border: 1px solid #34F696;
      margin: auto;
    }

  // }
}
</style>