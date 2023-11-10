<template>
  <div class="index">
    <Row :gutter="8">
      <Col :md='{span:8}'>
      <Row>
        <Col span="12" v-for="(item,index) in cardMessage" :key="index" class="cardMessage"  style="padding: 0">
        <Card>
          <Row>
            <Col span="8">
<!--            <Icon :type="item.icon"></Icon>-->
              <img :src="item.icon" class="image" />
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
          {{pendingTasks}}个待批改，{{notPassedTasks}}个未通过，{{passedTasks}}个已通过
        </p>
        <a href="#" slot="extra" @click.prevent="refresh">
          <Icon type="ios-loop-strong"></Icon>
        </a>
        <div class="block">
          <el-carousel height="200px">
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
    shoppingNum: null,
    tasknum: null,
    callNum: null,
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
        notPassedTasks: '',
        passedTasks: '',
        pendingTasks: '',
        imageList: [
          { url: '/static/img/1.png', alt: 'Image 1' },
          { url: '/static/img/2.png', alt: 'Image 2' },
          { url: '/static/img/3.png', alt: 'Image 3' },
          { url: '/static/img/4.png', alt: 'Image 4' }
        ],
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
            icon: '/static/img/shoppingBag.png',
            name: '兑换物品',
            count: this.shoppingNum
          },
          {
            icon: '/static/img/star.png',
            name: '拥有积分',
            count: getUser().score
          },
          {
            icon: '/static/img/phone.png',
            name: '视频通话',
            count: this.callNum
          },
          {
            icon: '/static/img/task.png',
            name: '学习任务',
            count: this.tasknum
          }
        ],
        bar: {
          title: {
            text: '学习任务'
          },
          tooltip: {},
          xAxis: {
            data: ['11.7', '11.8', '11.9', '11.10', '11.11', '11.12']
          },
          yAxis: {},
          series: [{
            name: '详情',
            type: 'bar',
            data: [5, 2, 3, 4, 3, 1]
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
              Cookies.set('token', response.data.token)
              this.num = response.data.data
              this.notPassedTasks = response.data.data.notPassedTasks
              this.passedTasks = response.data.data.passedTasks
              this.pendingTasks = response.data.data.pendingTasks
              console.log(this.num)
            } else {
              this.$Message.error('失败!')
            }
          })
          .catch(error => {
            this.loading = false
            console.error('失败:', error)
          })
        axios.get(`http://localhost:8080/children/purchase/purchaseSubjectRecode/${childId}`, {})
          .then(newresponse => {
            this.loading = false
            if (newresponse.data.success) {
              Cookies.set('token', newresponse.data.data)
              this.num = newresponse.data.data
              this.notPassedTasks = newresponse.data.data.notPassedTasks
              this.passedTasks = newresponse.data.data.passedTasks
              this.pendingTasks = newresponse.data.data.pendingTasks
              console.log(this.num)
            } else {
              this.$Message.error('失败!')
            }
          })
          .catch(error => {
            this.loading = false
            console.error('失败:', error)
          })
        axios.get(`http://localhost:8080/children/purchase/purchaseSubjectRecode/${childId}`, {})
          .then(newresponse => {
            this.loading = false
            if (newresponse.data.success) {
              Cookies.set('token', newresponse.data.data)
              this.shoppingNum = newresponse.data.data
              console.log('shoppingNum为：', this.shoppingNum)
              console.log('购置商品查询成功')
              this.cardMessage[0].count = this.shoppingNum
            } else {
              this.$Message.error('失败!')
            }
          })
          .catch(error => {
            this.loading = false
            console.error('失败:', error)
          })
        axios.get(`http://localhost:8080/children/task-child/viewRemainingTasks/${childId}`, {})
          .then(nresponse => {
            this.loading = false
            if (nresponse.data.success) {
              Cookies.set('token', nresponse.data.data)
              this.tasknum = nresponse.data.data
              console.log(this.tasknum)
              console.log('查询成功')
              this.cardMessage[3].count = this.tasknum
            } else {
              this.$Message.error('失败!')
            }
          })
          .catch(error => {
            this.loading = false
            console.error('失败:', error)
          })
        axios.get(`http://localhost:8080/children/video/getVideoCallNum/${childId}`, {})
          .then(presponse => {
            this.loading = false
            if (presponse.data.success) {
              Cookies.set('token', presponse.data.data)
              this.callNum = presponse.data.data
              console.log(this.callNum)
              console.log('视频通话查询成功')
              this.cardMessage[2].count = this.callNum
            } else {
              this.$Message.error('视频通话次数查询失败!')
            }
          })
          .catch(error => {
            this.loading = false
            console.error('视频通话次数查询失败:', error)
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
  width: 370px; /* 设置宽度为100% */
  height: 200px; /* 自动计算高度，保持原始比例 */
}
.image {
  max-width: 35px; /* 调整图片大小 */
  max-height: 35px; /* 调整图片大小 */
}
</style>
