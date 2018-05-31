// 验证手机号
function isPhoneNo(phone) {
 if(!phone)return true;
 var pattern = /^1[34578]\d{9}$/; 
 return pattern.test(phone); 
}
