import echarts from "echarts";
export let trainbar1 = (width,length,train_type) => {
  console.log(train_type,'1')
  let option = {
    legend: {
      orient: 'horizontal',
      top: '6%',
      itemWidth: 20,
      textStyle: {
        color: '#565454',
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
          backgroundColor: '#fff',
          color: '#556677',
          borderColor: 'rgba(0,0,0,0)',
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetY: 0
        },
        lineStyle: {
          width: 0
        }
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#5c6c7c'
      },
      padding: [10, 10],
      extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
    },
    grid: {
      left: '15%',
      bottom: '12%'
    },
    xAxis: {
      type: 'category',
      data: train_type,
      axisLabel: { //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        margin: 15,
        textStyle: {
          color: '#565454',
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false  //隐藏刻度
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: { //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        margin: 15,
        textStyle: {
          color: '#565454',
        }
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#E3E3E3'
        }
      },
      axisTick: {
        show: false  //隐藏刻度
      },
    },
    series: [{
      name: '车长/m',
      data: length,
      type: 'bar',
      barWidth: '20px',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(102,159,239,1)'
          }, {
            offset: 1,
            color: 'rgba(170,202,246,1)'
          }], false)
        }
      },
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      }
    }, {
      name: '车宽/m',
      data: width,
      type: 'bar',
      barWidth: '20px',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#8EEBF7'
          }, {
            offset: 1,
            color: 'rgba(170,202,246,1)'
          }], false)
        }
      },
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      }
    }]
  };
  return option;
}
export const trainline = (name,train_type,data) => {
  let option = {
    toolbox: {
      show: false
    },
    color: ['#9E87FF', '#73DD39'],
    legend: {
      icon: 'circle',
      top: 0,
      right: 0,
      itemWidth:28,
      itemGap: 10,
      textStyle: {
        color: '#556677'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter:'{a}:{c}km/h',
      axisPointer: {
        type: 'line',
        label: {
          show: true,
          backgroundColor: '#fff',
          color: '#556677',
          borderColor: 'rgba(0,0,0,0)',
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetY: 0
        },
        lineStyle: {
          width: 0
        }
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#5c6c7c'
      },
      padding: [10, 10],
      extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
    },
    grid: {
      top: '15%',
      left: '10%',
      right: '10%'
    },
    xAxis: [{
      type: 'category',
      data: train_type,
      axisLine: {
        lineStyle: {
          color: '#DCE2E8'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: '#556677'
        },
        // 默认x轴字体大小
        fontSize: 12,
        // margin:文字到x轴的距离
        margin: 15
      },
      axisPointer: {
        label: {
          padding: [0, 0, 10, 0],
          margin: 15,
          fontSize: 12,
          backgroundColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#fff'
            }, {
              offset: 0.86,
              color: '#fff'
            }, {
              offset: 0.86,
              color: '#33c0cd'
            }, {
              offset: 1,
              color: '#33c0cd'
            }],
            global: false
          }
        }
      },
      boundaryGap: false
    }],
    yAxis: [{
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#DCE2E8'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#556677'
        },
      },
      splitLine: {
        show: false
      }
    }],
    series: [{
      name: name,
      type: 'line',
      data: data,
      symbolSize: 1,
      symbol: 'circle',
      smooth: true,
      yAxisIndex: 0,
      showSymbol: false,
      lineStyle: {
        width: 3,
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
          offset: 0,
          color: '#9effff'
        },
        {
          offset: 1,
          color: '#9E87FF'
        }
        ]),
        shadowColor: 'rgba(158,135,255, 0.3)',
        shadowBlur: 5,
        shadowOffsetY: 20
      },
      //图表标线
      markLine: {
        silent: true,
        
        data: [{ type: 'average', name: '平均值' }],
        label:{
          position:'top',
          formatter:'{c}km/h'
        }
      },
      markPoint: {
        symbol: 'pin',
        symbolSize:'40',
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ],
        label:{
          formatter:'{c}km/h'
        }
        
      }
    }, 
    // {
    //   name: '取消',
    //   type: 'line',
    //   data: [14, 54, 63, 13, 14, 33, 26, 37],
    //   symbolSize: 1,
    //   symbol: 'circle',
    //   smooth: true,
    //   yAxisIndex: 0,
    //   showSymbol: false,
    //   lineStyle: {
    //     width: 3,
    //     color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
    //       offset: 0,
    //       color: '#73DD39'
    //     },
    //     {
    //       offset: 1,
    //       color: '#73DDFF'
    //     }
    //     ]),
    //     shadowColor: 'rgba(115,221,255, 0.3)',
    //     shadowBlur: 5,
    //     shadowOffsetY: 20
    //   },
    //   markLine: {
    //     silent: true,
    //     data: [{ type: 'average', name: '平均值' }]
    //   },
    //   markPoint: {
    //     symbol: 'pin',
    //     data: [
    //       { type: 'max', name: '最大值' },
    //       { type: 'min', name: '最小值' }
    //     ]
    //   }
    // }
    ]
  };
  return option
}
export const trainline1 = (name,train_type,data) => {
  let option = {
    toolbox: {
      show: false
    },
    color: ['#9E87FF', '#73DD39'],
    legend: {
      icon: 'circle',
      top: 0,
      right: 0,
      itemWidth:28,
      itemGap: 10,
      textStyle: {
        color: '#556677'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter:'{a}:{c}万',
      axisPointer: {
        type: 'line',
        label: {
          show: true,
          backgroundColor: '#fff',
          color: '#556677',
          borderColor: 'rgba(0,0,0,0)',
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetY: 0
        },
        lineStyle: {
          width: 0
        }
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#5c6c7c'
      },
      padding: [10, 10],
      extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
    },
    grid: {
      top: '15%',
      left: '10%',
      right: '10%'
    },
    xAxis: [{
      type: 'category',
      data: train_type,
      axisLine: {
        lineStyle: {
          color: '#DCE2E8'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: '#556677'
        },
        // 默认x轴字体大小
        fontSize: 12,
        // margin:文字到x轴的距离
        margin: 15
      },
      axisPointer: {
        label: {
          padding: [0, 0, 10, 0],
          margin: 15,
          fontSize: 12,
          backgroundColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#fff'
            }, {
              offset: 0.86,
              color: '#fff'
            }, {
              offset: 0.86,
              color: '#33c0cd'
            }, {
              offset: 1,
              color: '#33c0cd'
            }],
            global: false
          }
        }
      },
      boundaryGap: false
    }],
    yAxis: [{
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#DCE2E8'
        },
        formatter:'{value}万'
      },
      axisLabel: {
        textStyle: {
          color: '#556677'
        }
      },
      splitLine: {
        show: false
      }
    }],
    series: [{
      name: name,
      type: 'line',
      data: data,
      symbolSize: 1,
      symbol: 'circle',
      smooth: true,
      yAxisIndex: 0,
      showSymbol: false,
      lineStyle: {
        width: 3,
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
          offset: 0,
          color: '#9effff'
        },
        {
          offset: 1,
          color: '#9E87FF'
        }
        ]),
        shadowColor: 'rgba(158,135,255, 0.3)',
        shadowBlur: 5,
        shadowOffsetY: 20
      },
      //图表标线
      markLine: {
        silent: true,
        data: [{ type: 'average', name: '平均值' }],
        label:{
          formatter:'{c}万'
        }
      },
      markPoint: {
        symbol: 'pin',
        symbolSize:'40',
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ],
        label:{
          formatter:'{c}万'
        }
      }
    }, 
    // {
    //   name: '取消',
    //   type: 'line',
    //   data: [14, 54, 63, 13, 14, 33, 26, 37],
    //   symbolSize: 1,
    //   symbol: 'circle',
    //   smooth: true,
    //   yAxisIndex: 0,
    //   showSymbol: false,
    //   lineStyle: {
    //     width: 3,
    //     color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
    //       offset: 0,
    //       color: '#73DD39'
    //     },
    //     {
    //       offset: 1,
    //       color: '#73DDFF'
    //     }
    //     ]),
    //     shadowColor: 'rgba(115,221,255, 0.3)',
    //     shadowBlur: 5,
    //     shadowOffsetY: 20
    //   },
    //   markLine: {
    //     silent: true,
    //     data: [{ type: 'average', name: '平均值' }]
    //   },
    //   markPoint: {
    //     symbol: 'pin',
    //     data: [
    //       { type: 'max', name: '最大值' },
    //       { type: 'min', name: '最小值' }
    //     ]
    //   }
    // }
    ]
  };
  return option
}
export let trainbar2 = (train_name,passenger_capacity) => {
  let option = {
    tooltip: {
      trigger: 'axis',
      formatter:'{a}:{c}人/组',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#5c6c7c'
      },
      padding: [10, 10],
      extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
    },
    grid: {
      left: '3%',
      right: '5%',
      top: '5%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      show: false
    },
    yAxis: {
      type: 'category',
      data: train_name,
      inverse: true,
      axisLabel: { //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        margin: 15,
        textStyle: {
          color: '#565454',
          fontSize: 12
        }
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#DCE2E8'
        }
      },
      axisTick: {
        show: false  //隐藏刻度
      },
      splitLine: {
        lineStyle: {
          color: '#DCE2E8'
        },
      }

    },
    series: [
      {
        name: '客流量',
        type: 'bar',
        data: passenger_capacity,
        color: '#34A9FF',
        itemStyle: {
          barBorderRadius: 15
        },
        barWidth: 15,
        label: {
          show: true, //开启显示
          position: 'right', //在上方显示
          textStyle: { //数值样式
            color: '#34A9FF',
            fontSize: 13
          }
        }
      }
    ]
  };
  return option;
}
export let trainpie = (driving_type,power_type) => {
  let option = {
    color: ['#C3B6E6', '#A3D2F6', 'rgba(102,159,239,1)', '#8EEBF7', '#97CBFF', '#FFCC02'],
    tooltip: {
      trigger: 'item',
      backgroundColor: '#fff',
      textStyle: {
        color: '#5c6c7c'
      },
      padding: [10, 10],
      extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
    },
    legend: {
      icon: 'circle',
      orient: 'horizontal',
      top: '6%',
      itemWidth: 10,
      textStyle: {
        color: '#565454',
      }
    },
    series: [
      {
        name: '驾驶方式',
        type: 'pie',
        radius: ['45%', '60%'],
        avoidLabelOverlap: false,
        right: '40%',
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '28',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: driving_type
      },
      {
        name: '供电方式',
        type: 'pie',
        radius: ['45%', '60%'],
        avoidLabelOverlap: false,
        left: '40%',
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '28',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: power_type
      }
    ]
  };
  return option;
}
export let trainrader = (train) => {
  let option = {
    color: ['#9E87FF', '#73DD39','rgba(102,159,239,1)', '#8EEBF7'],
    tooltip: {
      backgroundColor: '#fff',
      textStyle: {
        color: '#5c6c7c'
      },
      padding: [10, 10],
      extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
    },
    legend: {
      type: "scroll",
      icon: "roundRect",
      right: '0',
      bottom: '0',
      itemGap: 10,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: '12',
        color: '#656565',
      },
    },
    radar: {
      // shape: 'circle',
      radius:'60%',
      splitArea: {
        areaStyle: {
            color: [ '#FFFFFF', '#F5F9FF', ].reverse(),
        }
    },
      name: {
        textStyle: {
          color: '#5c6c7c',
          backgroundColor: '#fff',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      
      indicator: [
        { name: '车长/米', max: 30 },
        { name: '车宽/米', max: 5 },
        { name: '速度(km/h)', max: 400 },
        { name: '价格/万', max: 2000 },
        { name: '载客量(人/节)', max: 500 },
      ]
    },
    series: [{
      name: '总体',
      type: 'radar',
      // areaStyle: {normal: {}},
      data: train
    }]
  };
  return option
}
export let trainbar3 = (x,value) => {
  let option = {
    color: ['#59CEF5', '#C3B6E6'],
    tooltip: {
      trigger: 'item',
      backgroundColor: '#fff',
      textStyle: {
        color: '#5c6c7c'
      },
      padding: [10, 10],
      extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
    },
    grid:{
      left:'15%',
      bottom:'15%'
    },
    xAxis: {
      type: 'category',
      data:x,
      axisLabel: { //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        rotate:15,
        margin: 10,
        textStyle: {
          color: '#565454',
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false  //隐藏刻度
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: { //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        margin: 15,
        textStyle: {
          color: '#565454',
        }
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#E3E3E3'
        }
      },
      axisTick: {
        show: false  //隐藏刻度
      },
    },
    series: [{
      data: value,
      type: 'bar',
      barWidth:12,
      label: {
        show: true, //开启显示
        position: 'top', //在上方显示
        formatter:'{c}km/h',
        textStyle: { //数值样式
          color: '#59CEF5',
          fontSize: 13
        }
      }
    }]
  };
  return option;
}
export let trainbar4 = (x,value) => {
  let option = {
    color: ['#59CEF5', '#C3B6E6'],
    tooltip: {
      trigger: 'item',
      backgroundColor: '#fff',
      textStyle: {
        color: '#5c6c7c'
      },
      padding: [10, 10],
      extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
    },
    grid:{
      left:'15%',
      bottom:'15%'
    },
    xAxis: {
      type: 'category',
      data:x,
      axisLabel: { //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        rotate:15,
        margin: 10,
        textStyle: {
          color: '#565454',
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false  //隐藏刻度
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: { //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        margin: 15,
        textStyle: {
          color: '#565454',
        }
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#E3E3E3'
        }
      },
      axisTick: {
        show: false  //隐藏刻度
      },
    },
    series: [{
      data: value,
      type: 'bar',
      barWidth:12,
      label: {
        show: true, //开启显示
        position: 'top', //在上方显示
        formatter:'{c}万/节',
        textStyle: { //数值样式
          color: '#59CEF5',
          fontSize: 13
        }
      }
    }]
  };
  return option;
}