import deleteIcon from '@/components/deleteIcon'
import { ElMessageBox } from 'element-plus'

function useModal(message: string) {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(message, '', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      showClose: false,
      type: 'warning',
      center: true,
      draggable: true,
      icon: deleteIcon,
    })
      .then((res: any) => {
        resolve(res)
      })
      .catch((e: any) => {
        reject(e)
      })
  })
}
export default useModal
