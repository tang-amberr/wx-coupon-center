<script setup lang="ts">
import CouponList from "@/components/CouponList.vue";
import GlobalHeader from "@/components/common/GlobalHeader.vue";
</script>

<template>
  <header>
    <global-header/>
  </header>

  <main>
    <CouponList/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
