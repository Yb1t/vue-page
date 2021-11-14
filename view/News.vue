<template>
  <div id="news" class="bg">
    <div class="news">
<!--轮播-->
    <el-carousel :interval="3000" arrow="always" height="410px">
      <el-carousel-item v-for="item in head" :key="item.title">
        <a v-bind:href="item.url" target="_blank" v-bind:title="item.title">
          <img v-bind:src=item.img alt='' width="100%">
        </a>
      </el-carousel-item>
    </el-carousel>
<!--内容卡片-->
    <div class="border-card" style="float: left;">
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <i class="el-icon-message-solid"></i>
          <span>桂电头条</span>
          <el-button style="float: right; padding: 3px 0" type="text">
            <el-link href="https://www.guet.edu.cn/xwzx/gdyw.htm" type="primary" target="_blank">查看更多</el-link>
          </el-button>
        </div>
        <div v-for="item in yaowen" :key="item.title" class="text item">
          <el-link :underline="false" v-bind:href="item.url" target="_blank">
            <table >
              <tr>
                <td rowspan="2">
                  <img style="border-radius: 10px; object-fit: cover; margin: 20px" v-bind:src="item.img" alt="" width="100px" height="100px"></td>
                <td><h6>{{ item.title }}</h6></td>
              </tr>
              <tr>
                <td><p>{{item.subtitle.substr(0,100)}}...</p></td>
              </tr>
            </table>
          </el-link>
          <el-divider></el-divider>
        </div>
      </el-card>
    </div>
    <div class="border-card" style="float: right;" >
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <i class="el-icon-video-camera-solid"></i>
          <span>桂电新闻</span>
          <el-button style="float: right; padding: 3px 0" type="text">
            <el-link href="https://www.guet.edu.cn/xwzx/gdxw.htm" type="primary" target="_blank">查看更多</el-link>
          </el-button>
        </div>
        <el-timeline :reverse="false">
            <el-timeline-item
              v-for="(item, index) in xinwen"
              type="primary"
              :key="index"
              :timestamp="item.timestamp">
              <el-link :href="item.url" :underline="false" target="_blank">{{item.content}}</el-link>
            </el-timeline-item>
          </el-timeline>
      </el-card>
    </div>

    <div class="border-card" style="float: right;">
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <i class="el-icon-s-custom"></i>
          <span>学术活动</span>
          <el-button style="float: right; padding: 3px 0" type="text">
            <el-link href="https://www.guet.edu.cn/xwzx/xshd.htm" type="primary" target="_blank">查看更多</el-link>
          </el-button>
        </div>
        <div v-for="item in xueshu" :key="item.title" class="text item">
          <el-link :underline="false" :href="item.url" target="_blank">
            <table >
              <tr>
                <td rowspan="2" >
                  <div class="time-block">
                    <p>{{item.time.split(' ')[0]}}</p>
                    <p style="font-size: 14px">{{item.time.split(' ')[1]}}</p>
                  </div>
                </td>
                <td><h6>{{ item.title }}</h6></td>
              </tr>
              <tr>
                <td><p>{{item.subtitle.substr(0,100)}}...</p></td>
              </tr>
            </table>
          </el-link>
          <el-divider></el-divider>
        </div>
      </el-card>
    </div>

    <div class="border-card" style="float: left;">
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <i class="el-icon-s-promotion"></i>
          <span>校园快讯</span>
          <el-button style="float: right; padding: 3px 0" type="text">
            <el-link href="https://www.guet.edu.cn/xwzx/xykx.htm" type="primary" target="_blank">查看更多</el-link>
          </el-button>
        </div>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item v-for="item in kuaixun" :key="item.id"
                            :title="item.title" :name="item.id" >
            <div>{{item.content}}</div>
            <div><p style="color: grey">{{ item.time }}</p></div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
    <div style="clear: both"></div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      head: [
        {
          title: '桂电国家级一流本科专业介绍',
          img: 'https://www.guet.edu.cn/__local/5/0B/D5/3A932C131F0DFA612D623F7BFFD_222E09F0_291D3.jpg',
          url: 'https://www.guet.edu.cn/info/1158/57954.htm'
        },
        {
          title: '学党史悟思想办实事开新局 以优异成绩迎接建党一百周年',
          img: 'https://www.guet.edu.cn/__local/7/C8/48/F6AC96567814FB8A1281D9C6358_3163E8A7_19378.jpg',
          url: 'https://www.guet.edu.cn/info/1161/55680.htm'
        },
        {
          title: '',
          img: 'https://www.guet.edu.cn/__local/9/E9/DF/C84934EC7ED22323DD2696B1D78_1E77D22F_12775.jpg',
          url: 'https://www.guet.edu.cn/info/1161/57873.htm'
        }
      ],
      yaowen: [
        {
          title: '习近平：在庆祝中国共产党成立一百周年大会上的讲话',
          subtitle: '在庆祝中国共产党成立一百周年大会上的讲话（2021年7月1日）同志们，朋友们：今天，在中国共产党历史上，在中华' +
            '民族历史上，都是一个十分重大而庄严的日子。我们在这里隆重集会，同全党全国各族人民一道，庆祝中国共产党成立一百周年，' +
            '回顾中国共产党百年奋斗的光辉历程，展望中华民族伟大复兴的光明前景。首先，我代表党中央，向全体中国共产党员致以节日的' +
            '热烈祝贺！在这里，我代表党和人民庄严宣告，经过全党全国各族人民持...',
          img: 'https://www.guet.edu.cn/__local/7/21/CC/5E41297F2B8975FDC577F630D6A_02BAC5E9_23D56.jpg',
          url: 'https://www.guet.edu.cn/info/1161/57004.htm'
        },
        {
          title: '习近平在党史学习教育动员大会上强调 学党史悟思想办实事开新局 以优异成绩迎接建党一百周年',
          subtitle: '习近平在党史学习教育动员大会上强调学党史悟思想办实事开新局以优异成绩迎接建党一百周年李克强栗战书汪洋赵乐际' +
            '韩正王岐山出席 王沪宁主持■在全党开展党史学习教育，是党中央立足党的百年历史新起点、统筹中华民族伟大复兴战略全局和世' +
            '界百年未有之大变局、为动员全党全国满怀信心投身全面建设社会主义现代化国家而作出的重大决策。全党同志要做到学史明理、' +
            '学史增信、学史崇德、学史力行，学党史、悟思想、办实事、开新局，...',
          img: 'https://www.guet.edu.cn/__local/4/A0/8E/03E0DCB8BC295AACC1FB3D65DDA_EC53D387_2BAC6.jpg',
          url: 'https://www.guet.edu.cn/info/1161/55680.htm'
        },
        {
          title: '这类返桂来桂人员至少提前24小时报备！广西部署加强当前疫情防控工作',
          subtitle: '近期，国外疫情仍处于较高流行水平，部分周边国家疫情快速上升，我国外防输入压力持续加大。截至10月29日24时，' +
            '近14天内，全国有14个省份报告新增本土确诊病例或无症状感染者，当前疫情仍呈快速发展态势，防控形势严峻复杂。近日，' +
            '自治区疫情防控工作领导小组发布关于加强当前新冠肺炎疫情防控工作的通知，对当前全区疫情防控进行再部署再落实。强调要' +
            '强化风险地区返桂来桂人员管理，强化重点人员协查区域联动，强化入境人员闭...',
          img: 'https://www.guet.edu.cn/__local/E/10/71/8DCB43FA73DFD48873B7BBFEA87_1F15F858_90D1.jpg',
          url: 'https://www.guet.edu.cn/info/1161/57873.htm'
        }
      ],
      xinwen: [
        {
          content: '我校师生热议十九届六中全会精神',
          timestamp: '2021-11-13',
          url: 'https://www.guet.edu.cn/info/1151/58012.htm'
        },
        {
          content: ' 广西2022届信息技术类高校毕业生就业双向选择洽谈会在我校举行',
          timestamp: '2021-11-12',
          url: 'https://www.guet.edu.cn/info/1151/58007.htm'
        },
        {
          content: '自治区党委副书记刘小明到我校考察调研',
          timestamp: '2021-11-10',
          url: 'https://www.guet.edu.cn/info/1151/57988.htm'
        },
        {
          content: ' 【党史学习教育】我校党史学习教育第二期专题读书班开班',
          timestamp: '2021-11-08',
          url: 'https://www.guet.edu.cn/info/1151/57929.htm'
        },
        {
          content: '我校崔译文同学荣获全国道德模范荣誉称号',
          timestamp: '2021-11-06',
          url: 'https://www.guet.edu.cn/info/1151/57927.htm'
        },
        {
          content: '《广西日报》聚焦我校课程改革创新纪实',
          timestamp: '2021-11-04',
          url: 'https://www.guet.edu.cn/info/1151/57908.htm'
        }
      ],
      activeName: '1',
      kuaixun: [
        {
          id: '1',
          title: '学校召开第三届党委第三轮巡察工作会议',
          content: '11月5日下午，学校在花江校区办公楼422室召开第三届党委第三轮巡察工作会议。学校党委巡察工作领导小组成员、纪委书记梁启谈出席会议。会议由党委巡察工作办公室主任邓义江主持。',
          time: '2021-11-11'
        },
        {
          id: '2',
          title: '学校第十四届主持人大赛落幕',
          content: '11月7日下午，由校团委主办，材料科学与工程学院承办的第十四届“声随梦想起，音伴青春行”校园主持人大赛在红亮学生活动中心一楼演艺厅举行。' +
            '经过初赛的层层选拔，来自全校的十四名选手进入决赛。本次决赛分为请您记住我、精彩看我的、青春大视野三个环节，比赛精彩纷呈，选手们表现非常出色，整个演艺厅散发着语言魅力，飞扬着自信风采，洋溢着青春活力。经过激烈角逐，国防生学院的黄甫殊典和商学院的王烁程获得一等奖。',
          time: '2021-11-11'
        },
        {
          id: '3',
          title: '学校开展厨艺大赛',
          content: '11月5日下午，后勤处在花江校区二楼教工餐厅食堂举办以“文明多彩饮食，健康快乐生活”为主题的第十一届厨艺大赛，9名白案厨师和17名红案厨师共26名厨师参加了比赛。' +
            '本次比赛分为白案和红案两个项目，其中有白案3类作品：小笼包、葱香小花卷、地方风味；红案2类作品：清炒土豆丝、筵席热菜。选手们纷纷亮出自己的绝活，展示自己的精湛厨艺。通过厨艺大赛，进一步提升厨艺技能，做好师生服务工作。',
          time: '2021-11-10'
        }
      ],
      xueshu: [
        {
          title: '关于电子工程与自动化学院邓洪昌研究员开展2022年度国家自然科学基金项目申报培训的预告',
          subtitle: '应学校科学技术发展研究院邀请，电子工程与自动化学院邓洪昌研究员将于2021年11月12日晚通过腾讯会议做国基申报专题报告。欢迎广大青年博士、教师踊跃参加。',
          time: '11月12日 20:00-21:00',
          place: '腾讯会议 ID：510 681 409',
          url: 'https://www.guet.edu.cn/info/1157/57948.htm'
        },
        {
          title: '关于召开桂林电子科技大学第五期学术沙龙主题报告的预告',
          subtitle: '沙龙主题：多学科交叉融合的智能制造技术与企业转型升级发展',
          time: '11月11日 19:30-21:30',
          place: '百悦酒店二楼两广馆',
          url: 'https://www.guet.edu.cn/info/1157/57930.htm'
        },
        {
          title: '关于广西师范大学程民权教授、钟必能教授、邓清勇副教授来校讲学的预告',
          subtitle: '应信息与通信学院邀请，广西师范大学程民权教授、钟必能教授、邓清勇副教授一行将来校讲座，欢迎全校师生踊跃参加。',
          time: '10月28日 下午15:00',
          place: '金鸡岭校区E电3',
          url: 'https://www.guet.edu.cn/info/1157/57830.htm'
        }
      ]
    }
  }
}
</script>

<style scoped>
.bg {
  padding: 20px 0;
  background-image: linear-gradient(25deg, #0c0ea6, #6c3d9a, #9b6a8c, #c1987b)
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  text-align: center;
  margin: 0;
}
.news {
  width: 1280px;
  margin: 30px auto;
}

.border-card {
  margin: 20px 0;
  width: 49%;
}

.time-block {
  padding: 10px;
  margin: 10px;
  min-width: 100px;
  height: 100px;
  border:1px solid #BBB;
  border-radius: 10px;
}

.time-block p{
  text-align: center;
  font-size: 18px;
  color: grey;
}

</style>
