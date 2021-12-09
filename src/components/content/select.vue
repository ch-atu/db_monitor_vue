<template>
  <Select v-model="model8" clearable style="width:200px" @on-change="change_select">
    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>
<script>
export default {
  data () {
    return {
      cityList: [
        {
          value: '0',
          label: '今天'
        },{
          value: '1',
          label: '昨天'
        },
        {
          value: '7',
          label: '最近一周'
        },
        {
          value: '30',
          label: '最近一个月'
        },{
          value: '365',
          label: '最近一年'
        },
      ],
      model8: ''
    }
  },
  methods:{
    change_select(val){
      console.log(val);
      this.$emit('change_select', val)
    }
  }
}
</script>


<style scoped>

</style>
