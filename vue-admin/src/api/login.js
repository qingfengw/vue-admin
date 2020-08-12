import service from "@/utils/request";
//获取验证码
export function GetSms(data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data
    // data:data 和 data:data一样的但是这种情况是你传递是一个对象才行。
  });
}
