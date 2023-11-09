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
      <Card>
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
      <Card style="height: 320px">
        <p slot="title">
          10个已经完成，2个待完成，1个正在进行中
        </p>
        <a href="#" slot="extra" @click.prevent="refresh">
          <Icon type="ios-loop-strong"></Icon>
        </a>
<!--        <Steps :current="2" direction="vertical" size="small">-->
<!--          <Step title="已完成" content="这里是该步骤的描述信息"></Step>-->
<!--          <Step title="已完成" content="这里是该步骤的描述信息"></Step>-->
<!--          <Step title="进行中" content="这里是该步骤的描述信息"></Step>-->
<!--          <Step title="待进行" content="这里是该步骤的描述信息"></Step>-->
<!--        </Steps>-->
        <el-calendar v-model="value" class="custom-calendar"></el-calendar>
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
  import {getUser} from '../../common/utils'
  export default {
    props: ['childId'],
    propsdata: ['hasChild'],
    mounted () {
      const childId = this.$route.query.childId
      const hasChild = this.$route.query.hasChild
      console.log('Child ID:', childId)
      console.log('haschild', hasChild)
    },
    name: 'index',
    components: {IEcharts},
    data () {
      return {
        value: new Date(),
        childScore: getUser().score,
        childId: null, // 初始化 childId 为 null 或合适的初始值
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
            name: 'Sales',
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
.custom-calendar {
  width: 370px;
  height: 10px!important;
}
.custom-calendar table {
  width: 80%; /* 设置表格宽度为80% */
  height: 10%;
}
.is-selected {
  color: #1989FA;
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
</style>
