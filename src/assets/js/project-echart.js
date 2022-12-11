import echarts from "echarts";
export let pie1 = (data) => {
  let option = {
    color: ['#C3B6E6', '#A3D2F6', '#71D4D4', '#CEDD79', '#FACFA9', '#FFCC02'],
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
        name: '车型占比',
        type: 'pie',
        radius: '50%',
        top: '10%',
        roseType: 'radius',
        data: data,
        label: {
          formatter: '{b}: {d}%'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        //初始动画效果
        animationType: 'scale',
        animationTypeUpdate: 'expansition',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 300;
        }
      }
    ]
  };
  return option;
}
export let pie2 = (data) => {
  let option = {
    color: ['#C3B6E6', '#A3D2F6', '#71D4D4', '#CEDD79', '#FACFA9', '#96FED1','#CECEFF'],
    tooltip: {
      trigger: 'item',
      backgroundColor: '#fff',
      textStyle: {
        color: '#5c6c7c'
      },
      padding: [10, 10],
      extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
    },
    // legend: {
    //   icon: 'circle',
    //   orient: 'horizontal',
    //   top: '2%',
    //   itemWidth: 10,
    //   textStyle: {
    //     color: '#565454',
    //   }
    // },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '70%'],
        top:'5%',
        avoidLabelOverlap: false,
        label: {
          formatter: '{b}: {d}%'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          show: true
        },
        data:data
      }
    ]
  };
  return option;
}
export let pie3 = (data) => {
  let option = {
    color: ['#C3B6E6', '#A3D2F6', 'rgba(102,159,239,1)', '#8EEBF7', '#FACFA9', '#FFCC01'],
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
        name: '2',
        type: 'pie',
        top:'16%',
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };
  return option;
}
export let bar1 = (data) => {
  let option = {
    title:{
      text:'',
      left:'right',
      textStyle:{
      fontSize:12,
      color:'#34A9FF'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter:'{a}:{c}万人次',
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
      top: '6%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      type: 'category',
      data: data.y,
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
        data: data.value,
        color: '#34A9FF',
        itemStyle: {
          barBorderRadius: 15
        },
        barWidth: 15,
        label: {
          show: true, //开启显示
          formatter:'{c}万人次/日',
          position: 'right', //在上方显示
          textStyle: { //数值样式
            color: '#34A9FF',
            fontSize: 11
          }
        }
      }
    ]
  };
  return option;
}
export let bar2 = (data) => {
  let option = {
    color: ['#59CEF5', '#C3B6E6'],
    legend: {
      orient: 'horizontal',
      top: '6%',
      itemWidth: 20,
      textStyle: {
        color: '#565454',
      }
    },
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
      data:data['x'],
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
      data: data.value,
      type: 'bar',
      barWidth:12,
      label: {
        show: true, //开启显示
        position: 'top', //在上方显示
        textStyle: { //数值样式
          color: '#59CEF5',
          fontSize: 13
        }
      }
    }]
  };
  return option;
}