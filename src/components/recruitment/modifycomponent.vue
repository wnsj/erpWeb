<template>
    <div class="modify">
        <h3>商铺修改</h3>
        <div style="margin-top: 20px;">
            <el-form :label-position="labelPosition" label-width="80px" :model="form">
            <el-form-item label="店铺名称">
            <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
            <el-input v-model="form.adress"></el-input>
            </el-form-item>
            <el-form-item label="店铺介绍">
            <el-input v-model="form.type"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
            <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="店铺分类">
            <el-cascader :options="options">
            <template slot-scope="{ node, data }">
           <span>{{ data.label }}</span>
             <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
          </template>
          </el-cascader>
           </el-form-item>
           <el-form-item label="上传头像">
            <el-upload
             class="avatar-uploader"
             action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus "></i>
           </el-upload>
            </el-form-item>

              <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
             </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        
        form: {
          name: '',
          tel: '',
          slogan: '',
          intro: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
         num1: 2,
         num2: 20,
        options: [{
          value: 'yiguoliaoli',
          label: '异国料理',
         
        }, {
          value: 'kuaicanbiandang',
          label: '快餐便当',
          
        }, {
          value: 'guoshushengxian',
          label: '果蔬生鲜',
          
        }]
      }
    },
    methods: {
      
    }
    
}
</script>

<style lang="scss" scoped>

</style>


