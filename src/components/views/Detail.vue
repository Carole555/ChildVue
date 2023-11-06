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
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="全部" name="first">
              <Table
                :show-header="showHeader"
                :height="fixedHeader ? 300 : ''"
                :size="tableSize"
                :data="listData"
                :columns="columns1"
              ></Table>
<!--              <Page-->
<!--                :total="100"-->
<!--                @on-change="pageChange"-->
<!--                style="margin-top: 10px"-->
<!--                @on-page-size-change="PageSizeChange"-->
<!--              ></Page>-->
            </el-tab-pane>
            <el-tab-pane label="收入" name="second">
              <Table
                :show-header="showHeader"
                :height="fixedHeader ? 300 : ''"
                :size="tableSize"
                :data="listData"
                :columns="columns1"
              ></Table>
<!--              <Page-->
<!--                :total="100"-->
<!--                @on-change="pageChange"-->
<!--                style="margin-top: 10px"-->
<!--                @on-page-size-change="PageSizeChange"-->
<!--              ></Page>-->
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

export default defineComponent({
  name: 'list',
  components: {},
  data () {
    return {
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
          key: 'createdAt'
        },
        {
          title: '收支',
          key: 'desc'
        },
        {
          title: '详情',
          key: 'what'
        },
        {
          title: '平台',
          key: 'type'
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
    refresh () {
      this.getData(this.params)
    },
    getData (params) {
      // Simulating API response with data
      const responseData = [
        {
          createdAt: '2023-10-01',
          desc: 'Some description 1',
          what: '数学课',
          type: '学习任务'
        },
        {
          createdAt: '2023-10-03',
          desc: 'Some description 2',
          what: '笔芯*10',
          type: '积分商城'
        }
        // Add more data as needed
      ]
      this.listData = responseData
    },
    pageChange (page) {
      this.params.page = page
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    }
  },
  created () {
    this.getData(this.params)
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
