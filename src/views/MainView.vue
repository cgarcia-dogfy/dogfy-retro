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
  { name: 'pregunta', label: 'Pregunta Random', icon: '❓', disabled: false },
  { name: 'reto', label: 'Próximamente...', icon: '🎯', disabled: true },
  { name: 'grupos', label: 'Crear Grupos', icon: '👥', disabled: false }
]
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-x-hidden">
    <div class="w-full max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-8">
      <!-- Header -->
      <div class="text-center mb-6 md:mb-8">
        <div class="flex justify-center mb-3 md:mb-4">
          <img src="@/assets/dogfy-logo.svg" alt="DogfyDiet" class="h-12 md:h-16 lg:h-20" />
        </div>
        <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-1 md:mb-2 px-2">
          Team Building DogfyDiet
        </h1>
        <p class="text-sm md:text-base lg:text-lg text-gray-600 px-4">Conoce mejor a tu equipo con preguntas y retos divertidos</p>
      </div>

      <!-- Tabs Container -->
      <div class="max-w-4xl mx-auto">
        <!-- Tab Navigation -->
        <div class="bg-white rounded-xl shadow-lg p-1.5 md:p-2 mb-4 md:mb-6">
          <div class="flex flex-col md:flex-row gap-1.5 md:gap-2">
            <RouterLink
              v-for="tab in tabs"
              :key="tab.name"
              :to="{ name: tab.name }"
              :class="[
                'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200',
                tab.disabled 
                  ? 'opacity-50 cursor-not-allowed pointer-events-none text-gray-400'
                  : activeTab === tab.name
                    ? 'bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              ]"
            >
              <span class="text-xl">{{ tab.icon }}</span>
              <span class="text-sm md:text-base">{{ tab.label }}</span>
            </RouterLink>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="bg-white rounded-xl shadow-lg p-4 md:p-8">
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
