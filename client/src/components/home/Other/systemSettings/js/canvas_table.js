import orderWeek from "../../../../../assets/orderBar.png";
import orderLine from "../../../../../assets/orderLine.png";
import orderBar from "../../../../../assets/orderBar.png";
import clientWeek from "../../../../../assets/clientWeek.png";
import clientLine from "../../../../../assets/clientLine.png";
import clientBar from "../../../../../assets/clientBar.png";
// import echarts from "../../../../../static/echarts.js"; //百度图表


const options = {
	option1:{
      title:{
        text:'已完成订单',
        left:34,
        top:10,
        textStyle: {
          fontSize: '14px',
          color: '#333333',
          lineHeight:'14px',
        },
      },
      tooltip: {
       show: true,
      },
      legend: {
          orient: 'horizontal',
          x: 'left',
          bottom :0,
          left:18,
          data:[
            {
              name:'救援成功',
              icon:'circle'
            },
            {
              name:'取消救援',
              icon:'circle'
            },
            {
              name:'取消无费',
              icon:'circle'
            },
            {
              name:'救援失败',
              icon:'circle'
            }]
      },
      textStyle:{
        fontStyle: 'normal',
        fontSize: 12,
        fontFamily:'微软雅黑'
      },
      series: [
          {
              name:'已完成订单',
              type:'pie',
              radius: ['40%', '60%'],
              center: ['40%', '50%'],
              avoidLabelOverlap: false,
              label: {
                  normal: {
                      show: false,
                     
                  },
                  // emphasis: {
                  //     show: true,
                  //     position: 'outside',
                  //     formatter: "{b}"  //"{b}:\n{c}"
                  // }
              },
              // labelLine: {
              //     normal: {
              //         show: false
              //     },
              //     emphasis:{
              //       show:true,
              //       lineStyle:{
              //         color:'#ccc'
              //       }
              //     }
              // },
             
              data:[
                  {
                    value:335,
                    name:'救援成功',
                    itemStyle:{
                      normal:{
                        color:'#FFD400',
                      },
                      emphasis:{
                          shadowColor: 'rgba(0, 0, 0, 0.5)',
                          shadowBlur: 10
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)",
                      backgroundColor:"#FFD400",
                      textStyle:{
                        color:"#FF6B0E"
                      }
                    }
                  },
                  {
                    value:310, 
                    name:'取消救援',
                    itemStyle:{
                      normal:{
                        color:'#FDEFAA',

                      },
                      emphasis:{
                          shadowColor: 'rgba(0, 0, 0, 0.5)',
                          shadowBlur: 10
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)",
                      backgroundColor:"#FDEFAA",
                      textStyle:{
                        color:"#FF6B0E"
                      }
                    }
                  },
                  {
                    value:234, 
                    name:'取消无费',
                    itemStyle:{
                      normal:{
                        color:'#FFF5CE',
                      },
                      emphasis:{
                          shadowColor: 'rgba(0, 0, 0, 0.5)',
                          shadowBlur: 10
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)",
                      backgroundColor:"#FFF5CE",
                      textStyle:{
                        color:"#FF6B0E"
                      }
                    }
                  },
                  {
                    value:20, 
                    name:'救援失败',
                    itemStyle:{
                      normal:{
                        color:'#FDEFAA',
                      },
                      emphasis:{
                          shadowColor: 'rgba(0, 0, 0, 0.5)',
                          shadowBlur: 10
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)",
                      backgroundColor:"#FDEFAA",
                      textStyle:{
                        color:"#FF6B0E"
                      }
                    }
                  },
              ]
          }
      ]
    },

    option2:{
          title:{
            text:'已完成订单',
            left:34,
            top:10,
            textStyle: {
              fontSize: '14px',
              color: '#333333',
              lineHeight:'14px',
            },
          },
          tooltip: {
             show:true
          },
          legend: {
              orient: 'horizontal',
              x: 'left',
              bottom :23,
              left:16,
              data:[
                {
                  name:'救援成功',
                  icon:'circle'
                },
                {
                  name:'取消救援',
                  icon:'circle'
                },
                {
                  name:'取消无费',
                  icon:'circle'
                }
               ]
          },
          textStyle:{
            fontStyle: 'normal',
            fontSize: 12,
            fontFamily:'微软雅黑'
          },
          series: [
              {
                  name:'已完成订单',
                  type:'pie',
                  radius: ['40%', '60%'],
                  center: ['40%', '50%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: false,
                         
                      },
                      // emphasis: {
                      //     show: true,
                      //     position: 'outside',
                      //     formatter: "{b}"  //"{b}:\n{c}"
                      // }
                  },
                  // labelLine: {
                  //     normal: {
                  //         show: false
                  //     },
                  //     emphasis:{
                  //       show:true,
                  //       lineStyle:{
                  //         color:'#ccc'
                  //       }
                  //     }
                  // },
                 
                  data:[
                      {
                        value:335,
                        name:'救援成功',
                        itemStyle:{
                          normal:{
                            color:'#8DCA35',
                          },
                          emphasis:{
                              shadowColor: 'rgba(0, 0, 0, 0.5)',
                              shadowBlur: 10
                          }
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: "{a} <br/>{b}: {c} ({d}%)",
                          backgroundColor:"#8DCA35",
                          textStyle:{
                            color:"#FF6B0E"
                          }
                        }
                      },
                      {
                        value:310, 
                        name:'取消救援',
                        itemStyle:{
                          normal:{
                            color:'#B7E27A',

                          },
                          emphasis:{
                              shadowColor: 'rgba(0, 0, 0, 0.5)',
                              shadowBlur: 10
                          }
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: "{a} <br/>{b}: {c} ({d}%)",
                          backgroundColor:"#B7E27A",
                          textStyle:{
                            color:"#FF6B0E"
                          }
                        }
                      },
                      {
                        value:234, 
                        name:'取消无费',
                        itemStyle:{
                          normal:{
                            color:'#EAF3DD',
                          },
                          emphasis:{
                              shadowColor: 'rgba(0, 0, 0, 0.5)',
                              shadowBlur: 10
                          }
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: "{a} <br/>{b}: {c} ({d}%)",
                          backgroundColor:"#EAF3DD",
                          textStyle:{
                            color:"#FF6B0E"
                          }
                        }
                      },
                  ]
              }
          ]
    },

    option3:{
          title:{
            text:'客户订单数量',
            left:34,
            top:5,
            textStyle: {
              fontSize: '14px',
              color: '#333333',
              lineHeight:'14px',
              backgroundColor: 'red',
            },
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              bottom:0,
              left:40,
              data:[
                {
                  name:'订单数量',
                  icon:'circle'
                },{
                  name:'订单总额',
                  icon:'circle'
                }
              ],
          },
          grid: {
            left: '4%',
            right: '4%',
            bottom: '14%',
            top:'13%',
            containLabel: true
          },
          toolbox: {
              show: true,
              right:30,
              itemSize:20,
              itemGap:15,
              top:0,
              feature: {
                myTool2: {
                    show: true,
                    title: '切换数据',
                    icon: 'image://' + orderWeek,
                    onclick: function (){
                        alert('myToolHandler2', 'success')
                    }
                },
                magicType: {
                  type: ['line', 'bar'],
                  icon:{
                    line:'image://' + orderLine,
                    bar:'image://' + orderBar,
                  }
                },
              }
          },
          xAxis:  {
              type: 'category',
              boundaryGap : false,
              data: ['09月02日','09月03日','09月04日','09月05日','09月06日','09月07日','09月08日'],
              axisLine:{
                lineStyle:{
                  color:'#ccc'
                }
              }
          },
          yAxis: {
              type: 'value',
              axisLine:{
                lineStyle:{
                  color:'#ccc'
                }
              }
          },
          series: [
              {
                  name:'订单数量',
                  type:'line',
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0, color: '#B9DD8C' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#EBF7F0' // 100% 处的颜色
                      }], false)
                    }
                  },
                  lineStyle:{
                    normal:{
                     color:'#B9DD8C'
                    }
                  },
                  itemStyle:{
                    normal:{
                     color:'#B9DD8C'
                    }
                  },
                  data:[0, 123, 23, 462, 122, 43, 412],

              },
              {
                  name:'订单总额',
                  type:'line',
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0, color: '#39AFE0' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#E7EFEA' // 100% 处的颜色
                      }], false)
                    }
                  },
                  lineStyle:{
                    normal:{
                     color:'#39AFE0'
                    }
                  },
                  itemStyle:{
                    normal:{
                     color:'#39AFE0'
                    }
                  },
                  data:[123, 12, 123, 432, 12, 432, 12],
              }
          ]
    }
}


export default function (dom,attr) {
	echarts.init(document.getElementById(dom)).setOption(options[attr]);
    // return options;
};