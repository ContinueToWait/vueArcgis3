<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { utils } from "@/utils/util.js"

export default {
  name: 'App',
  data() {
    return {
      title: "",
      transitionName: "van-slide-right"
    }
  },
  computed: {
    ...mapGetters(["position"])
  },
  // watch $route 决定使用哪种过渡
  watch: {
    $route(to, from) {
      // console.log(to)
      let self = this;
      /*路由发生改变修改页面的title */
      if (to.meta.title) {
        self.title = to.meta.title
      }
      const toDepth = to.meta.index;
      const fromDepth = from.meta.index;
      this.transitionName = toDepth < fromDepth ? "van-slide-right" : "van-slide-left";
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  background-color: #0b0f28;
  /* color: #209af5; */
  color:#CACCD9;
  /* margin-top: 60px; */
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
}

.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
.phone {
  height: 30px;
  width: 30px;
  position: absolute;
  right: 10px;
  opacity: 0;
}
</style>
