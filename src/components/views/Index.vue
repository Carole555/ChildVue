<template>
  <div class="index">
    <Row :gutter="8">
      <Col :md='{span:8}'>
      <Row>
        <Col span="12" v-for="(item,index) in cardMessage" :key="index" class="cardMessage"  style="padding: 0">
        <Card>
          <Row>
            <Col span="8">
            <Icon :type="item.icon"></Icon>
            </Col>
            <Col span="16">
            <p class="subText">{{item.name}}</p>
            <h3>{{item.count}}</h3>
            </Col>
          </Row>
        </Card>
        </Col>
      </Row>
      </Col>
      <Col :md='{span:16}'>
      <Card style="height: 150px">
        <p slot="title">
          每日之星
        </p>
        <a href="#" slot="extra" @click.prevent="refresh">
          <Icon type="ios-loop-strong"></Icon>
        </a>
        <Rate show-text v-model="valueText" :disabled="true">
          <span style="color: #f5a623">{{ valueCustomText }}</span>
        </Rate>
        <p>
          学而不思则罔，思而不学则殆。----孔子
        </p>
      </Card>
      </Col>
    </Row>

    <Row :gutter="8">
      <Col :md='{span:8}'>
      <Card style="height: 315px">
        <p slot="title">
          {{num.pendingTasks}}个待批改，{{num.notPassedTasks}}个未通过，{{num.passedTasks}}个已通过
        </p>
        <a href="#" slot="extra" @click.prevent="refresh">
          <Icon type="ios-loop-strong"></Icon>
        </a>
        <div class="block">
          <el-carousel height="162px">
              <el-carousel-item v-for="(image, index) in imageList" :key="index">
                <img :src="image.url" :alt="image.alt" class="carousel-image">
              </el-carousel-item>
          </el-carousel>
        </div>
      </Card>
      </Col>
      <Col :md='{span:16}'>
        <div class="list">
        <Row>
          <Col>
            <Card>
              <div class="echarts">
                <IEcharts :option="bar" @ready="onReady" @click="onClick" :resizable="true"></IEcharts>
              </div>
            </Card>
          </Col>
        </Row>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import IEcharts from 'vue-echarts-v3/src/full.js'
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import {getUser} from '../../common/utils'
  export default {
    props: ['childId'],
    propsdata: ['hasChild'],
    mounted () {
      const childId = this.$route.query.childId
      const hasChild = this.$route.query.hasChild
      console.log('Child ID:', childId)
      console.log('haschild', hasChild)
      this.getNum()
    },
    name: 'index',
    components: {IEcharts},
    data () {
      return {
        imageList: [
          { url: '/static/img/1.png', alt: 'Image 1' },
          { url: '/static/img/2.png', alt: 'Image 2' },
          { url: '/static/img/3.png', alt: 'Image 3' },
          { url: '/static/img/4.png', alt: 'Image 4' }
        ],
        num: null,
        childId: null, // 初始化 childId 为 null 或合适的初始值
        childScore: getUser().score,
        params: {
          page: 1,
          limit: 10
        },
        valueText: 5,
        valueCustomText: '王小明',
        cardMessage: [
          {
            icon: 'ios-cart',
            name: '购置物品',
            count: '344'
          },
          {
            icon: 'ios-star',
            name: '拥有积分',
            count: getUser().score
          },
          {
            icon: 'ios-email',
            name: '未读邮件',
            count: '23'
          },
          {
            icon: 'ios-book',
            name: '学习任务',
            count: '12'
          }
        ],
        bar: {
          title: {
            text: '学习任务'
          },
          tooltip: {},
          xAxis: {
            data: ['10.3', '10.4', '10.5', '10.6', '10.7', '10.8']
          },
          yAxis: {},
          series: [{
            name: '详情',
            type: 'bar',
            data: [5, 2, 3, 4, 3, 3]
          }]
        }
      }
    },
    computed: {},
    methods: {
      /**
       * 刷新页面请求
       * */
      getNum () {
        const childId = getUser().id
        console.log(childId)
        axios.get(`http://localhost:8080/children/task-child/count/${childId}`, {})
          .then(response => {
            this.loading = false
            if (response.data.success) {
              this.$Message.success('成功!')
              Cookies.set('token', response.data.token)
              this.num = response.data.data
              console.log(this.num)
            } else {
              this.$Message.error('失败!')
            }
          })
          .catch(error => {
            this.loading = false
            console.error('失败:', error)
          })
      },
      getData () {
        const childId = this.childId // 获取 childId 值
        const hasChild = this.hasChild
        // 确保 childId 的值有效
        if (childId === null || childId === undefined) {
          console.error('childId 无效')
          return
        }
        if (hasChild === null || hasChild === undefined) {
          console.error('child 无效')
          return
        }
      },
      refresh () {

      }
    },
    created () {

    }
  }
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
  .cardMessage {
    .ivu-icon {
      font-size: 38px;
    }
    .subText {
      color: #9ea7b4;
    }
  }
  .echarts {
    height: 280px;
  }
.carousel-image {
  width: 368px; /* 设置宽度为100% */
  height: 162px; /* 自动计算高度，保持原始比例 */
}
</style>
