<template>
  <el-form style="width: 400px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="图书名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input v-model="ruleForm.author"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        author: ''
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
        message: '添加成功',
        type: 'success'
      });
    },
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm)
          axios.post('http://localhost:8181/book/save',this.ruleForm).then(function(resp){
            // console.log(resp)
            if(resp.data == 'success'){
              // alert('success')
              _this.successMessage();
              _this.resetForm('ruleForm');
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>