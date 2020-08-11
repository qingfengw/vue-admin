//过滤特殊字符
export function stripscript(str) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&%;—|{ }【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
// 验证邮箱
export function validateUser(str) {
  let res = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  return !res.test(str) ? true : false;
}
// 验证验证码格式
export function ChecCode(str) {
  let res = /^[a-z0-9]{6}$/;
  return !res.test(str) ? true : false;
}
// 验证密码格式
export function validatePass(str) {
  let res = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return !res.test(str) ? true : false;
}
