<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 630px">
      <el-table-column
          fixed
          prop="id"
          label="编号"
          width="80">
      </el-table-column>
      <el-table-column
          prop="name"
          label="书名"
          width="200">
      </el-table-column>
      <el-table-column
          prop="author"
          label="作者"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        page-size="6"
        :total=totalPage
        @current-change="page">
    </el-pagination>

  </div>
</template>

<script>
export default {
  methods: {
    successMessage() {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success'
      });
    },
    edit(row) {
      console.log(row);
      this.$router.push({
        path: '/Update',
        query:{
          id: row.id,
        }
      })
    },
    deleteBook(row){
      const _this = this
      axios.delete("http://localhost:8181/book/deleteById/"+row.id).then(function (resp){
          // alert('success')
          _this.successMessage();
          window.location.reload()
      })
    },
    page(currentPage){
      const _this = this
      axios.get('http://localhost:8181/book/findAll/'+currentPage+'/6').then(function(resp){
        // console.log(resp)
        _this.tableData = resp.data.content
        _this.totalPage = resp.data.totalElements
      })
    }
  },
  created(){
    const _this = this
    axios.get('http://localhost:8181/book/findAll/1/6').then(function(resp){
      // console.log(resp)
      _this.tableData = resp.data.content
      _this.totalPage = resp.data.totalElements
    })
  },

  data() {
    return {
      totalPage: null,
      tableData: null,
    }
  }
}
</script>