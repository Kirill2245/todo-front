<script setup>
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  },
)
</script>

<template>
  <div class="d-flex min-vh-100 flex-column">
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark app-navbar">
        <div class="container">
          <RouterLink class="navbar-brand" to="/">
            Listodo
            <span class="brand-badge">beta</span>
          </RouterLink>

          <button
            class="navbar-toggler"
            type="button"
            aria-controls="appNavbar"
            :aria-expanded="isMenuOpen"
            aria-label="Переключить навигацию"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div id="appNavbar" class="collapse navbar-collapse" :class="{ show: isMenuOpen }">
            <ul class="navbar-nav ms-auto gap-lg-2">
              <li class="nav-item">
                <RouterLink class="nav-link" active-class="active" to="/" @click="isMenuOpen = false">
                  <i class="bi bi-house"></i>
                  Главная
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" active-class="active" to="/rate" @click="isMenuOpen = false">
                  <i class="bi bi-star"></i>
                  Оценить
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" active-class="active" to="/about" @click="isMenuOpen = false">
                  <i class="bi bi-person-circle"></i>
                  Об авторе
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main class="container page-main flex-grow-1">
      <RouterView />
    </main>

    <footer class="app-footer">
      <div class="container d-flex flex-wrap justify-content-between gap-2">
        <span>Listodo — редактор заметок</span>
        <span>Vue 3 · Bootstrap 5</span>
      </div>
    </footer>
  </div>
</template>
