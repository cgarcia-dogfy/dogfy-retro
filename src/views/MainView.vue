<script setup>
import { RouterView, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const activeTab = ref(route.name || 'pregunta')

watch(() => route.name, (newName) => {
  if (newName) {
    activeTab.value = newName
  }
})

const tabs = [
  { name: 'pregunta', label: 'Pregunta Random', icon: '❓' },
  { name: 'reto', label: 'Reto', icon: '🎯' },
  { name: 'grupos', label: 'Crear Grupos', icon: '👥' }
]
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <img src="@/assets/dogfy-logo.svg" alt="DogfyDiet" class="h-16 md:h-20" />
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Team Building DogfyDiet
        </h1>
        <p class="text-gray-600 text-lg">Conoce mejor a tu equipo con preguntas y retos divertidos</p>
      </div>

      <!-- Tabs Container -->
      <div class="max-w-4xl mx-auto">
        <!-- Tab Navigation -->
        <div class="bg-white rounded-xl shadow-lg p-2 mb-6">
          <div class="flex gap-2">
            <RouterLink
              v-for="tab in tabs"
              :key="tab.name"
              :to="{ name: tab.name }"
              class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200"
              :class="[
                activeTab === tab.name
                  ? 'bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              ]"
            >
              <span class="text-xl">{{ tab.icon }}</span>
              <span>{{ tab.label }}</span>
            </RouterLink>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <RouterView v-slot="{ Component }">
            <Transition
              name="fade"
              mode="out-in"
            >
              <component :is="Component" />
            </Transition>
          </RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
