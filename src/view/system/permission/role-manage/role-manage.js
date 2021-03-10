/**
 * 状态（0 待审核、1 审核未通过、2 审核通过正常，3 锁定、4 长期锁定、5 删除）
 * @type {{code: number, name: string}[]}
 */
export const roleStatus = [{
  code: 0,
  name: '待审核',
  type: 'info'
}, {
  code: 1,
  name: '审核未通过',
  type: 'warning'
}, {
  code: 2,
  name: '审核通过正常',
  type: 'success'
}, {
  code: 3,
  name: '锁定',
  type: 'dashed'
}, {
  code: 4,
  name: '长期锁定',
  type: 'dashed'
}, {
  code: 5,
  name: '删除',
  type: 'error'
}]
