<template>
  <div>
    <el-row style="height: 730px;">
      <el-tooltip effect="dark" placement="right"
                  v-for="item in currentPageItems"
                  :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.name}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.value}}积分</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.content}}</p>
        <el-card style="width: calc(100% / 6 - 20px);margin-bottom: 20px;height: 225px;float: left;margin-right: 15px" class="commodity"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="picture" @click="exchange(item)">
            <img :src="item.subPhoto" alt="图片" style="width: 160px; height: 160px;">
          </div>
          <div class="info">
            <div class="name">
              <a href="">{{item.name}}</a>
            </div>
          </div>
          <div class="price">{{item.value}}积分</div>
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
      commodities: [],
      currentPage: 1,
      pageSize: 18
    }
  },
  mounted: function () {
    this.loadCommodities()
    // const childId = this.$route.query.childId
    // const hasChild = this.$route.query.hasChild
    // console.log('Child ID:123456', childId)
    // console.log('haschild1234', hasChild)
    // this.$router.push({name: 'exchange', query: {hasChild}})
  },
  computed: {
    currentPageItems () {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.commodities.slice(startIndex, endIndex)
    }
  },
  methods: {
    loadCommodities () {
      this.$axios.get('http://localhost:8080/children/subject/viewAllSubject').then(response => {
        if (response.data.code === '666') {
          this.$Message.success('商品检索成功!')
          this.commodities = response.data.data
          console.log(typeof this.commodities)
          console.log(this.commodities)
        } else if (response.data.code === '0') {
          this.$Message.success('商品检索失败!')
        }
      })
    },
    handleCurrentChange (page) {
      this.currentPage = page
    },
    exchange (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        name: item.name,
        subPhoto: item.subPhoto,
        value: item.value,
        content: item.content
      }
    }
    // getImgUrl (subPhoto) {
    //   return `../static/img/${subPhoto}`
    // }
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


</style>
