<script setup>
import { nextTick, ref } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggle', 'update', 'remove'])

const isEditing = ref(false)
const draft = ref('')
const inputRef = ref(null)

async function startEditing() {
  draft.value = props.todo.text
  isEditing.value = true

  await nextTick()
  inputRef.value?.focus()
  inputRef.value?.select()
}

function save() {
  const text = draft.value.trim()
  if (!text) {
    inputRef.value?.focus()
    return
  }

  emit('update', text)
  isEditing.value = false
}

function cancel() {
  isEditing.value = false
}
</script>

<template>
  <div class="todo-item" :class="{ 'is-done': todo.done }">
    <input
      class="form-check-input todo-check"
      type="checkbox"
      :checked="todo.done"
      :aria-label="`Отметить задачу: ${todo.text}`"
      @change="emit('toggle')"
    />

    <template v-if="isEditing">
      <input
        ref="inputRef"
        v-model="draft"
        class="form-control todo-edit-input"
        type="text"
        maxlength="200"
        aria-label="Текст задачи"
        @keyup.enter="save"
        @keyup.esc="cancel"
      />
      <div class="todo-actions">
        <button class="mini-btn" type="button" title="Сохранить" aria-label="Сохранить задачу" @click="save">
          <i class="bi bi-check-lg"></i>
        </button>
        <button class="mini-btn" type="button" title="Отмена" aria-label="Отменить редактирование" @click="cancel">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </template>

    <template v-else>
      <span class="todo-text">{{ todo.text }}</span>
      <div class="todo-actions">
        <button class="mini-btn" type="button" title="Редактировать" @click="startEditing">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="mini-btn danger" type="button" title="Удалить" @click="emit('remove')">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    </template>
  </div>
</template>
