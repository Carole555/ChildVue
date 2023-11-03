<template>
  <div>
    <el-row style="height: 730px;">
      <el-tooltip effect="dark" placement="right"
                  v-for="item in currentPageItems"
                  :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.name}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.price}}积分</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.des}}</p>
        <el-card style="width: calc(100% / 6 - 20px);margin-bottom: 20px;height: 225px;float: left;margin-right: 15px" class="commodity"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="picture" @click="exchange(item)">
            <img :src="item.picture" alt="图片" style="width: 160px; height: 160px;">
          </div>
          <div class="info">
            <div class="name">
              <a href="">{{item.name}}</a>
            </div>
          </div>
          <div class="price">{{item.price}}积分</div>
        </el-card>
      </el-tooltip>
      <exchange @onSubmit="loadCommodities()" ref="edit"></exchange>
    </el-row>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="commodities.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import Exchange from './Exchange'
export default defineComponent({
  name: 'Commodities',
  components: {Exchange},
  data () {
    return {
      commodities: [
        { id: 1, name: '商品1', price: 100, des: '商品1描述', picture: '/static/img/fullstack.jpg' },
        { id: 2, name: '商品2', price: 200, des: '商品2描述', picture: '/static/img/fullstack.jpg' },
        { id: 3, name: '商品3', price: 300, des: '商品3描述', picture: '/static/img/fullstack.jpg' },
        { id: 1, name: '商品1', price: 100, des: '商品1描述', picture: '/static/img/fullstack.jpg' },
        { id: 2, name: '商品2', price: 200, des: '商品2描述', picture: '/static/img/fullstack.jpg' },
        { id: 3, name: '商品3', price: 300, des: '商品3描述', picture: '/static/img/fullstack.jpg' },
        { id: 1, name: '商品1', price: 100, des: '商品1描述', picture: '/static/img/fullstack.jpg' },
        { id: 2, name: '商品2', price: 200, des: '商品2描述', picture: '/static/img/fullstack.jpg' },
        { id: 3, name: '商品3', price: 300, des: '商品3描述', picture: '/static/img/fullstack.jpg' },
        { id: 1, name: '商品1', price: 100, des: '商品1描述', picture: '/static/img/fullstack.jpg' },
        { id: 2, name: '商品2', price: 200, des: '商品2描述', picture: '/static/img/fullstack.jpg' },
        { id: 3, name: '商品3', price: 300, des: '商品3描述', picture: '/static/img/fullstack.jpg' },
        { id: 1, name: '商品1', price: 100, des: '商品1描述', picture: '/static/img/fullstack.jpg' },
        { id: 2, name: '商品2', price: 200, des: '商品2描述', picture: '/static/img/fullstack.jpg' },
        { id: 3, name: '商品3', price: 300, des: '商品3描述', picture: '/static/img/fullstack.jpg' },
        { id: 1, name: '商品1', price: 100, des: '商品1描述', picture: '/static/img/fullstack.jpg' },
        { id: 2, name: '商品2', price: 200, des: '商品2描述', picture: '/static/img/fullstack.jpg' },
        { id: 3, name: '商品3', price: 300, des: '商品3描述', picture: '/static/img/fullstack.jpg' },
        { id: 1, name: '商品1', price: 100, des: '商品1描述', picture: '/static/img/fullstack.jpg' },
        { id: 2, name: '商品2', price: 200, des: '商品2描述', picture: '/static/img/fullstack.jpg' },
        { id: 3, name: '商品3', price: 300, des: '商品3描述', picture: '/static/img/fullstack.jpg' },
        { id: 1, name: '商品1', price: 100, des: '商品1描述', picture: '/static/img/fullstack.jpg' },
        { id: 2, name: '商品2', price: 200, des: '商品2描述', picture: '/static/img/fullstack.jpg' },
        { id: 3, name: '商品3', price: 300, des: '商品3描述', picture: '/static/img/fullstack.jpg' },
        { id: 1, name: '商品1', price: 100, des: '商品1描述', picture: '/static/img/fullstack.jpg' },
        { id: 2, name: '商品2', price: 200, des: '商品2描述', picture: '/static/img/fullstack.jpg' },
        { id: 3, name: '商品3', price: 300, des: '商品3描述', picture: '/static/img/fullstack.jpg' },
        { id: 1, name: '商品1', price: 100, des: '商品1描述', picture: '/static/img/fullstack.jpg' },
        { id: 2, name: '商品2', price: 200, des: '商品2描述', picture: '/static/img/fullstack.jpg' },
        { id: 3, name: '商品3', price: 300, des: '商品3描述', picture: '/static/img/fullstack.jpg' }
        // 添加更多的商品对象
      ],
      currentPage: 1,
      pageSize: 18
    }
  },
  computed: {
    currentPageItems () {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.commodities.slice(startIndex, endIndex)
    }
  },
  mounted: function () {
    this.loadCommodities()
  },
  methods: {
    loadCommodities () {
      var _this = this
      this.$axios.get('/commodities').then(resp => {
        if (resp && resp.status === 200) {
          _this.commodities = resp.data
        }
      })
    },
    handleCurrentChange (page) {
      this.currentPage = page
    },
    exchange (item) {
      this.$refs.edit.dialogFormVisible = true
    }
  }
})
</script>

<style scoped>

.commodity {
  width: 150px;
  height: 250px;
  /* Add other styles as needed */
}

.name {
  font-size: 14px;
  text-align: left;
}

.price {
  color: #333;
  width: 102px;
  font-size: 13px;
  margin-bottom: 6px;
  text-align: left;
}

.abstract {
  display: block;
  line-height: 17px;
}

a {
  text-decoration: none;
}

a:link, a:visited, a:focus {
  color: #3377aa;
}
</style>
