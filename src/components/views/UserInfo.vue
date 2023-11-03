<template>
  <div class="list">
    <Row>
      <Col>
        <Card>
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            积分明细
            <Icon type="pin" @click.native="fixedHeader=!fixedHeader"></Icon>
          </p>
          <a href="#" slot="extra" @click.prevent="refresh">
            <Icon type="ios-loop-strong"></Icon>
          </a>
          <Table
            :show-header="showHeader"
            :height="fixedHeader ? 300 : ''"
            :size="tableSize"
            :data="listData"
            :columns="columns1"
          ></Table>
          <Page
            :total="100"
            show-sizer
            show-elevator
            @on-change="pageChange"
            style="margin-top: 10px"
            @on-page-size-change="PageSizeChange"
          ></Page>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'list',
  components: {},
  data () {
    return {
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
          type: 'Platform 1'
        },
        {
          createdAt: '2023-10-03',
          desc: 'Some description 2',
          what: '笔芯*10',
          type: 'Platform 2'
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
}
</script>
