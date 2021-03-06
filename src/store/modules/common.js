/*
 * @Author: zfd
 * @Date: 2020-09-24 23:00:59
 * @LastEditTime: 2020-10-12 15:37:47
 * @Description: common state
 * @FilePath: \trip-enterprise\src\store\modules\common.js
 */
const state = {
  isOrNo: [
    { key: true, val: '是' },
    { key: false, val: '否' }
  ],
  genderMap: [
    { key: 1, val: '男' },
    { key: 0, val: '女' }
  ],
  normalStatus: [
    { key: 0, val: '正常' },
    { key: 1, val: '禁用' },
    { key: -1, val: '已删除' }
  ],
  actionMap: {
    'enabl': 0,
    'disable': 1,
    'delete': -1
  },
  statusType: [
    { key: 0, val: 'success' },
    { key: 1, val: 'warning' },
    { key: -1, val: 'danger' },
    { key: 3, val: 'info' }
  ],
  menu: [
    { key: 0, val: '根节点', disabled: true },
    { key: 1, val: '菜单' },
    { key: 2, val: '页面' },
    { key: 3, val: '按钮' }
  ],
  menuType: [
    { key: 0, val: 'danger' },
    { key: 1, val: 'warning' },
    { key: 2, val: 'success' },
    { key: 3, val: 'info' }
  ],
  teamFlag: [
    { key: 1, val: '国家' },
    { key: 2, val: '联赛' },
    { key: 3, val: '球队' }
  ],
  handleStatus: [
    { key: 0, val: '未通过' },
    { key: 1, val: '已解决' }
  ],
  handleTag: [
    { key: 0, val: 'danger' },
    { key: 1, val: 'success' }
  ],
  applyStatus: [
    { key: 0, val: '正在审核中' },
    { key: 1, val: '公示阶段' },
    { key: 2, val: '审核通过' },
    { key: 3, val: '管道踏勘' },
    { key: -1, val: '驳回' }
  ],
  applyTag: [
    { key: 0, val: '' },
    { key: 1, val: 'warning' },
    { key: 2, val: 'success' },
    { key: 3, val: 'warning' },
    { key: -1, val: 'info' }
  ]
}
const getters = {

}
const mutations = {

}
const actions = {
  // login({ commit }, param) {
  //     USER.login(param).then(res => {
  //         commit("SET_USERNAME",res.name);
  //         console.log(res);
  //     }).catch(err => {
  //         console.log(err);
  //     });
  // }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
