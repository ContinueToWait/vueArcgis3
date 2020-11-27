<template>
  <div class="mainBox">
      <div class="title"><img src="./../../assets/images/comm/jt.png" class="titImg">top3排名</div>
        <el-table :data="tableData" style="width: 100%">
          <!-- <el-table-column align="center" width="50" type="index"  label="排名">
            <template slot-scope="scope">
                <span v-if="scope.$index+1 ==1" class="no1">{{scope.$index+1}}</span>
                <span v-else-if="scope.$index+1 ==2" class="no2">{{scope.$index+1}} </span>
                <span v-else-if="scope.$index+1 ==3" class="no3">{{scope.$index+1}} </span>
                <span v-else class="no">{{scope.$index+1}} </span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="name" label="姓名"></el-table-column>
          <el-table-column align="center" prop="count" label="数量"></el-table-column>
        </el-table>
  </div>
</template>
<script>
export default {
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
    width:100%;
    height: 100%;
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
}
</style>