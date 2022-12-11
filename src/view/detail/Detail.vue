<template>
<div id="detail" class="detail" >
  <detail-nav-bar @titleClick="titleClick" ref="nav"/>
  <scroll class="content" ref="scroll1"  @scroll="contentScroll">
    <detail-swiper :top-images="topImages" />
    <detail-base-info :goods="goodsInfo"/>
    <detail-shop-info :shop="shopInfo"/>
    <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
    <detail-params-info  ref="params" :item-params="itemParams"/>
    <detail-comment-info ref="comment"  :comment-info="commentInfo"/>

  </scroll>
  <backtop v-show="isShow"  @click.native="backClick"/>
  <detail-bottom-bar @addCart="addtoCart"/>
</div>
</template>

<script>
    import {debounce} from "../../common/common";
    import {getDetail,Goods} from "../../network/detail";
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/detailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import Scroll from "../../components/common/scroll/Scroll";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamsInfo from "./childComps/DetailParamsInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import Backtop from "../../components/content/backtop/Backtop";
    export default {
      name: "Detail",
      components: {
        Backtop,
        DetailBottomBar,
        DetailCommentInfo,
        DetailParamsInfo,
        DetailGoodsInfo,
        DetailShopInfo,
        Scroll,
        DetailBaseInfo,
        DetailSwiper,
        DetailNavBar
      },
      data(){
          return{
            iid:null,
            topImages:[],
            goodsInfo:{},
            shopInfo:{},
            detailInfo:{},
            itemParams:{},
            commentInfo:{},
            themeTops:[],
            getTopsy:null,
            currentIndex:0,
            isShow:false
          }
      },
      created(){
          this.iid=this.$route.params.iid;
          getDetail(this.iid).then(res=> {
            console.log(res);
            this.topImages = res.result.itemInfo.topImages;
            this.goodsInfo = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services);
            this.shopInfo = res.result.shopInfo;
            this.detailInfo = res.result.detailInfo;
            this.itemParams = res.result.itemParams;

            if (res.result.rate.cRate !== 0) {
              this.commentInfo = res.result.rate.list[0];
            }
            this.getTopsy=debounce(()=>{
              this.themeTops=[]
              this.themeTops.push(0);
              this.themeTops.push(this.$refs.params.$el.offsetTop- 44);
              this.themeTops.push(this.$refs.comment.$el.offsetTop- 44);
            },500)
          })
      },

      methods:{
        detailImageLoad(){
          this.$refs.scroll1.scroll.refresh();
          this.getTopsy();
        },
        titleClick(index){
         this.$refs.scroll1.scroll.scrollTo(0,-this.themeTops[index],200)
        },
        contentScroll(position){
          this.isShow = (-position.y) > 500;
          const y =-position.y
          let len=this.themeTops.length;
          for(let i=0;i<len;i++){
            if((i<len-1&&y>(this.themeTops[i]-44)&&y<(this.themeTops[i+1])-44)||(i===len-1&&y>(this.themeTops[i])-44))
            {
                  this.currentIndex=i;
                  this.$refs.nav.currentIndex=this.currentIndex;
            }
          }
        },
        backClick() {
          this.$refs.scroll1.scroll.scrollTo(0, 0, 500);
        },
        addtoCart(){
            const product={}
            product.image=this.topImages[0];
            product.title=this.goodsInfo.title;
            product.desc=this.goodsInfo.desc;
            product.price=this.goodsInfo.realPrice;
            product.iid=this.iid;
            this.$store.commit('addCart',product);

            //添加购物车成功

        }
      }
    }
</script>

<style scoped>
.detail{
  height: 100vh;
  background-color: #ffffff;
  position:relative;
  z-index:1;
}
  .content{
    background-color:  #ffffff;
    height: calc(100% - 93px);
  }
</style>
