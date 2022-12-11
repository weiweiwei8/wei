import Js2WordCloud from 'js2wordcloud'
export let loption3 = {
  // imageShape: require('../images/bg1.jpg'),
  fontSizeFactor: 0.1,  // 当词云值相差太大，可设置此值进字体行大小微调，默认0.1
  maxFontSize: 60,      // 最大fontSize，用来控制weightFactor，默认60
  minFontSize: 12,      // 最大fontSize，用来控制weightFactor，默认60
  gridSize: 6,          // 密集程度 数字越小越密集
  weightFactor: 1,      // 字体大小=原始大小*weightFactor
  fontWeight: 'normal', //字体粗细
  fontFamily: 'Times, serif', // 字体
  color: 'random-light', // 字体颜色 'random-dark' 或者 'random-light'
  backgroundColor: 'transparent', // 背景颜色
  rotateRatio: 0.8, // 字体倾斜(旋转)概率，1代表总是倾斜(旋转)
  tooltip: {
    show: false,
    backgroundColor: 'rgba(0, 0, 0, 0.701961)',         // 默认：'rgba(0, 0, 0, 0.701961)'
    formatter: function (item) {                         // 数据格式化函数，item为list的一项
    }
  },
  noDataLoadingOption: {                                  // 无数据提示。
    backgroundColor: '#888',
    text: '暂无数据',
  },
  list: [
    ['1',10],['2',31],['3',16],['4',9],['5',55],['6',64],['7',78],['8',19],['9',1],['10',22],['wo',66],['哦',16],['wV',6],['So',26],['D',64],['w是o',27],['地方',38]
   ]
}