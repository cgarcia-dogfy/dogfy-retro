<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Reto {
  emoji: string
  text: string
  dificultad: 'Baja' | 'Media' | 'Alta'
}

const retosOriginales: Reto[] = [
  { emoji: '🎤', text: 'Canta 20 segundos de tu canción favorita', dificultad: 'Media' },
  { emoji: '😂', text: 'Cuenta el chiste más malo que conozcas', dificultad: 'Baja' },
  { emoji: '🎭', text: 'Imita a un compañero del equipo (sin decir quién)', dificultad: 'Media' },
  { emoji: '💃', text: 'Baila durante 30 segundos tu mejor paso de baile', dificultad: 'Media' },
  { emoji: '🐕', text: 'Ladra y presenta a DogfyDiet como si fueras un perro', dificultad: 'Baja' },
  { emoji: '🎨', text: 'Dibuja el logo de DogfyDiet con los ojos cerrados', dificultad: 'Media' },
  { emoji: '🗣️', text: 'Di 10 cosas que ames de DogfyDiet en 30 segundos', dificultad: 'Baja' },
  { emoji: '🤹', text: 'Intenta hacer malabares con 3 objetos de la sala', dificultad: 'Alta' },
  { emoji: '👏', text: 'Di trabalenguas: "Tres tristes tigres" 5 veces rápido', dificultad: 'Media' },
  { emoji: '🧘', text: 'Mantén una postura de yoga durante 1 minuto', dificultad: 'Media' },
  { emoji: '📢', text: 'Cuenta una anécdota graciosa de tu primer día en DogfyDiet', dificultad: 'Baja' },
  { emoji: '🎬', text: 'Recrea una escena icónica de tu película favorita', dificultad: 'Media' },
  { emoji: '🤪', text: 'Habla 30 segundos sobre perros sin usar la letra "O"', dificultad: 'Alta' },
  { emoji: '⭐', text: 'Haz 15 saltos de estrella', dificultad: 'Media' },
  { emoji: '🎯', text: 'Explica tu proyecto actual usando solo emojis', dificultad: 'Alta' },
  { emoji: '📱', text: 'Muestra la última foto de tu galería y cuenta la historia', dificultad: 'Baja' },
  { emoji: '🎪', text: 'Haz el pino durante 10 segundos (o inténtalo)', dificultad: 'Alta' },
  { emoji: '👀', text: 'Mantén contacto visual con alguien sin reír 30 segundos', dificultad: 'Media' },
  { emoji: '🎵', text: 'Rapea sobre tu día a día en DogfyDiet', dificultad: 'Alta' },
  { emoji: '🙌', text: 'Di 5 cumplidos a tus compañeros en 20 segundos', dificultad: 'Baja' }
]

const retosDisponibles = ref<Reto[]>([...retosOriginales])
const retoMostrado = ref<Reto | null>(null)
const isGenerating = ref<boolean>(false)

const generarReto = () => {
  if (isGenerating.value) return
  
  // Si no quedan retos, reiniciar el pool
  if (retosDisponibles.value.length === 0) {
    retosDisponibles.value = [...retosOriginales]
  }
  
  isGenerating.value = true
  
  // Efecto rotatorio: mostrar retos aleatorios rápidamente
  let contador = 0
  const maxIteraciones = 20
  const intervalo = 80
  
  const rotacion = setInterval(() => {
    const indexAleatorio = Math.floor(Math.random() * retosOriginales.length)
    retoMostrado.value = retosOriginales[indexAleatorio]!
    contador++
    
    if (contador >= maxIteraciones) {
      clearInterval(rotacion)
      
      // Seleccionar reto final del pool disponible
      const indexFinal = Math.floor(Math.random() * retosDisponibles.value.length)
      retoMostrado.value = retosDisponibles.value[indexFinal]!
      
      // Eliminar el reto seleccionado del pool
      retosDisponibles.value.splice(indexFinal, 1)
      
      isGenerating.value = false
    }
  }, intervalo)
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !isGenerating.value) {
    generarReto()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

const getDificultadColor = (dificultad: Reto['dificultad']) => {
  switch(dificultad) {
    case 'Baja':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Media':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Alta':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">
        🎯 Reto DogfyDiet
      </h2>
      <p class="text-gray-600">
        ¿Te atreves? Demuestra el espíritu DogfyDiet. Presiona <kbd class="px-2 py-1 bg-gray-200 rounded text-sm font-mono">Enter</kbd> o el botón
      </p>
    </div>

    <!-- Challenge Display -->
    <div class="min-h-[250px] flex items-center justify-center p-8 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
      <div v-if="retoMostrado" class="text-center space-y-4">
        <div class="text-6xl mb-4" :class="{ 'opacity-60': isGenerating }">
          {{ retoMostrado.emoji }}
        </div>
        <p class="text-2xl font-semibold text-gray-800 leading-relaxed" :class="{ 'opacity-60': isGenerating }">
          {{ retoMostrado.text }}
        </p>
        <div class="flex justify-center">
          <span 
            class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border-2"
            :class="[getDificultadColor(retoMostrado.dificultad), { 'opacity-60': isGenerating }]"
          >
            Dificultad: {{ retoMostrado.dificultad }}
          </span>
        </div>
      </div>
      <div v-else class="text-center text-gray-400">
        <div class="text-5xl mb-4">🎯</div>
        <p class="text-xl">Presiona el botón o Enter para comenzar</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-4 justify-center">
      <button
        @click="generarReto"
        :disabled="isGenerating"
        class="px-8 py-4 bg-linear-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <span v-if="isGenerating" class="flex items-center gap-2">
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generando...
        </span>
        <span v-else class="flex items-center gap-2 justify-center">
          🎲 Generar Reto
        </span>
      </button>
    </div>

    <!-- Info Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div class="p-4 bg-green-50 rounded-lg border border-green-200">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-2xl">🟢</span>
          <span class="font-semibold text-green-800">Baja</span>
        </div>
        <p class="text-sm text-gray-700">Retos fáciles y divertidos</p>
      </div>
      <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-2xl">🟡</span>
          <span class="font-semibold text-yellow-800">Media</span>
        </div>
        <p class="text-sm text-gray-700">Requieren un poco de valor</p>
      </div>
      <div class="p-4 bg-red-50 rounded-lg border border-red-200">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-2xl">🔴</span>
          <span class="font-semibold text-red-800">Alta</span>
        </div>
        <p class="text-sm text-gray-700">¿Te atreves?</p>
      </div>
    </div>
  </div>
</template>
