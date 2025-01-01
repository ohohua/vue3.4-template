type Callback = (error?: string | Error | undefined) => void

interface LengthRange {
  min: number
  max: number
  message: string
}

export function useValidator() {
  const required = (message?: string) => {
    return {
      required: true,
      message: message || '此项必填',
      trigger: 'blur',
    }
  }
  // 手机号验证
  const validatePhone = (rule: any, value: string, callback: (arg0?: Error) => void) => {
    if (value === '') {
      callback(new Error('请输入手机号'))
    }
    else if (!/^1[3-9]\d{9}$/.test(value)) {
      callback(new Error('请输入正确的手机号'))
    }
    else {
      callback()
    }
  }
  const lengthRange = (val: any, callback: Callback, options: LengthRange) => {
    const { min, max, message } = options
    if (val.length < min || val.length > max) {
      callback(new Error(message))
    }
    else {
      callback()
    }
  }

  const notSpace = (val: any, callback: Callback, message: string) => {
    // 用户名不能有空格
    if (val.includes(' ')) {
      callback(new Error(message))
    }
    else {
      callback()
    }
  }

  // 两个字符串是否相等
  const isEqual = (val1: string, val2: string, callback: Callback, message: string) => {
    if (val1 === val2) {
      callback()
    }
    else {
      callback(new Error(message))
    }
  }

  /**
   * 配合useForm schema校验使用
   * @param message 提示
   * @returns void
   */
  const rules = (message: string) => {
    return {
      required: true,
      validator: (rule: any, value: any, callback: any) => {
        if (value === '' || value == null) {
          callback(new Error(message || '请输入'))
        }
        else if (value.length === 0) {
          callback(new Error(message || '请选择'))
        }
        else {
          callback()
        }
      },
    }
  }

  return {
    required,
    lengthRange,
    notSpace,
    isEqual,
    validatePhone,
    rules,
  }
}
