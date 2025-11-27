<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Definición de categorías con sus preguntas
const categorias = [
  {
    id: 'rojo',
    nombre: 'Trabajo / Profesión',
    color: 'bg-red-500',
    colorHover: 'hover:bg-red-600',
    colorBorder: 'border-red-500',
    colorText: 'text-red-700',
    colorBg: 'bg-red-50',
    icon: '🔴',
    preguntas: [
      "¿Qué te hubiese gustado ser si no te hubieses dedicado a tu trabajo actual?",
      "¿Qué repites tanto en tu trabajo que ya podría considerarse un ritual sagrado?",
      "¿Cuál crees que es la mejor parte de tu trabajo? ¿Y la peor?",
      "¿Qué herramienta o app no podrías dejar nunca?"
    ]
  },
  {
    id: 'azul',
    nombre: 'Objetivos Personales',
    color: 'bg-blue-500',
    colorHover: 'hover:bg-blue-600',
    colorBorder: 'border-blue-500',
    colorText: 'text-blue-700',
    colorBg: 'bg-blue-50',
    icon: '🔵',
    preguntas: [
      "¿Qué mini-hábito estás intentando instalar últimamente?",
      "¿Qué habilidad estás intentando mejorar?",
      "¿Qué proyecto personal estás avanzando? Si no, ¿te gustaría empezar alguno? ¿Cuál?",
      "Si pudieras dedicar 1 hora extra al día a algo, ¿qué sería?"
    ]
  },
  {
    id: 'verde',
    nombre: 'Equipo / Colaboración',
    color: 'bg-green-500',
    colorHover: 'hover:bg-green-600',
    colorBorder: 'border-green-500',
    colorText: 'text-green-700',
    colorBg: 'bg-green-50',
    icon: '🟢',
    preguntas: [
      "¿Con quién te gustaría hacer pair programming o co-crear algo?",
      "¿A quién te gustaría agradecerle algo este sprint? ¿Y qué (opcional)?",
      "¿Qué es lo que más valoras de las personas a la hora de trabajar en equipo?",
      "¿A quién del equipo escogerías si naufragases en una isla desierta?",
      "¿A quién te gustaría copiarle alguna habilidad del trabajo?"
    ]
  },
  {
    id: 'amarillo',
    nombre: 'Personal / Bienestar',
    color: 'bg-yellow-500',
    colorHover: 'hover:bg-yellow-600',
    colorBorder: 'border-yellow-500',
    colorText: 'text-yellow-700',
    colorBg: 'bg-yellow-50',
    icon: '🟡',
    preguntas: [
      "¿Qué estás viendo, leyendo o haciendo que te relaja?",
      "¿Qué harías si tuvieras un día libre extra esta semana?",
      "¿Qué te ayuda a recargar energía cuando estás saturado?",
      "¿Una comida después de un día intenso?",
      "Si mañana amaneciera un día libre sorpresa, ¿qué es lo primero que harías?"
    ]
  },
  {
    id: 'marron',
    nombre: 'Random / Curiosidad',
    color: 'bg-amber-700',
    colorHover: 'hover:bg-amber-800',
    colorBorder: 'border-amber-700',
    colorText: 'text-amber-900',
    colorBg: 'bg-amber-50',
    icon: '🟤',
    preguntas: [
      "¿Qué superpoder te gustaría tener?",
      "¿Cuál es tu comida favorita?",
      "¿Qué lugar te gustaría estar si pudieras teletransportarte ahora?",
      "Si fueras un animal por un día, ¿cuál serías?",
      "¿Cómo reduces el estrés en un día de trabajo? (durante la jornada o después de ella)",
      "Algo sobre ti que nadie sepa."
    ]
  },
  {
    id: 'naranja',
    nombre: 'Favoritos',
    color: 'bg-orange-500',
    colorHover: 'hover:bg-orange-600',
    colorBorder: 'border-orange-500',
    colorText: 'text-orange-700',
    colorBg: 'bg-orange-50',
    icon: '🟠',
    preguntas: [
      "Una canción favorita.",
      "Una película favorita.",
      "Una serie favorita.",
      "Un hobby extraño que nadie esperaría de ti.",
      "Una fobia que tengas.",
      "Una frase o dicho que siempre repites."
    ]
  }
]

const categoriaSeleccionada = ref(null)
const preguntasDisponibles = ref([])
const preguntaMostrada = ref('')
const isGenerating = ref(false)

// Preguntas actuales según categoría seleccionada
const preguntasActuales = computed(() => {
  if (!categoriaSeleccionada.value) return []
  return categoriaSeleccionada.value.preguntas
})

// Seleccionar categoría
const seleccionarCategoria = (categoria) => {
  categoriaSeleccionada.value = categoria
  preguntasDisponibles.value = [...categoria.preguntas]
  preguntaMostrada.value = ''
}

