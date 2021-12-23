import axios from '@/libs/api.request'

export const getAlertLog = parameter => {
  return axios.request({
    url: `/system/api/alert-log?${parameter}`,
    method: 'get'
  })
}

export const getAlarmConf = parameter => {
  return axios.request({
    url: `/system/api/alarm-conf?${parameter}`,
    method: 'get'
  })
}

export const updateAlarmConf = (id, data) => {
  return axios.request({
    url: `/system/api/alarm-conf/${id}`,
    data: data,
    method: 'PUT'
  })
}

export const deleteAlarmCconf = id => {
  return axios.request({
    url: `/system/api/alarm-conf/${id}`,
    method: 'delete'
  })
}

// todo 此接口暂时不用
export const getAlarmInfo = parameter => {
  return axios.request({
    url: `/system/api/alarm-info?${parameter}`,
    method: 'get'
  })
}

// 新增日志导出功能
export const getExportAlarmInfo = parameter => {
  return axios.request({
    url: `/system/api/export-alarm-info?${parameter}`,
    method: 'get'
  })
}

export const getExcelAlarmInfo = parameter => {
  return axios.request({
    url: `/system/api/excel-alarm-info?${parameter}`,
    method: 'get'
  })
}

export const setupMysql = data => {
  return axios.request({
    url: '/system/api/mysql-setup',
    data: data,
    method: 'post'
  })
}

export const getSetupLog = parameter => {
  return axios.request({
    url: `/system/api/setup-log?${parameter}`,
    method: 'get'
  })
}
