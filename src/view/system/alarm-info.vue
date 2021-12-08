<style lang="less">
@import "./common.less";
</style>
<template>
  <div class="layout">
     <Layout>
        <Content :style="{margin: '10px 0 0', background: '#fff', minHeight: '500px'}">
        <Row class="row-style">
          <Button icon="md-download" :loading="exportLoading" @click="exportExcel">导出文件</Button>
        </Row>
        <day-select @change_select="get_select_alarm_info"></day-select>
    <Card>
        <Table size="small"
               :columns="columns"
               :data="data">
        </Table>
        <br>
        <Page :total="count"
              :page_size='page_size'
              @on-change="get_alarm_info_parameter"
              show-elevator
              show-total />
    </Card>
            </Content>
     </Layout>
  </div>
</template>

<script>
import { getAlarmInfo, getExportAlarmInfo } from '@/api/system'
import { hasOneOf, formatDate } from '@/libs/tools'
import excel from '@/libs/excel'
import { Button, Table, Modal, Message, Tag } from 'iview'

import daySelect from '_c/content'
export default {
  components:{
    // 增加日期选择器
    daySelect
  },
  data () {
    return {
      show: false,
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '标签',
          key: 'tags',
          width: 80
        },
        {
          title: '告警名称',
          key: 'alarm_type',
          width: 150
        },
        {
          title: '服务地址',
          key: 'url',
          width: 120
        },
        {
          title: '告警内容',
          key: 'alarm_content',
          width: 400
        },
        {
          title: '告警时间',
          key: 'alarm_time',
          width: 140,
          sortable: true,
          render: (h, params) => {
            return h('div', formatDate(new Date(params.row.alarm_time), 'yyyy-MM-dd hh:mm')
            )
          }
        }
      ],
      data: [],
      count: 0,
      page_size: 10,
      create: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      updateId: null,
      //新增导入文件
      exportLoading: false,
      exportData:null,

    }
  },
  computed: {
    access () {
      return this.$store.state.user.access
    }
  },
  created () {
    this.get_alarm_info()
    this.get_export_alarm_info()
  },
  methods: {
    get_alarm_info (parameter) {
      console.log('parameter的值是：',parameter);
      getAlarmInfo(parameter).then(res => {
        // for (let i = 0; i < res.data.results.length; i++) {
        //   // console.log('遍历每一个：', res.data.results[i]);
        //   // res.data.results[i].alarm_time = res.data.results[i].alarm_time.replace('T', ' ')
        //   let new_date = new Date(res.data.results[i].alarm_time.replace('T', ' '))
        //   // console.log('新日期格式为:', new_date)
        //   new_date = formatDate(new_date, 'yyyy-MM-dd hh:mm:ss')
        //   // console.log('新日期格式为___:', new_date)
        //   res.data.results[i].alarm_time = new_date
        // }
        this.data = res.data.results
        this.count = res.data.count
        // console.log('hello!!!');
        console.log('获取到的data数据是', this.data)
      }).catch(err => {
        this.$Message.error(`获取告警信息错误 ${err}`)
      })
    },
    get_alarm_info_parameter (parameter) {
      console.log('get_alarm_info_parameter:', parameter)
      this.get_alarm_info(`page=${parameter}`)
    },
    // 新增导入表格
    exportExcel () {
      if (this.exportData.length) {
        this.exportLoading = true
        const params = {
          title: ['标签', '告警名称', '服务地址', '告警内容', '告警时间'],
          key: ['tags', 'alarm_type', 'url', 'alarm_content', 'alarm_time'],
          data: this.exportData,
          autoWidth: true,
          filename: '告警信息'
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('表格数据不能为空！')
      }
    },
    get_export_alarm_info(){
      getExportAlarmInfo().then(res => {
        console.log('getExportAlarmInfo res的值是：', res);
        this.exportData = res.data;
      })
    },
    get_select_alarm_info(val){
      console.log('收到来自子组件的信息:', val);
      getExportAlarmInfo(`day=${val}`).then(res => {
        console.log('getExportAlarmInfo res的值是：', res);
        this.exportData = res.data;
      })
    }
  },
}
</script>
<style scoped>
/*.demo-drawer-footer {*/
/*  width: 100%;*/
/*  position: absolute;*/
/*  bottom: 0;*/
/*  left: 0;*/
/*  border-top: 1px solid #e8e8e8;*/
/*  padding: 10px 16px;*/
/*  text-align: right;*/
/*  background: #fff;*/
/*}*/
/*.ivu-table .demo-table-info-cell-danger {*/
/*  background-color: #d40f35;*/
/*  color: #fff;*/
/*}*/
/*.ivu-table .demo-table-info-cell-mormal {*/
/*  background-color: #22d489;*/
/*  color: #fff;*/
/*}*/
.row-style {
  float: left;
  padding: 0 5px 0 0;
}
</style>