const generarPregunta = () => {
  if (isGenerating.value || !categoriaSeleccionada.value) return
  
  // Si no quedan preguntas, reiniciar el pool
  if (preguntasDisponibles.value.length === 0) {
    preguntasDisponibles.value = [...preguntasActuales.value]
  }
  
  isGenerating.value = true
  
  // Efecto rotatorio: mostrar preguntas aleatorias rápidamente
  let contador = 0
  const maxIteraciones = 20
  const intervalo = 80
  
  const rotacion = setInterval(() => {
    const indexAleatorio = Math.floor(Math.random() * preguntasActuales.value.length)
    preguntaMostrada.value = preguntasActuales.value[indexAleatorio]
    contador++
    
    if (contador >= maxIteraciones) {
      clearInterval(rotacion)
      
      // Seleccionar pregunta final del pool disponible
      const indexFinal = Math.floor(Math.random() * preguntasDisponibles.value.length)
      preguntaMostrada.value = preguntasDisponibles.value[indexFinal]
      
      // Eliminar la pregunta seleccionada del pool
      preguntasDisponibles.value.splice(indexFinal, 1)
      
      isGenerating.value = false
    }
  }, intervalo)
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !isGenerating.value && categoriaSeleccionada.value) {
    generarPregunta()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div class="space-y-4 md:space-y-6">
    <div class="text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        🎲 Pregunta Random
      </h2>
      <p class="text-sm md:text-base text-gray-600">
        Selecciona una categoría <span class="hidden md:inline">y presiona <kbd class="px-2 py-1 bg-gray-200 rounded text-sm font-mono">Enter</kbd> o el botón</span><span class="md:hidden">y pulsa el botón</span>
      </p>
    </div>

    <!-- Category Selector -->
    <div v-if="!categoriaSeleccionada" class="space-y-3 md:space-y-4">
      <h3 class="text-lg md:text-xl font-semibold text-gray-700 text-center mb-3 md:mb-4">Elige una categoría:</h3>
      <div class="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-4">
        <button
          v-for="categoria in categorias"
          :key="categoria.id"
          @click="seleccionarCategoria(categoria)"
          :class="[
            'p-4 rounded-xl shadow-md transition-all duration-200 transform active:scale-95 md:hover:scale-105 hover:shadow-lg',
            categoria.color,
            categoria.colorHover,
            'text-white font-semibold'
          ]"
        >
          <div class="flex items-center justify-center md:flex-col gap-3 md:gap-2">
            <span class="text-3xl">{{ categoria.icon }}</span>
            <span class="text-base md:text-sm text-center md:leading-tight">{{ categoria.nombre }}</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Question Display -->
    <div v-else>
      <!-- Selected Category Badge -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-2 mb-3 md:mb-4">
        <div :class="['inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full', categoriaSeleccionada.colorBg, 'border-2', categoriaSeleccionada.colorBorder]">
          <span class="text-lg md:text-xl">{{ categoriaSeleccionada.icon }}</span>
          <span :class="['font-semibold text-sm md:text-base', categoriaSeleccionada.colorText]">{{ categoriaSeleccionada.nombre }}</span>
        </div>
        <button
          @click="categoriaSeleccionada = null; preguntaMostrada = ''"
          class="px-3 py-1 text-xs md:text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cambiar
        </button>
      </div>

      <!-- Question Box -->
      <div :class="['min-h-[160px] md:min-h-[200px] flex items-center justify-center p-4 md:p-8 rounded-xl border-2', categoriaSeleccionada.colorBg, categoriaSeleccionada.colorBorder]">
        <div v-if="preguntaMostrada" class="text-center">
          <p class="text-lg md:text-2xl font-semibold text-gray-800 leading-relaxed" :class="{ 'opacity-60': isGenerating }">
            {{ preguntaMostrada }}
          </p>
        </div>
        <div v-else class="text-center text-gray-400">
          <p class="text-base md:text-xl">Presiona el botón <span class="hidden md:inline">o Enter</span> para comenzar</p>
        </div>
      </div>

      <!-- Generate Button -->
      <div class="text-center mt-4 md:mt-6">
        <button
          @click="generarPregunta"
          :disabled="isGenerating"
          :class="[
            'w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform active:scale-95 md:hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
            categoriaSeleccionada.color,
            categoriaSeleccionada.colorHover
          ]"
        >
          <span v-if="isGenerating" class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generando...
          </span>
          <span v-else class="flex items-center gap-2 justify-center">
            🎲 Generar Pregunta
          </span>
        </button>
      </div>

      <!-- Progress Info -->
      <div class="text-center text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
        <p>Preguntas restantes: {{ preguntasDisponibles.length }} / {{ preguntasActuales.length }}</p>
      </div>
    </div>
  </div>
</template>
