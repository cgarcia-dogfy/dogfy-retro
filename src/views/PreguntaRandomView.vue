<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const preguntasOriginales = [
  "¿Cuál es tu emoji favorito y por qué?",
  "Si fueras un superhéroe, ¿cuál sería tu poder?",
  "¿Qué app no podrías borrar nunca de tu móvil?",
  "¿Cuál es tu palabra favorita?",
  "Si pudieras ser experto en algo al instante, ¿qué sería?",
  "¿Qué canción te pone de buen humor siempre?",
  "¿Playa o montaña?",
  "¿Café o té?",
  "¿Madrugador o noctámbulo?",
  "¿Cuál es tu meme favorito del momento?",
  "Si fueras una red social, ¿cuál serías?",
  "¿Qué harías en tu día perfecto?",
  "¿Cuál es tu spot favorito de Madrid/tu ciudad?",
  "¿Qué cosa absurda te da miedo?",
  "Si tuvieras una mascota exótica, ¿cuál sería?",
  "¿Qué trend de internet admites que te gusta?",
  "¿Cuál es tu guilty pleasure?",
  "Si fueras un personaje de una serie, ¿quién serías?",
  "¿Qué habilidad inútil dominas?",
  "¿Cuál es la cosa más random que has comprado online?"
]

const preguntasDisponibles = ref([...preguntasOriginales])
const preguntaMostrada = ref('')
const isGenerating = ref(false)

const generarPregunta = () => {
  if (isGenerating.value) return
  
  // Si no quedan preguntas, reiniciar el pool
  if (preguntasDisponibles.value.length === 0) {
    preguntasDisponibles.value = [...preguntasOriginales]
  }
  
  isGenerating.value = true
  
  // Efecto rotatorio: mostrar preguntas aleatorias rápidamente
  let contador = 0
  const maxIteraciones = 20
  const intervalo = 80
  
  const rotacion = setInterval(() => {
    const indexAleatorio = Math.floor(Math.random() * preguntasOriginales.length)
    preguntaMostrada.value = preguntasOriginales[indexAleatorio]
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
  if (event.key === 'Enter' && !isGenerating.value) {
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
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">
        🎲 Pregunta Random
      </h2>
      <p class="text-gray-600">
        Conoce mejor a tus compañeros de DogfyDiet. Presiona <kbd class="px-2 py-1 bg-gray-200 rounded text-sm font-mono">Enter</kbd> o el botón
      </p>
    </div>

    <!-- Question Display -->
    <div class="min-h-[200px] flex items-center justify-center p-8 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
      <div v-if="preguntaMostrada" class="text-center">
        <p class="text-2xl font-semibold text-gray-800 leading-relaxed" :class="{ 'opacity-60': isGenerating }">
          {{ preguntaMostrada }}
        </p>
      </div>
      <div v-else class="text-center text-gray-400">
        <p class="text-xl">Presiona el botón o Enter para comenzar</p>
      </div>
    </div>

    <!-- Generate Button -->
    <div class="text-center">
      <button
        @click="generarPregunta"
        :disabled="isGenerating"
        class="px-8 py-4 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
  </div>
</template>
