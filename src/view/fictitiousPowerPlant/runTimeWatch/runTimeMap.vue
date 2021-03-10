<template>
  <div ref="dom" class="charts run-time-map"></div>
</template>

<script>
import echarts from "echarts";
import * as api from "@/api/fictitiousPowerPlant/runtimeWatch/mainview-data.js";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";
import shanghai from "./shanghai.json";
echarts.registerMap("shanghai", shanghai);
// echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "runTimeMap",
  props: {
    mapData: Array
  },
  data() {
    return {
      dom: null,
      color: ["#0099FF", "#FF9933", "rgb(32, 223, 150)"],
      realTimeData: {},
      hoverNo: ""
    };
  },
  methods: {
    removeNull(val) {
      return judgeNull(val, "");
    },
    resize() {
      if (typeof this.dom !== "undefined" && this.dom !== null) {
        this.dom.resize();
      }
    },
    draw() {
      let _this = this;
      this.$nextTick(() => {
        if (
          typeof _this.mapData === "undefined" ||
          _this.mapData === null
        ) {
          return;
        }
        let data = [];
        let geoCoordMap = new Map();
        let infoMap = new Map();
        for (let index = 0; index < _this.mapData.length; index++) {
          let obj = {
            name: _this.mapData[index].unitName,
            value: _this.mapData[index].unitNo
          };
          data.push(obj);
          let tudeArr = [
            _this.mapData[index].longitude,
            _this.mapData[index].latitude
          ];
          geoCoordMap.set(_this.mapData[index].unitNo, tudeArr);
          infoMap.set(_this.mapData[index].unitNo, _this.mapData[index]);
        }
        var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap.get(data[i].value);
            let info = infoMap.get(data[i].value);
            if (geoCoord) {
              res.push({
                name: data[i].name,
                coord: [geoCoord[0], geoCoord[1]],
                value: data[i].value,
                info: info
              });
            }
          }
          return res;
        };
        var option = {
          tooltip: {
            // trigger: 'axis',
            showDelay: 0,
            borderWidth: 0,
            paddding: 0,
            backgroundColor: "#EBFBFB",
            formatter: function(params) {
              if (params.componentType !== "markPoint") {
                return;
              }
              let res =
                "<div class='markPointRes'><div class='markPointLoading' style='border:none;width:auto;background-color:#EBFBFB;display:inline-block;position:relative;text-align:center;color:#666666;padding:10px;'>加载中...</div></div>";
              if (!_this.loading) {
                if (
                  _this.hoverNo === params.data.info.unitNo &&
                  _this.realTimeData.pRt !== undefined
                ) {
                  let res = _this.getToolText(params, true);
                  return res;
                }
                _this.hoverNo = params.data.info.unitNo;
                _this.loading = true;
                api
                  .getRealTimeUnitInfo({ unitNo: params.data.info.unitNo })
                  .then(res => {
                    _this.loading = false;
                    let obj = res.data.data;
                    if (
                      typeof obj !== "undefined" &&
                      obj !== null &&
                      res.data.code === 200
                    ) {
                      _this.realTimeData = obj;
                      $(".markPointLoading").remove();
                      let text = _this.getToolText(params, true);
                      $(".markPointRes").append(text);
                    } else if (res.data.code !== 200) {
                      _this.realTimeData = {
                        pRt: "",
                        adjUplimit: "",
                        adjDownlimit: "",
                        climbRate: ""
                      };
                      $(".markPointLoading").remove();
                      let text = _this.getToolText(params, false);
                      $(".markPointRes").append(text);
                    }
                  })
                  .catch(err => {
                    _this.loading = false;
                    _this.realTimeData = {
                      pRt: "",
                      adjUplimit: "",
                      adjDownlimit: "",
                      climbRate: ""
                    };
                    $(".markPointLoading").remove();
                    let text = _this.getToolText(params, false);
                    $(".markPointRes").append(text);
                    _this.$Message.error("机组实时数据查询失败！");
                  });
              }
              return res;
            }
          },
          // visualMap: {
          //   min: 0,
          //   max: 12000,
          //   left: "left",
          //   top: "bottom",
          //   text: ["实时负荷(kW)", ""],
          //   textStyle: {
          //     color: "#666666",
          //     fontWeight: 400,
          //     fontSize: 13
          //   },
          //   itemWidth: 20,
          //   seriesIndex: [0],
          //   textGap: 20,
          //   inRange: {
          //     color: ["#C5F4F4", "#4EDCDC"]
          //   },
          //   calculable: true
          // },
          series: [
            {
              // 地图配置
              name: "",
              type: "map",
              map: "shanghai",
              zoom: 1.8,
              mapType: "上海",
              selectedMode: false,
              center: [121.687756, 31.155984],
              roam: true, // 是否开启平游或缩放
              itemStyle: {
                normal: {
                  show: true,
                  areaColor: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#A7EEEE" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#51DDDD" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  },
                  label: {
                    show: true,
                    color: "#333333",
                    fontSize: 13,
                    fontWeight: 400
                  },
                  borderColor: "#fff",
                  borderWidth: 2,
                  shadowColor: "#009999",
                  shadowBlur: 5
                },
                emphasis: {
                  label: { show: true },
                  areaColor: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#009999" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#fff" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false
                  }
                }
              },
              markPoint: {
                // 数据全是markPoint
                symbol: "circle",
                symbolSize: 30, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                itemStyle: {
                  normal: {
                    color: "#fff",
                    borderColor: "rgb(0,0,0,0.1)",
                    borderWidth: 0, // 标注边线线宽，单位px，默认为1
                    shadowColor: "#666666",
                    shadowBlur: 5,
                    label: {
                      show: true,
                      color: "#ffffff",
                      fontSize: 14,
                      fontWeight: 400,
                      position: [0, 0],
                      formatter: function(params) {
                        let imgString = "";
                        if (params.data.info.isOnline === "01") {
                          switch (params.data.info.unitType) {
                            case "01":
                              imgString = "{adrOnlineImg|}";
                              break;
                            case "02":
                              imgString = "{drOnlineImg|}";
                              break;
                            case "03":
                              imgString = "{drAdrOnlineImg|}";
                              break;
                            default:
                              imgString = "{adrOnlineImg|}";
                              break;
                          }
                        } else {
                          switch (params.data.info.unitType) {
                            case "01":
                              imgString = "{adrOfflineImg|}";
                              break;
                            case "02":
                              imgString = "{drOfflineImg|}";
                              break;
                            case "03":
                              imgString = "{drAdrOfflineImg|}";
                              break;
                            default:
                              imgString = "{adrOfflineImg|}";
                              break;
                          }
                        }
                        var res = "";
                        res +=
                          imgString + "   " + "{bottomImg|" + params.name + "}";
                        return res;
                      },
                      rich: {
                        // 这里设置您的图片引用名称
                        drOnlineImg: {
                          // 引入图片
                          backgroundColor: {
                            image:
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAE60lEQVRIiY2Wa2xTZRjHf+f0bGvXdu26i13HxsQxCguZiIOBfAARwpDrAAeJCnExwUQlBDUYCSERZ0yM4RKioHwBI3JxIQ5J1JggNydj4nDKEBhQehmU0a7tds7W0x4/wMbONpjvp5Pn+b+//3t/juBu282jWs2N5op2o3nLLVPGswGjxd6ZkmYwaJqW09sdt/cqkQI50pSnxGq/Knr65KMYwnAGNTeaK/7OyPm2MTNvdEIQHjkAAFHTmBIK3CyNBFfuLSprGJIfHFjp/WfrgYIJZxscrhHhAElBoMHhGv1NQenZFb7WnY81WBS4Uncof/wH3YaUkcmDmmyQhCP57jcXBq4eHdZgha91W33e2KXJQaOeYnRRZR2HU7IAUGkeQ8uTr7M5awYOg1Gn1YBjecWLV/hat/XFDNnrFlJzo7niu3z3nrgo6ug7cuewwTGV2elFrLFNxK9GOa14GSVlsNRaQo2tjHtJmZaeoM7outk+dbXnrx8v2J1eQ/a6haQlk6dumG2ZA0Wbsp5jibWEav9RajvOoqGxMWsa+ztbqItdZle4CUGAdx0VZBhSOS17+/uqoiikJZNzvSbrNsPGxQXTjzmLN2iDlma3s5KvIy0cibaikuR3xc9a+yRUNFSSxLUkJ7o9XI+Hec9RwS01wuXee/39/UaLreZm88+i32jdNHjdAbqTccanZutikiDym+JjnnkMJwtfZnxqNse7rnE42sonObN02qQg4DdaN4lek7V8CB1YH/yFyUYnn+W+QI2tjHOj1xBKKDTIPrZ2nKFRCVCXXwXA5rv379mqjAk6htdkLRf9JkvmEDpwstvDfO8hMsU05lue4njXNaZ79vXnXw3UA/CG/RkArsVDVFnG6Rh+kyVTjEhphuEMJEEkVRA5I/u42HOHRiVAgZSh0/zZc5ul1pL738ptcqR0Xb5TMhqk4eBLLSXU5swEoCMh05WMs8RSglGQuBYP8UqgnlBCwWkwIwr3r5KKhsjQvZQy1J7E3dT0/lnMM4+hNmcmB6OX+CJ8gXY11i+ebHSyPXcOda5lzPUe4Hq8kyalHYCytFw6ErIOblOVhOiSY+GBwU9znqctHmbL3VM6OECT0s4Mz36ckpnZ6UW81v4Du8JNALhTs6iPXdHpXXIsJI2So+cu2nIr+4Jfdjaz1j6JT3JmcVK+xR21i14tgVlMZUyKnWrreOJakku9Hf2gdxxTAdgXadEZjJKjjZJLidaKmlbZdxe2hxrxqlHWZ5azwFJMXEuSJjw8B01KOwt8h/DEIwBMM+VTYyvjw44zqFqyXydqGi4lWiu423ZTcc9/s8HhKhy8QS7Jgkuy0tITRNHUwWlWZUxgc9YMjsb+5f3gCV2u4p7f0+BwjZYASiPB6mZb7lnZIOmOQWGKjT1PVPJTVxsnZA9BtRuHwUS5MY8q6zjSBAM7Quf5PPyHDm5KqFppJFjd4HA9rGgrfK07juS739IGCNPFFJZb3Ky2TcT14LkGHrxDN9kWaqQtrjsjCMByX+vOw/nut2FQyVwUuFJ3zFk8pCb83yYAL7ZfrT/mLF7UF9NVtO/zxla95Lv0UXoirg3pPUIzJVRtma9110A4PL7oHzyXmVc40mweFH1PaSRYPVzRH9ZgoFHfb4vfZLGHU4wGAHtcSbjkWLhAjpx3Kl0f7y0q+/VRjP8ASXoAcAAYhpsAAAAASUVORK5CYII="
                          },
                          height: 30,
                          width: 30
                        },
                        drOfflineImg: {
                          // 引入图片
                          backgroundColor: {
                            image:
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADWUlEQVRIiZ3WfWjVVRzH8dfubtPmTKv5MCVdSpttSszREwmlTKFyWg3XJhIS5R8FSUFp/VMGlkkP+M/QqD8q1DksS4siUEfLIh972MwMbVsbus3Kapow3frj3Hl3f7sz6QOXc8/D7/0553e+33N+GX0bSl1Ck7AYs1GEMehBG1pQjy34ZShAxhAGk7AGlci81AzQmzBZidZoZyzNAwvQiOrLgPczqtGUKC9psBzbMPIywFHlYCOeHMrgQbwxyHRCKYULyBkX6lPm8uheZq1k+NVRkwy8lmCFhsQeTBKWmJMyfO5arp+TrNevorWBWSuCEXy5hsNbo0bdKEZr5gvlE6AGqbt9xzMUzOfDpXz1Kn293P4UjbX8tJ0Db4Zxty0nK4e2rwc+nYU8vB/DZFRFp6C4ksYtdDZy/hz719N7nuJF5M0kOzeY7HyOGYu54Z4ooRKTYwn44GjqOUtuQWpbLE77PqaUseQzcgs59jlHtjH7xSghhqqYkESDtfNZxpdQ9jI3PcTSes6dpn0ve9Zy4iAPbAxjv1gdyqJFUcrsGKanNWjdQ10Fw0YxdV6Y6btlyf4dy0I585FQ/nGcwvIoZXoMuWkNYnFiWbR/Q2cTJw5w1cTUMR3fU5CAdvwQ9iVVY+Jp4QXl3PV8+P/P7/ScCREVHxZmumNZeF0jxhFLbF/fBTIGb2Ucp5Cc2pSyAP/xAw69TXdHcvT4Eua+QsUmNi/kzxZOfhv6xk4Pk0lVV0xIsKTmrOZ0Mw0vpcLh5CHem8eIseTfySePJfPh2gJ+/jRq0BjHLsy72PTdO5Q8HMLu1z2c6eJCD1nZjM7nxgp6e/jtaBJz6xMJ3Oaowe6Mvg2l+ThmYC5MW8jNjzN8dEiuzKzUVdSv4q+2UJ94C/fWhNBtqhsI78XUOJpRZ2A2H/ko/HLyGJlH1+GQzVEVLQrn0tGPo3AJZnN/FK3AfNHDbtR13L2O47vCIXf2FFdeE46KwgVhZfvXc/CtKLw7wUy50aqwSThyg67IZtp9zKgOq7m4+B5aGthXEwIiVX3CNVsbNSBcOK9Lf9NdjvrwtHAnkAa0Dvfj7/8B78aSgfB0BrBdOJ9qhUj4L/UmxhYLrzhFQ31V9GvgZ0sxxibaO4UE3S1Ey/GhAP8CY6X2uqCBeBYAAAAASUVORK5CYII="
                          },
                          height: 30,
                          width: 30
                        },
                        adrOnlineImg: {
                          // 引入图片
                          backgroundColor: {
                            image:
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEXElEQVRIiYWWa0xbZRjH/+fScg69cNpC155SKBuYTtRqJo7gJNE5o851XlKZcdEoMcZE4/bFLyzROMcSo3FmMzoVTTYzRHExg5iZkBkXxQacC45L5xrk1ouUQumFU3o7fmBdenooPB//z/v+/u/7vO97nkPYJ0+jVLRPjTQHGdU7s6z23gCj5pYVZRQlimJVaiXNpZJRqxC9Yk7GO7+03X25FINYz6B9aqR5TFv17bDOXJsliJILAABSFHHfUmC6MRo60GVzuGX5YuHA3Ph73dbbB916flM4AOQIAm49X3vO2jjo8nlObmjgDNw4/51le8cKpdicXBQCRRO9Fvvr+wLeH9c1cPk8J/rMDU/lNli1XWnAq9w9JfMigH5z/X6Xz3Mir1GVb+5D+9RI8w8W++dpkixJZwkav9Q8j2bWgq1KDtsUOoyuhpBBTjb2XxW388WZaz9f5UxzJACMaau6BYqWwdsrHDi55REAQAY5nI2OYmx1AUOCH44yIwasz8GpbpAZCBRNjGmregCA+ODSay1f1Tp+Ly7NQe0d6DC04PD8AC4mJm/pSoJCSswCAB5VbcVHxofxbvg3dEfHJfNJUcTL0yP3035Gc6QYblca0GFowUOz5xDIxCW5PBwALiYm4fV9jz6LC1eSQfyTWryVyxEE/IzmCDnHapqKt3i0shWfRa7K4G9X7kIP/6RE86aWcCZ6DR9W7ZaVao7VNJF+Vq0rFE20ChzF4OOlYdmEFqYad5UZsYVSSfTj4T9gUWhQo9BKdD+r1pFRuowqFFvZGvgyMRl8d7kN/QkvPo38hXbOIcsf9F9AIpeWaMs0Q8lespEuRzyXkgH2qGwAgOupRTzAWmX58dQCwllBppPazGq2UAhlVsCRjGxgnYLDDsaE/eoG2BQVYAhaNqY4KjLJLMkL8UihOLAyBQVBol6pg4FiAQAPlteiTsHhleBPODQ/gKSYwdHKVgCAilTgBe2d+MbslJ0NL8SXyGohNlQoRnKr0FEM+iwuaMkyAICRKsfZ6CjSYg4pMYtj4UGs3ryuiVwae9XbsIMxYSfLSwyqhdgwzSdjnaQoPpZ/CzylxtjqAhQgMZVe21xPbEIysTfmQW/MswahNTDTarwU7Ie/4FqTogg+Gesk7JOn0bzon3br+ZriGhJY+4CVil1sNb4wPY73F934evlvSa550T/j1vO1NAA0RkNtIxXGweLvkYi1wz2ka8JlYRbXU2GQILBdacAeVR1uU+rxVugS+uJeCZzNZsTGaKjNredBA0CXzeF2+Tynei32N4pXHMkl8V82Aae6HlqyETRIRHJJTKTCODw/gFjRlSYAPBH0nsp3N0nLdAZunO831W/YEzYKAsDeoLev31TvzGuSh3bB3PD0s76JY+XZ9EalXzfYbEZ8xuf5pBAObNz0e4Z05prNdnOz6c80RkNt6zX9dQ0KjfK/LX5WzUUUDAUAXDqZ5YV4xCpE/zQlE8e7bI5fSzH+B2VQrx/phEqEAAAAAElFTkSuQmCC"
                          },
                          height: 30,
                          width: 30
                        },
                        adrOfflineImg: {
                          // 引入图片
                          backgroundColor: {
                            image:
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAC/0lEQVRIiZ3WX2iVZRwH8M9eTzbXlkvnMllnttSLziSkP5CIoUnBCinCP5PoIvAiIqQLwaBrUypLgiAaQRcunVAxorqQ9KJSMBJqpeRaa9USm1PztJZbZ10857Dzvu85J+kLL8/D7/k93+/z5/f7PW/dzJt3qYEstmEd7sAiTOEX/IRjOIQfqxHUVRHIYg82Y06tFaBQFNmFkeRgVGHCRgyg+xrISxzd+LbY1hTYgffRdA3ESTTiAJ6rJrAFr1YQncXCFax6qpZIHV4pcoFMsc2ip+hQGZl5PN4b+guWcfEHvj7A9GQlkR4cx0hptS8KW4zjzid58KXQL0wzcJCx04x+SetKuvtZ3lVpOY3YS4iidgxJHk3nFlbv5Mguho7M2ufM5Z+rod+xgQ17+Gwv3x1OihTQkcHWFPnCFYG89xHy5+LTSuQE4cOb2dTHuVOMD5Z7RtgaCUkUx9oXOPV2mnzN8zz6Ttx2cYhvenlgd4oG6yJ0xkw3tFLfzMk30u5t99KaCz7lOL6Pplu4sS05ozNCS8yUXcOV0TT50vsZ/ISvesLlJ9G/namJpHVROuYbWriaryCwPrTjZ7l1dXp87Ax/jafMEcZilokx6uenCZqXsngVyx9mfpZMfdonjd8joYbMYvgY0Vxu6mDegmBrX0tzOx89G8J2ejIEAlzXwMptbHwrfTcMRPg0Zvr7crjkTX1cXyxJDS0MvEthKoTpFy/PhuvUBLc/FHa35O6kwNGMUGp3K+VC4+KQrVGGS8Xqe/q9+LQzH4QPmpbQeDMfPk3+t3KvAg5lMIw+IeH449dwDKhVmkDbfXS9zonXGD2ZHO3DcOnByQp3ka5Hze3c8ww/f86Fs9RFIdNvWx+K3on9DH6cnJVHDiOlajqC7ehNLXvyMn+eZ1kXuaZwdJOXuPB92Gk6pGeKXCOkn8wd2KfWm1AbM9gpvAlUINqPx3Dlf5Dn8UQ5eSUB6Bfq00EhEv4LhaJvTjjiGKr9VZRQ/tuSQymTzgtBcVSIlqFqBP8C627Pis1/vbMAAAAASUVORK5CYII="
                          },
                          height: 30,
                          width: 30
                        },
                        drAdrOnlineImg: {
                          // 引入图片
                          backgroundColor: {
                            image:
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEwklEQVRIiY1Wa0xTZxh+zumF09KWtgrpxV4MLNbWDB24NWB0F/+g0Uw3p0FjsqBhyTadZv5Yppk/NliyZG4z++EGI1Gj8zKzoIsuyqYs62oZC2wwMSArBVpooYW29JxeTs9+DOo5QGXvr/M97/c9z/ne814OYRs8g3xW5+12jlGFJ4dlqsoApVBPSwpEIo7jilOJtDrFRE10tFPPxBuarGvb83EQiwnUebudvaribzs0egtLEHlfAABIjsOzkcCQIxra02wtdy/wzwf2jPz94UWT3eXWGpYkB4AsQcCtNVgumByuXaN9p58osD3Qf+2ycfX7CZFkaeZ5RovExFWj7a1tgYHv+XguRLtG+z67arQd5gCQIJAFBwAoLyhBvXodKigdKEIMAEhyLP5KBvHVVBfuM36BEAHg1dG+z68Ybe/kBOq83c4LJoeLFokJAKik9NiqKMVIOoZDmkoMpqdwc+YRHiQnwYKDTapFTWEp1hQU4+bMIxwNtglEZGyGqx3urWq2lrvFANCrKr44Rz5ne5R2AED9+C20J3wCAhc9gm+m/0SpRIPLhpfRbt6Hjb7zgnD1qoovAbCQB7xdVR6N3son6E6O417Ch3Z6GIOpSN64P0pHUDHUAjVJ4YyuRuDzaPTmA96uKrGfUh7P8rLlGUqHg0Vr8cb4LcGBY1onNsnNIAB0MAGcnPgl59s0fB4u835Uy1bgV3oEwH/Z5aeUx8kRmXI9n+hdzXOokhkF5CeWVaNWZcepsAefhN3YLLfi05KXcv4Iy8DD+HFiWbXg3IhMuZ70yxQaPvg0VYKPw7/l1qUSNXYoV6Fq6CzaEl7cTfiwwXcOL8gtqKB0uX1np3ugFysEAn6ZQkNGxQWi+bHtTU7knk0SFQKZOGguI9jTn4pgtXT543U6jFg2JdgzLaZECyoZQK4GAMDDBKAipdhSWPr4lgUlsEqK8OPMYA7jOCxqYlUmyU5I5YJbrJJq0ZMMAQAS2TSOBNtwTr8NNYlS0NkMtinKcDTYhhCbyJ1ZKVWjkJQIyIsyDEsa6PgUH+xLTqJW5cit7dLleFNdgU5mDFmOg4Qg8QczhlqVHU5eMuxV2hFhGYGAgY5HyBV0zMMHG8Mu2GdjqySl+M64Ez2pIPYFWnE4eBtHgnewN9CKdnoYLbqtMMx+2I1yMxp5yQEAK+hYh9jAxBpIjquZq4VOZgx3El78bKqFNx3FsdBPuBEfWBDbr6e68DAVxqmSzSgkJehgArg980/OT3IcDEysgbANnoEz7B9yaw1mPoHLvB8aEYWKoRYksukFAgAgAoGelQfBclms8TYJfM6w3+fWGixiAHBEQ7u7i0pc/H5U5TuLD5ZvQKflddxn/GiN9+NhahJZDiiTqrGlsAzPy824Hh/AexN3BeQyNsM5oqHdbq1B0K6/uGq0vT0/216UW1CvXoeVEjW42fQlQGA0E0PTdDd+mBe+2XZ9+orRdgiYNzK3B/qv3dCV7cj+j0m2mBEAto4NXL+hK9s+hwkKrVX/1M7XRh98JGfTecomv8nYDPfKaN+XfHLgyUP/kkejNy91m9mh73NEQ7sXG/qLCvCF5n5b/DKFekpCiQBAnWZYAx2fMtHR33XMTGOztfxePo5/AbBg8X8/ub9lAAAAAElFTkSuQmCC"
                          },
                          height: 30,
                          width: 30
                        },
                        drAdrOfflineImg: {
                          // 引入图片
                          backgroundColor: {
                            image:
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADQElEQVRIiZ3WX2iVdRgH8M85HU1q5pI5Vto55sTibJG6SmEmSbkaofSP5SLCCKO71YWRXXUVQaRYEVgXZs2xuokKamlLy1KRjElaiW7No23+mU3asOHcThfvme85r+eI9L15f7/nz/f5/Xme5/fGspvqXAFJPIVlSGMGRnECx7ATn+DPUgSxEgGSeANNuOZKK8B4LsgryESV8SIOK3EQzVdBPsHRjEO57xUDtOAzTL0K4ijKsBUv5QsTeeMnsQExsTjZ8UBaeQcLnqVqPokpgWzsAqcP0bWZvp/z+WJ4C32CY7t0B8ncFsvATQupfpChv7jrBc710r2ds4fJjjF9HtXLmZGmexudr0Z3M4waZCYCbBVki0sBVrwfjDtayPxU/FBunMMjHzJ6ntaHotp2NMeRwqoC1alfyfzI8d0MlsxABnvYvJQp02h8O6ptQiqRIw8vu+pO5q+m48VC88UtJJcgRv8v7Ho91LU28sy3zFrMib0T0jhWxQVFFGJRCzMXFZLXv0y6iX3vsncjs+/j/rwAI+fo2x/YFWJZHLUFospa9mwI5+W3ctsKPnqA3u/J7OLjBlJLqVoQ2h1so6wqGqA2joqo1MDv4fiGWQyf4uK/hTaDPVTMC+d/93BhOMo0o1glhzUA/fuZPJXqhsJdTruFns48pzyfPCQwgJkF0ulzOfNbMB49T+e6IG2rl3NxhLmNQe6fHwh9ymcz6foo/5m4oMBCnD1MTVM4r7idujWc7CKbJT6JkwdIP8HMe0K7dBMjg9EABxP4DuH+d69n5QfBeHIZj7XStYV97xS6zl/Nw+/RtoLhfpL1bL8si3bEspvqZqNbfi00vElFmn8y/PE5RzuijgGS9Sxcw6TrglT98vl87Tiq4+jFpwWO29aSuJab7+bYD8XJ4fie3IWnouRynL3Fm90Elqwj/XjQMY98xdkjwcLK5zC3geS9HP2ana8xPpbveVmzI2gZbYKWGyK1lAXPUZ4K0zcWZ6iPA1s4+k105VlB42zn8iezBesVf+muBlmsFbwJFCHaiEcx9D/Ih/F0PnmxAPCFoD+1K1WehRjP2dYIjrgApf4qJpD/21KDypz8tCApdgiypacUwX/xv+/OPuoe0AAAAABJRU5ErkJggg=="
                          },
                          height: 30,
                          width: 30
                        },
                        bottomImg: {
                          backgroundColor: "#43DADA",
                          color: "#fcfcfc",
                          fontSize: 12,
                          fontWeight: 400,
                          height: 15,
                          shadowColor: "#666666",
                          shadowBlur: 10,
                          padding: 5,
                          borderRadius: 4,
                          position: "bottom",
                          opacity: "0.5"
                        }
                      }
                    }
                  },
                  emphasis: {
                    borderWidth: 0,
                    shadowColor: "#666666",
                    shadowBlur: 10,
                    label: {
                      show: false
                    }
                  }
                },
                effect: {
                  show: true,
                  shadowBlur: 0
                },
                data: convertData(data)
              },
              data: []
            }
          ]
        };
        this.dom = echarts.init(this.$refs.dom, "shanghai");
        this.dom.on("click", function(params) {
          if (params.componentType === "markPoint") {
            _this.$router.push({
              name: "machineDetails",
              query: {
                unitNo: params.data.info.unitNo
              }
            });
          }
        });
        this.dom.on("mouseout", function(params) {
          if (params.componentType === "markPoint") {
            _this.realTimeData = {};
            _this.hoverNo = "";
          }
        });
        this.dom.setOption(option);
        on(window, "resize", this.resize);
      });
    },
    getUndefinedNull(val, initStr = "") {
      if (val === undefined || val === null) {
        val = initStr;
      }
      return val;
    },
    getToolText(params, isSuccess) {
      let successText = "";
      if (isSuccess) {
        successText +=
          '<div style="height:14px;margin-top: 13px;">' +
          '<div style="display:inline-block;width:50%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
          "实时负荷： " +
          '<span style="color: #009999">' +
          this.getUndefinedNull(this.realTimeData.pRt, "0") +
          "</span></div>" +
          '<div style="display:inline-block;width:50%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
          "可上调裕度：" +
          '<span style="color: #009999">' +
          this.getUndefinedNull(this.realTimeData.adjUplimit, "0") +
          "</span></div>" +
          '<div style="height:14px;margin-top: 6px;">' +
          '<div style="display:inline-block;width:50%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
          "可下调裕度： " +
          '<span style="color: #009999">' +
          this.getUndefinedNull(this.realTimeData.adjDownlimit, "0") +
          "</span></div>" +
          '<div style="display:inline-block;width:50%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
          "爬坡率：" +
          '<span style="color: #009999">' +
          this.getUndefinedNull(this.realTimeData.climbRate, "0") +
          "</span></div>";
      }
      let text =
        '<div style="border:none;width:auto;min-width:320px;min-height:250px;padding:10px 10px 10px 0px;background-color:#EBFBFB;display:inline-block;position:relative">' +
        '<div style="height:14px;">' +
        '<div style="display:inline-block;width:50%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
        "名称：" +
        '<span style="color: #009999">' +
        this.getUndefinedNull(params.data.info.unitName) +
        "</span></div>" +
        '<div style="display:inline-block;width:50%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
        "编号：" +
        '<span style="color: #009999">' +
        this.getUndefinedNull(params.data.info.unitNo) +
        "</span></div>" +
        '<div style="height:14px;margin-top: 6px;">' +
        '<div style="display:inline-block;width:50%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
        "所属业主：" +
        '<span style="color: #009999">' +
        this.getUndefinedNull(params.data.info.ownerName) +
        "</span></div>" +
        '<div style="height:14px;margin-top: 6px;">' +
        '<div style="display:inline-block;width:100%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
        "所属线路：" +
        '<span style="color: #009999">' +
        this.getUndefinedNull(params.data.info.lineName) +
        "</span></div></div>" +
        '<div style="height:14px;margin-top: 13px;">' +
        '<div style="display:inline-block;width:50%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
        "所属线路编号：" +
        '<span style="color: #009999">' +
        this.getUndefinedNull(params.data.info.lineNo) +
        "</span></div>" +
        '<div style="display:inline-block;width:50%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
        "机组类型：" +
        '<span style="color: #009999">' +
        this.getUndefinedNull(params.data.info.unitType) +
        "</span></div>" +
        '<div style="height:14px;margin-top: 6px;">' +
        '<div style="display:inline-block;width:50%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
        "机组性质：" +
        '<span style="color: #009999">' +
        this.getUndefinedNull(params.data.info.unitAttr) +
        "</span></div>" +
        '<div style="display:inline-block;width:50%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
        "联系人：" +
        '<span style="color: #009999">' +
        this.getUndefinedNull(params.data.info.contactName) +
        "</span></div>" +
        '<div style="height:14px;margin-top: 6px;">' +
        '<div style="display:inline-block;width:100%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
        "联系电话：" +
        '<span style="color: #009999">' +
        this.getUndefinedNull(params.data.info.phoneNumber) +
        "</span></div></div>" +
        '<div style="height:14px;margin-top: 13px;">' +
        '<div style="display:inline-block;width:100%;font-weight: 400;font-size: 13px;color: #333333;padding-left: 10px; word-break: break-all;">' +
        "地址：" +
        '<span style="color: #009999">' +
        this.getUndefinedNull(params.data.info.registAddr) +
        "</span></div></div>" +
        successText +
        "</div>";
      return text;
    }
  },
  watch: {
    mapData() {
      this.draw();
    },
    change() {
      setTimeout(() => {
        this.resize();
      }, 200);
    }
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
