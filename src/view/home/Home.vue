<template>
  <div id="home">
  <nav-bar class="home-nav">
    <div slot="center">购物街</div>
  </nav-bar>
    <tab-control  class="tab-control" :titles="['流行','新款','精选']"
                  @tabClick="tabClick" ref="tabControl1" v-show="istabFixed"/>
    <scroll class="wrapper" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
          </a>
        </swiper-item>
      </swiper>

      <recommend-view :recommends="recommends"/>
      <fashion-view/>
      <tab-control  class="tab-control" :titles="['流行','新款','精选']"
                    @tabClick="tabClick" ref="tabControl2"
                    :class="{fixed:istabFixed}"/>
      <goods-list :goods="goods[currenType].list"/>
    </scroll>
    <backtop @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {gethomemultidata,gethomegoods} from "../../network/home";
  import {Swiper,SwiperItem} from "../../components/common/swiper/index";
  import RecommendView from "./childComps/RecommendView";
  import FashionView from "./childComps/FashionView";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import Backtop from "../../components/content/backtop/Backtop";


  export default {
    name: "Home",
    components: {
      Backtop,
      Scroll,
      TabControl,
      FashionView,
      RecommendView,
      NavBar,
      Swiper,
      SwiperItem,
      GoodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currenType: 'pop',
        isShow: false,
        TaboffsetTop: 0,
        isload: true,
        istabFixed:false,
        saveY:0
      }
    },
    created() {
      this.gethomeMultidata();
      this.gethomeGoods('pop');
      this.gethomeGoods('new');
      this.gethomeGoods('sell');

    },
    destroyed() {
      console.log('qqq')
    },

    activated() {
      this.$refs.scroll.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.scroll.refresh();
    },
    deactivated() {
      //记录home离开时的位置
      this.saveY=this.$refs.scroll.scroll.y;
    },
    mounted() {
      // const refresh= this.debounce(this.$refs.scroll.scroll.refresh,300);
      //监听图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        //解决首页可滚动区域bug
        this.$refs.scroll.scroll.refresh();
        //refresh();
      })
      //获取tabControl的offsetTop
      //所有组件都有一个$el来获取组件元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    methods: {
     /*debounce(func,delay){
             let timer=null;
             return function(...args){
               if(timer) clearTimeout(timer);
                timer=setTimeout(()=>{
                  console.log(this);
                   // func.apply(this,args)
                  func();
                },delay)

             }
          },*/
      gethomeMultidata() {
        gethomemultidata().then(res => {
          console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      gethomeGoods(type) {
        const page = this.goods[type].page + 1;
        gethomegoods(type, page).then(res => {
          console.log(res.data.list);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          //this.$refs.scroll.scroll.finishPullUp();
        })
      },
      //首页 三个标题的切换
      tabClick(index) {
        switch (index) {
          case 0:
            this.currenType = 'pop'
            break;
          case 1:
            this.currenType = 'new'
            break;
          case 2:
            this.currenType = 'sell'
        }
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;
      },
      //返回顶部
      backClick() {
        this.$refs.scroll.scroll.scrollTo(0, 0, 500);
      },
      //BackTop组件的显示与隐藏
      contentScroll(position) {
        this.isShow = (-position.y) > 1000;
        this.istabFixed=(-position.y)>this.tabOffsetTop;
      },
      //下拉加载更多
      loadMore() {
        this.gethomeGoods(this.currenType);
      },
      imageLoad() {
        if (this.isload) {
          this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
        }
        this.isload= false;
      }
    }
  }
</script>

<style scoped>
  #home{
    height:100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color: #f6f6f6;

}
  .tab-control{
   position:relative;
    z-index:9;
  }

  .wrapper{
    overflow: hidden;
    position:absolute;
    bottom:49px;
    top:44px;
  }

</style>
、
