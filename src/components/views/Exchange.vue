<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Exchange',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        picture: '',
        price: '',
        des: '',
        date: '',
        category: {
          id: '',
          name: ''
        }
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    clear () {
      this.form = {
        id: '',
        name: '',
        picture: '',
        price: '',
        des: '',
        date: '',
        category: {
          id: '',
          name: ''
        }
      }
    },
    onSubmit () {
      this.$axios
        .post('/commodities', {
          id: this.form.id,
          name: this.form.name,
          picture: this.form.picture,
          price: this.form.price,
          des: this.form.des,
          date: this.form.date,
          category: this.form.category
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          }
        })
    }
  }
})
</script>

<template>
  <div>
    <el-dialog
      title="物品兑换"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" prop="picture">
          <el-input v-model="form.picture" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth" prop="cid">
          <el-select v-model="form.category.id" placeholder="请选择分类">
            <el-option label="食品" value="1"></el-option>
            <el-option label="百货" value="2"></el-option>
            <el-option label="蔬果" value="3"></el-option>
            <el-option label="服饰" value="4"></el-option>
            <el-option label="电器" value="5"></el-option>
            <el-option label="其他" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="des">
          <el-input type="textarea" v-model="form.des" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上架日期" :label-width="formLabelWidth" prop="date">
          <el-input v-model="form.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.el-icon-circle-plus-outline {
  margin: 50px 0 0 20px;
  font-size: 100px;
  float: left;
  cursor: pointer;
}
</style>
