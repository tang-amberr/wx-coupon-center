<template>
  <div class="coupon-list-card">
    <van-config-provider :theme-vars="themeVars">
      <van-tabs title-active-color="#0f0" class="van-tab-body" line-width="0" v-model:active="activeCategory" :before-change="tabClick">
        <van-tab class="van-tab-item" v-for="item in couponLinkCategoryList" :title="item.cps_category_name"/>
      </van-tabs>

      <van-list
          :finished="finished"
          finished-text="没有更多了"
      >
        <div v-for="(item, index) in couponLinkList" :key="index">
          <!-- 分类标题 -->
          <div :id="`category-${item.cps_link_category_id}`" class="category-title">{{ categoryMap.get(item.cps_link_category_id) }}</div>
          <van-card
              class="coupon-list-van-card"
              :key="item.id"
              :title="item.cps_link_name"
              :thumb="'https://store.ssccn.cn' + item.cps_link_icon_url"
          >
            <template #footer>
              <div class="coupon-list-card-footer">
                <div class="coupon-list-card-footer-context">{{item.cps_link_desc}}</div>
                <div v-if="item.cps_link_type === 2">
                  <wx-open-launch-weapp
                      id="launch-btn"
                      appid="wx12345678"
                      path="pages/home/index?user=123&action=abc"
                  >
                    <van-image class="coupon-list-card-footer-tobuy" src="/src/assets/tobuy.png"/>
                  </wx-open-launch-weapp>
                </div>
                <div v-if="item.cps_link_type === 1" @click="openExternalH5(item.cps_link_path)">
                  <van-image class="coupon-list-card-footer-tobuy" src="/src/assets/tobuy.png"/>
                </div>
              </div>
            </template>
          </van-card>
        </div>

      </van-list>
    </van-config-provider>

  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import MyAxios from "@/api/axios.ts";
import wx from 'weixin-js-sdk';

const couponLinkList = ref([]);
const couponLinkCategoryList = ref([]);
// 分类map
const categoryMap = ref(Map<number, string>);
const activeCategory = ref(0);
const loading = ref(false);
const finished = ref(false);
const themeVars = reactive({
  vanCardThumbSize: '222px',
});

// 切换tab
const tabClick = (index: number) => {
  const element = document.getElementById(`category-${couponLinkCategoryList.value[index].id}`);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth', // 平滑滚动
      block: 'start'      // 对齐到视口顶部
    });
  }
  return true;
}

// 获取领券链接列表
const couponLinkLoad = (id: number=0) => {
  loading.value = true;
  MyAxios.post('/link/list',{
    'current': 1,
    'page_size': 1000,
    'cps_link_platform': 2 ,
    'cps_link_category_id': id,
  }).then(res => {
    couponLinkList.value = res.list.sort((a, b) => {
      return a.cps_link_category_id - b.cps_link_category_id;
    });
  }).catch(error => {
    console.error('Error fetching coupon links:', error);
    // 可以在这里设置错误状态或显示错误消息
  })
  .finally(() => {
    loading.value = false;
    console.log('couponLinkList.value: ', couponLinkList.value);
  });
}

// 获取领券链接分类列表
const couponLinkCategoryLoad = () => {
  MyAxios.post('/link/category/list',{
    'current': 1,
    'page_size': 1000,
    'cps_category_platform': 2,
  }).then(res => {
    couponLinkCategoryList.value = res.list.sort((a, b) => {
      return a.id - b.id;
    });
    categoryMap.value = new Map(res.list.map(item => [item.id, item.cps_category_name]));
    console.log('categoryMap.value: ', categoryMap.value)
  }).catch(error => {
    console.error('Error fetching coupon links:', error);
    // 可以在这里设置错误状态或显示错误消息
  })
  .finally(() => {
    loading.value = false;
  });
}

// 跳转其他h5页面
const openExternalH5 = (path : string) => {
  // window.open(path, '_blank'); // 新标签页打开
  location.href = path // 当前页跳转
};

onMounted(() => {
  couponLinkLoad();
  couponLinkCategoryLoad();
})
</script>

<style scoped>
  .coupon-list-card {
    padding: 0 1.25rem 1.25rem;
  }

  .coupon-list-van-card {
    border-radius: 0.5rem;
  }

  :deep(.van-card) {
    padding: 8px;
  }

  :deep(.van-card__thumb) {
    --van-card-thumb-size: 100%;
  }

  :deep(.van-tabs) {
    --van-tabs-line-height: 2rem;
    margin-bottom: 1rem;
  }

  :deep(.van-tabs__wrap) {
    border-radius: 2rem;
  }

  .van-tab-body :deep(.van-tabs__nav) {
    --van-tab-font-size: 0.7rem;
    --van-tab-text-color: rgb(155,155,155);
    --van-tab-active-text-color:  rgb(22,22,22);
    --van-tabs-line-height: 8rem;
    --van-tab-active-text-background-color: rgb(255,204,32);
  }

  :deep(.van-tab) {
    flex: none;    /* 禁止伸缩 */
    width: 4rem;   /* 宽度由内容决定 */
    min-width: 3rem;
    //background-color: rgb(255,204,32);
  }

  .category-title {
    margin-top: 1rem;
    font-size: 16px;
    font-weight: bold;
    color: green;
    background-color: #f7f8fa;
    border-bottom: 1px solid #ebedf0;
  }

  .coupon-list-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .coupon-list-card-footer-context {
    font-size: 0.9rem;
    font-weight: 500;
    max-width: 15rem;
    display: inline-block;
    text-align: left;
  }

  .coupon-list-card-footer-tobuy {
    width: 4rem;
  }
  .van-tab-item {

  }

</style>