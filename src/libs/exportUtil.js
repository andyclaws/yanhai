import html2canvas from 'html2canvas'

/**
 * html 导出图片
 * @param id 元素id
 * @param exportFileName 导出文件名
 */
export const savePic = ({ id, exportFileName }) => {
  let canvas = document.getElementById(id)
  html2canvas(canvas, { allowTaint: false, scale: 1.5, logging: false, useCORS: true }).then(function (canvas) {
    let type = 'png'
    let imgData = canvas.toDataURL(type)
    // 照片格式处理
    let _fixType = function (type) {
      type = type.toLowerCase().replace(/jpg/i, 'jpeg')
      let r = type.match(/png|jpeg|bmp|gif/)[0]
      return 'image/' + r
    }
    imgData = imgData.replace(_fixType(type), 'image/octet-stream')
    let filename = exportFileName + '.' + type

    let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    save_link.href = imgData
    save_link.download = filename

    let event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    save_link.dispatchEvent(event)
  })
}

/**
 * html 导出pdf
 * @param id 元素id
 * @param exportFileName 导出文件名
 */
export const savePdf = ({ id, exportFileName }) => {
  let canvas = document.getElementById(id)
  html2canvas(canvas, { allowTaint: false, scale: 2, logging: false, useCORS: true }).then(function (canvas) {
    console.log('adsasdasdas', canvas)
    // 返回图片URL，参数：图片格式和清晰度(0-1)
    let pageData = canvas.toDataURL('image/jpeg', 1.0)

    // 方向默认竖直，尺寸ponits，格式a4【595.28,841.89]
    let pdf = new jsPDF('', 'pt', 'a4')

    let width = canvas.width
    let height = canvas.height
    let position = 0
    let pageHeight = width / 595.28 * 841.89
    let imgWidth = 595.28
    let imgHeight = 592.28 / width * height
    // 需要dataUrl格式
    if (height < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (height > 0) {
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        height -= pageHeight
        position -= 841.89
        if (height > 0) {
          pdf.addPage()
        }
      }
    }
    pdf.addPage()

    pdf.save(exportFileName + '.pdf')
  })
}
