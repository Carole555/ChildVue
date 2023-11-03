<template>
  <el-container>
    <el-main>
      <commodities class="commodities-area" ref="commoditiesArea"></commodities>
    </el-main>
  </el-container>
</template>
<script>
import {defineComponent} from 'vue'
import Commodities from './Commodities.vue'

export default defineComponent({
  name: 'AppCommodity',
  components: {Commodities}
})
</script>
<style lang="less" scoped>
  .search-filter {
    opacity: 0;
    display: none;
    overflow: hidden;
    transition: all 0.28s ease-out;
    &.active {
      opacity: 1;
      display: block;
    }
  }
</style>

