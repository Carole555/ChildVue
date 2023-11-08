<template>
  <div class="list">
    <Row>
      <Col>
        <Card>
          <p slot="title">
            积分明细
          </p>
          <a href="#" slot="extra" @click.prevent="refresh">
            <Icon type="ios-loop-strong"></Icon>
          </a>
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="getData">
            <el-tab-pane label="全部" name="first">
              <Table
                :show-header="showHeader"
                :height="fixedHeader ? 300 : ''"
                :size="tableSize"
                :data="listData"
                :columns="columns1"
              ></Table>
            </el-tab-pane>
            <el-tab-pane label="收入" name="second">
              <Table
                :show-header="showHeader"
                :height="fixedHeader ? 300 : ''"
                :size="tableSize"
                :data="listDatatwo"
                :columns="columns2"
              ></Table>
            </el-tab-pane>
            <el-tab-pane label="支出" name="third">
              <Row>
                <template v-for="(card, index) in cardList">
                  <Col :span="12">
                    <Card :body-style="{ padding: '20px', width: '200px', height: '200px', margin: '0 auto' }" class="horizontal-card">
                      <div class="horizontal-card-content">
                        <img :src="card.image" class="image" />
                        <div class="horizontal-card-details">
                          <div class="name">{{ card.name }}</div>
                          <div class="points">{{ card.points }}</div>
                        </div>
                        <div class="logistics">{{ card.logistics }}</div>
                      </div>
                    </Card>
                  </Col>
                  <br v-if="(index + 1) % 2 === 0" /> <!-- 每两个卡片后添加换行 -->
                </template>
              </Row>
            </el-tab-pane>
          </el-tabs>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'list',
  components: {},
  props: ['childId'],
  mounted () {
    const childId = this.$route.query.childId
    console.log('Detail页面Child ID:', childId)
  },
  data () {
    return {
      childId: null, // 用于保存从登陆页面传的childId的属性
      cardList: [
        {
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: 'Yummy hamburger',
          points: '-10 积分',
          logistics: '派送中'
        },
        {
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: 'Delicious fries',
          points: '-8 积分',
          logistics: '未发货'
        },
        {
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: 'Tasty pizza',
          points: '-12 积分',
          logistics: '已发货'
        }
      ],
      showHeader: true,
      fixedHeader: false,
      tableSize: 'small',
      params: {
        page: 1,
        limit: 10
      },
      listData: [], // Data source for the table
      columns1: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '日期',
          key: 'eventTime'
        },
        {
          title: '收支',
          key: 'score'
        },
        {
          title: '详情',
          key: 'eventDetail'
        },
        {
          title: '类型',
          key: 'eventType'
        }
      ]
    }
  },
  watch: {
    params: {
      handler (val) {
        this.getData(val)
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    mounted () {
      // 从登录页面获取childId参数，并赋值给childId属性
      this.childId = this.$route.query.childId
      this.getData(this.childId) // 调用获取积分明细数据的方法
    },
    refresh () {
      this.getData(this.params)
    },
    getData () {
      console.log('调用了 getData 方法')
      const childId = this.$route.query.childId
      console.log('detail页面Child ID:', childId)

      // 确保 childId 的值有效
      if (childId === null || childId === undefined) {
        console.error('childId 无效')
        return
      }
      axios
        .get(`http://localhost:8080/children/score-history/total-list/${childId}`, {})
        .then(response => {
          console.log(response.data.data)
          if (response.data.success) {
            this.$Message.success('查询成功！')
            this.listData = response.data.data // 使用检索到的数据更新 listData
          } else {
            this.$Message.error('登录失败！')
            console.error('登录失败：', response.data)
            this.$Notice.warning({
              title: '登录提示',
              desc: '用户名/密码错误...'
            })
          }
        })
        .catch(error => {
          console.error('登录请求失败：', error)
        })
    }
  }
})
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: block;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
  max-width: 150px; /* 调整图片大小 */
  max-height: 150px; /* 调整图片大小 */
}

.horizontal-card {
  margin-bottom: 20px;
}

.horizontal-card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.horizontal-card-details {
  flex-grow: 1;
  padding: 14px;
  text-align: center; /* 居中对齐文本 */
}

.name {
  font-weight: bold;
  font-size: 16px; /* 调整文字大小 */
  margin-bottom: 8px; /* 调整文字位置 */
}

.points {
  font-size: 14px; /* 调整文字大小 */
  color: #6b778c;
}

.logistics {
  font-size: 12px; /* 调整文字大小 */
  color: #6b778c;
  margin-top: 10px;
}

.horizontal-card + .horizontal-card {
  margin-left: 20px; /* 添加卡片之间的间距 */
}
</style>
