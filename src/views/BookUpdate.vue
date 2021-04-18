<template>
  <el-form style="width: 400px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="图书编号">
      <el-input v-model="ruleForm.id" readonly></el-input>
    </el-form-item>
    <el-form-item label="图书名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input v-model="ruleForm.author"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {


    return {
      BackUp: {
        nameBack: null,
        authorBack: null
      },
      ruleForm: {
        id: null,
        name: null,
        author: null
      },
      rules: {
        name: [
          { required: true, message: '请输入图书名称', trigger: 'blur' },
        ],
        author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' }
        ]
      }

    };
  },
  methods: {
    successMessage() {
      this.$notify({
        title: '成功',
        message: '修改成功',
        type: 'success'
      });
    },
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm)
          axios.put('http://localhost:8181/book/update',this.ruleForm).then(function(resp){
            // console.log(resp)
            if(resp.data == 'success'){
              // alert('success')
              _this.successMessage()
              _this.$router.push({
                path: '/BookManage'
              })
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm() {
      // this.$refs[formName].resetFields();
      // this.ruleForm = this.BackUp
      this.ruleForm.author = this.BackUp.authorBack
      this.ruleForm.name = this.BackUp.nameBack
      // console.log(this.BackUp)
    }
  },
  created() {
    // this.$route.query.id
    const _this = this
    axios.get('http://localhost:8181/book/findById/'+this.$route.query.id).then(function(resp){
      _this.ruleForm = resp.data
      _this.BackUp.authorBack = resp.data.author
      _this.BackUp.nameBack = resp.data.name
      // console.log(resp.data)
      // console.log(_this.BackUp)
    })
  }
}
</script>