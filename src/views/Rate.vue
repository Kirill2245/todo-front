<script setup>
import { computed, ref } from 'vue'

const labels = {
  1: 'Плохо',
  2: 'Так себе',
  3: 'Удовлетворительно',
  4: 'Хорошо',
  5: 'Отлично',
}

const rating = ref(0)
const hovered = ref(0)

const activeStar = computed(() => hovered.value || rating.value)
const message = computed(() => (rating.value ? labels[rating.value] : 'Выберите оценку'))
</script>

<template>
  <div class="page-heading">
    <div>
      <p class="eyebrow">Обратная связь</p>
      <h1>Оценить приложение</h1>
      <p class="page-subtitle">Поставьте оценку от 1 до 5 звёзд.</p>
    </div>
  </div>

  <section class="panel rate-panel">
    <div class="rate-icon">
      <i class="bi bi-stars"></i>
    </div>
    <h2>Насколько удобен Listodo?</h2>
    <p class="rate-description">Нажмите на звезду, чтобы выбрать оценку.</p>

    <div class="stars" role="group" aria-label="Оценка приложения от 1 до 5">
      <button
        v-for="star in 5"
        :key="star"
        class="star-btn"
        :class="{ active: star <= activeStar }"
        type="button"
        :aria-label="`${star} из 5 — ${labels[star]}`"
        :aria-pressed="rating === star"
        @mouseenter="hovered = star"
        @mouseleave="hovered = 0"
        @focus="hovered = star"
        @blur="hovered = 0"
        @click="rating = star"
      >
        <i class="bi" :class="star <= activeStar ? 'bi-star-fill' : 'bi-star'"></i>
      </button>
    </div>

    <p class="rating-message" :class="{ 'text-muted-app': !rating }">
      {{ message }}
    </p>
    <p v-if="rating" class="rate-thanks">Спасибо за вашу оценку!</p>
  </section>
</template>
