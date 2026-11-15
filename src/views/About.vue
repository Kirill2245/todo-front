<script setup>
import avatar from '../assets/avatar.svg'
</script>

<template>
  <div class="page-heading">
    <div>
      <p class="eyebrow">Об авторе</p>
      <h1>Кто сделал Listodo</h1>
      <p class="page-subtitle">Небольшая информация об авторе и учебном проекте.</p>
    </div>
  </div>

  <div class="row g-4">
    <div class="col-lg-5">
      <section class="panel about-card text-center">
        <img :src="avatar" alt="Изображение автора" class="about-avatar" />
        <p class="eyebrow">Автор проекта</p>
        <h2 class="about-name">Кирилл</h2>
        <p class="about-role">Студент, веб-разработчик</p>
        <p class="about-text">
          Изучаю интернет-разработку и создаю учебные проекты на Vue. Listodo —
          практическая работа по разработке SPA-приложения для ведения списков дел.
        </p>
        <div class="about-tags">
          <span class="about-tag">Vue 3</span>
          <span class="about-tag">Bootstrap 5</span>
          <span class="about-tag">SPA</span>
        </div>
      </section>
    </div>

    <div class="col-lg-7">
      <section class="panel about-card">
        <p class="eyebrow">О приложении</p>
        <h2 class="about-name">Listodo</h2>
        <p class="about-text">
          Простой редактор заметок со списками задач. В каждой заметке можно
          добавлять, редактировать, отмечать и удалять пункты списка.
        </p>

        <ul class="about-list">
          <li>
            <i class="bi bi-check2"></i>
            <span>Создание, переименование и удаление заметок с подтверждением.</span>
          </li>
          <li>
            <i class="bi bi-check2"></i>
            <span>Добавление, редактирование и удаление задач.</span>
          </li>
          <li>
            <i class="bi bi-check2"></i>
            <span>Отметка выполненных пунктов и адаптивная вёрстка.</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
