<script setup lang="ts">
import Transactions from './components/Transactions.vue'
import Evolution from './components/Evolution.vue'
import FutureTransactions from './components/FutureTransactions.vue'
import { ref, VueConstructor } from 'vue'
var startX: any, endX: any;

enum Page {
  Default = "Default", 
  Evolution = "Evolution", 
  FutureTransaction = "FutureTransaction"
}

const currentPage = ref<Page>(Page.Default)

const pages: Record<Page, VueConstructor> = {
  [Page.Default]: Transactions,
  [Page.Evolution]: Evolution,
  [Page.FutureTransaction]: FutureTransactions
}

function getCurrentPage(): VueConstructor {
  return pages[currentPage.value]
}

document.addEventListener('touchstart', function(event: TouchEvent) {
  startX = event.changedTouches[0].screenX;
});

document.addEventListener('touchmove', function(event: TouchEvent) {
  endX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
  console.log(endX - startX)
  if (startX < endX && endX - startX > window.innerWidth * 0.8) {
    // Balayage de gauche à droite détecté
    // Changer votre vue ici
    swipeLeft()
  }
  else if (startX > endX && endX - startX < -1 * window.innerWidth * 0.8) {
    // Balayage de gauche à droite détecté
    // Changer votre vue ici
    swipeRight()
  }
});

function swipeRight() {
  const currentIndex = Object.values(Page).indexOf(currentPage.value);
  const nextIndex = (currentIndex + 1) % Object.values(Page).length;
  currentPage.value = Object.values(Page)[nextIndex];
}

function swipeLeft() {
  const numPages = Object.keys(Page).length;
  const currentIndex = Object.values(Page).indexOf(currentPage.value);
  const nextIndex = (currentIndex + numPages - 1) % Object.values(Page).length;
  currentPage.value = Object.values(Page)[nextIndex];
}

</script>

<template>
  <div>
    <!-- <transition name="slide"> -->
      <component :is="getCurrentPage()" />
    <!-- </transition> -->
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
</style>
