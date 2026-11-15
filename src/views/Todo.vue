<script setup>
import { computed, ref } from 'vue'
import Swal from 'sweetalert2'

import TodoItem from '../components/TodoItem.vue'

let idCounter = 100
const nextId = () => {
  idCounter += 1
  return idCounter
}

const notes = ref([
  {
    id: 1,
    title: 'Домашние дела',
    todos: [
      { id: 11, text: 'Купить продукты', done: false },
      { id: 12, text: 'Полить цветы', done: true },
      { id: 13, text: 'Пропылесосить комнату', done: false },
    ],
  },
  {
    id: 2,
    title: 'Учёба',
    todos: [
      { id: 21, text: 'Сделать практическую по Vue', done: false },
      { id: 22, text: 'Повторить сетку Bootstrap', done: false },
    ],
  },
])

const selectedNoteId = ref(notes.value[0].id)
const newTaskText = ref('')

const selectedNote = computed(
  () => notes.value.find((note) => note.id === selectedNoteId.value) ?? null,
)

async function createNote() {
  const { value } = await Swal.fire({
    title: 'Новая заметка',
    input: 'text',
    inputLabel: 'Название заметки',
    inputPlaceholder: 'Например, Планы на неделю',
    showCancelButton: true,
    confirmButtonText: 'Создать',
    cancelButtonText: 'Отмена',
    reverseButtons: true,
    inputValidator: (value) => (!value || !value.trim() ? 'Введите название заметки' : undefined),
  })

  if (typeof value !== 'string') return

  const note = {
    id: nextId(),
    title: value.trim(),
    todos: [],
  }

  notes.value.push(note)
  selectedNoteId.value = note.id
}

async function renameNote() {
  if (!selectedNote.value) return

  const { value } = await Swal.fire({
    title: 'Переименовать заметку',
    input: 'text',
    inputLabel: 'Новое название',
    inputValue: selectedNote.value.title,
    showCancelButton: true,
    confirmButtonText: 'Сохранить',
    cancelButtonText: 'Отмена',
    reverseButtons: true,
    inputValidator: (value) => (!value || !value.trim() ? 'Введите название заметки' : undefined),
  })

  if (typeof value === 'string') {
    selectedNote.value.title = value.trim()
  }
}

async function deleteNote() {
  const note = selectedNote.value
  if (!note) return

  const result = await Swal.fire({
    title: 'Удалить заметку?',
    text: `«${note.title}» и все её задачи будут удалены.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Удалить',
    cancelButtonText: 'Отмена',
    reverseButtons: true,
  })

  if (!result.isConfirmed) return

  notes.value = notes.value.filter((item) => item.id !== note.id)
  selectedNoteId.value = notes.value[0]?.id ?? null
}

function addTask() {
  const text = newTaskText.value.trim()
  if (!text || !selectedNote.value) return

  selectedNote.value.todos.push({
    id: nextId(),
    text,
    done: false,
  })
  newTaskText.value = ''
}

function updateTask(todo, text) {
  const value = text.trim()
  if (!value) return

  todo.text = value
}

function removeTask(todoId) {
  if (!selectedNote.value) return

  const index = selectedNote.value.todos.findIndex((todo) => todo.id === todoId)
  if (index !== -1) {
    selectedNote.value.todos.splice(index, 1)
  }
}
</script>

<template>
  <div class="page-heading">
    <div>
      <p class="eyebrow">Списки дел</p>
      <h1>Мои заметки</h1>
      <p class="page-subtitle">
        Создавайте заметки, добавляйте задачи и отмечайте выполненное.
      </p>
    </div>

    <button class="btn btn-highlight" type="button" @click="createNote">
      <i class="bi bi-plus-lg me-1"></i>
      Новая заметка
    </button>
  </div>

  <div class="row g-4">
    <div class="col-lg-4 col-xl-3">
      <aside class="panel notes-panel">
        <div class="panel-head">
          <h2 class="panel-title">Список заметок</h2>
        </div>

        <nav v-if="notes.length" class="notes-list" aria-label="Список заметок">
          <button
            v-for="note in notes"
            :key="note.id"
            class="note-item"
            :class="{ active: note.id === selectedNoteId }"
            type="button"
            @click="selectedNoteId = note.id"
          >
            <span class="note-item-icon">
              <i class="bi bi-journal-text"></i>
            </span>
            <span class="note-item-title">{{ note.title }}</span>
            <i class="bi bi-chevron-right note-chevron"></i>
          </button>
        </nav>

        <div v-else class="notes-empty">
          <i class="bi bi-journal-plus"></i>
          <p>Пока нет ни одной заметки.</p>
        </div>
      </aside>
    </div>

    <div class="col-lg-8 col-xl-9">
      <section class="panel editor-panel">
        <template v-if="selectedNote">
          <header class="editor-head">
            <div class="editor-heading">
              <p class="eyebrow mb-1">Заметка</p>
              <h2 class="editor-title">{{ selectedNote.title }}</h2>
            </div>

            <div class="editor-actions">
              <button
                class="icon-btn"
                type="button"
                title="Переименовать заметку"
                aria-label="Переименовать заметку"
                @click="renameNote"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <button
                class="icon-btn icon-btn-danger"
                type="button"
                title="Удалить заметку"
                aria-label="Удалить заметку"
                @click="deleteNote"
              >
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </header>

          <div class="todo-list">
            <TodoItem
              v-for="todo in selectedNote.todos"
              :key="todo.id"
              :todo="todo"
              @toggle="todo.done = !todo.done"
              @update="updateTask(todo, $event)"
              @remove="removeTask(todo.id)"
            />

            <div v-if="!selectedNote.todos.length" class="tasks-empty">
              <i class="bi bi-check2-square"></i>
              <p>В этой заметке пока нет задач.</p>
            </div>
          </div>

          <form class="add-task" @submit.prevent="addTask">
            <label class="visually-hidden" for="newTask">Новая задача</label>
            <input
              id="newTask"
              v-model="newTaskText"
              class="form-control"
              type="text"
              maxlength="200"
              autocomplete="off"
              placeholder="Добавить задачу..."
            />
            <button class="btn btn-accent" type="submit" :disabled="!newTaskText.trim()" aria-label="Добавить задачу">
              <i class="bi bi-plus-lg"></i>
              <span class="d-none d-sm-inline ms-1">Добавить</span>
            </button>
          </form>
        </template>

        <div v-else class="editor-empty">
          <i class="bi bi-journal-check"></i>
          <h2>Заметка не выбрана</h2>
          <p>Выберите заметку из списка или создайте новую.</p>
        </div>
      </section>
    </div>
  </div>
</template>
