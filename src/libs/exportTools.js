import html2canvas from 'html2canvas'

export const saveHtmlToCanvas = (dom, picName, callback) => {
  let wd = dom.style.width
  dom.style.width = document.body.clientWidth - 300 + 'px'
  let canvas = dom
  let canvasName = picName
  html2canvas(canvas, {
    scale: 2,
    logging: false,
    useCORS: true
  }).then(
    function (canvas) {
      dom.style.width = wd
      callback()
      let type = 'png'
      let imgData = canvas.toDataURL(type)
      // 照片格式处理
      let _fixType = function (type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg')
        let r = type.match(/png|jpeg|bmp|gif/)[0]
        return 'image/' + r
      }
      imgData = imgData.replace(_fixType(type), 'image/octet-stream')
      let filename = canvasName + '.' + type

      let save_link = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'a'
      )
      save_link.href = imgData
      save_link.download = filename

      let event = document.createEvent('MouseEvents')
      event.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      )
      save_link.dispatchEvent(event)
    }
  )
}
