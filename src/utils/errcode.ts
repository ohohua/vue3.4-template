import {type ErrorCodeType} from '@/types';

export const errorCode: ErrorCodeType = {
    0: "没有发生错误",
    1: "服务器内部错误",
    2: "登录失效,请重新登录",
    3: "参数错误",
    4: "用户已存在",
    5: "用户不存在",
    6: "密码无效",
    7: "权限被拒绝",
    8: "性别错误",
    9: "名称已存在",
    10: "邮箱格式错误",
    11: "密码格式不对(包含一个大写一个小写字母, 长度大于等于8)",
    12: "上传的文件不符合大小限制",
    13: "上传文件的类型不匹配",
    14: "验证码错误",
    15: "两次邮箱不一致",
    16: "菜单已经存在",
    17: "菜单不存在",
    18: "标签已存在",
    19: "标签不存在",
    20: "图片已存在",
    21: "图片不存在",
    22: "其他错误"
};