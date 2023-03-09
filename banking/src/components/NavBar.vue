<template>
  <nav class="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200">
    <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <!-- Logo -->
          <a href="#" class="text-gray-900 font-bold text-lg">Logo</a>
        </div>
        <div class="flex items-center">
          <!-- Hamburger menu button -->
          <button @click="toggleMenu" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <span class="sr-only">Open main menu</span>
          </button>
        </div>
      </div>
      <!-- Mobile menu -->
      <div v-show="showMenu" class="bg-white">
        <a href="#" class="block px-4 py-2 text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900">Link 1</a>
        <a href="#" class="block px-4 py-2 text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900">Link 2</a>
        <a href="#" class="block px-4 py-2 text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900">Link 3</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
  },
}
</script>