<script setup lang="ts">
import { ref, computed } from 'vue'

// Lista de personas hardcoded
const personas = [
  'Marc Forn', 'Nahuel', 'Mihail', 'Marc Serra', 'Sergio', 'Marc Postils', 'Antonio', 'Carlos', 
  'Juanjo', 'Adri', 'Unai', 'Ges', 'Xavi', 'Pau', 'Natalia', 'Dani', 'Claudia', 'Alba', 'Laura', 'Oriol'
]

const personasPorGrupo = ref(5)
const gruposGenerados = ref<string[][]>([])
const historialCombinaciones = ref<Set<string>>(new Set())

// Generar una clave única para una configuración de grupos
const generarClaveCombinacion = (grupos: string[][]): string => {
  return grupos
    .map(grupo => grupo.slice().sort().join('|'))
    .sort()
    .join('::')
}

// Algoritmo de Fisher-Yates para mezclar array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]!
    shuffled[j] = temp!
  }
  return shuffled
}

// Generar grupos aleatorios
const generarGrupos = () => {
  const maxIntentos = 100
  let intentos = 0
  let nuevosGrupos: string[][] = []
  let claveCombinacion = ''

  // Intentar generar una combinación única
  do {
    const personasMezcladas = shuffleArray(personas)
    nuevosGrupos = []
    
    let index = 0
    while (index < personasMezcladas.length) {
      const grupo = personasMezcladas.slice(index, index + personasPorGrupo.value)
      nuevosGrupos.push(grupo)
      index += personasPorGrupo.value
    }
    
    claveCombinacion = generarClaveCombinacion(nuevosGrupos)
    intentos++
    
    // Si hemos intentado muchas veces, reiniciar el historial
    if (intentos >= maxIntentos) {
      historialCombinaciones.value.clear()
      break
    }
  } while (historialCombinaciones.value.has(claveCombinacion))

  // Guardar la combinación en el historial
  historialCombinaciones.value.add(claveCombinacion)
  gruposGenerados.value = nuevosGrupos
}

// Reiniciar historial
const reiniciarHistorial = () => {
  historialCombinaciones.value.clear()
  gruposGenerados.value = []
}

// Estadísticas
const totalGrupos = computed(() => gruposGenerados.value.length)
const combinacionesGeneradas = computed(() => historialCombinaciones.value.size)

// Calcular cuántos grupos se generarán
const gruposAGenerar = computed(() => {
  return Math.ceil(personas.length / personasPorGrupo.value)
})

const ultimoGrupoSize = computed(() => {
  const resto = personas.length % personasPorGrupo.value
  return resto === 0 ? personasPorGrupo.value : resto
})
</script>

<template>
  <div class="grupos-container">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">
        👥 Crear Grupos Aleatorios
      </h2>
      <p class="text-gray-600">
        Genera grupos aleatorios del equipo ({{ personas.length }} personas disponibles)
      </p>
    </div>

    <!-- Configuración -->
    <div class="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
      <div class="flex flex-col md:flex-row items-center justify-center gap-4">
        <label class="flex items-center gap-3">
          <span class="text-gray-700 font-medium">Personas por grupo:</span>
          <input
            v-model.number="personasPorGrupo"
            type="number"
            min="2"
            :max="personas.length"
            class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        
        <div class="text-sm text-gray-600">
          Se generarán <strong>{{ gruposAGenerar }}</strong> grupo{{ gruposAGenerar !== 1 ? 's' : '' }}
          <span v-if="ultimoGrupoSize !== personasPorGrupo">
            (el último de <strong>{{ ultimoGrupoSize }}</strong> persona{{ ultimoGrupoSize !== 1 ? 's' : '' }})
          </span>
        </div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="flex flex-wrap justify-center gap-4 mb-8">
      <button
        @click="generarGrupos"
        class="px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
      >
        🎲 {{ gruposGenerados.length > 0 ? 'Regenerar Grupos' : 'Generar Grupos' }}
      </button>

      <button
        v-if="combinacionesGeneradas > 0"
        @click="reiniciarHistorial"
        class="px-6 py-3 bg-linear-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
      >
        🔄 Reiniciar Historial
      </button>
    </div>

    <!-- Estadísticas -->
    <div v-if="combinacionesGeneradas > 0" class="text-center mb-6">
      <p class="text-sm text-gray-600">
        Combinaciones generadas: <strong>{{ combinacionesGeneradas }}</strong>
      </p>
    </div>

    <!-- Grupos generados -->
    <div v-if="gruposGenerados.length > 0" class="grupos-grid">
      <div
        v-for="(grupo, index) in gruposGenerados"
        :key="index"
        class="grupo-card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-5"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-800">
            Grupo {{ index + 1 }}
          </h3>
          <span class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {{ grupo.length }} {{ grupo.length === 1 ? 'persona' : 'personas' }}
          </span>
        </div>
        
        <ul class="space-y-2">
          <li
            v-for="(persona, personaIndex) in grupo"
            :key="personaIndex"
            class="flex items-center gap-2 text-gray-700 p-2 rounded hover:bg-gray-50 transition-colors"
          >
            <span class="text-blue-500 font-semibold">{{ personaIndex + 1 }}.</span>
            <span>{{ persona }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Estado inicial -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">👥</div>
      <p class="text-gray-500 text-lg">
        Haz clic en "Generar Grupos" para comenzar
      </p>
    </div>
  </div>
</template>

<style scoped>
.grupos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grupo-card {
  animation: slideIn 0.3s ease-out;
  animation-fill-mode: both;
}

.grupo-card:nth-child(1) { animation-delay: 0.05s; }
.grupo-card:nth-child(2) { animation-delay: 0.1s; }
.grupo-card:nth-child(3) { animation-delay: 0.15s; }
.grupo-card:nth-child(4) { animation-delay: 0.2s; }
.grupo-card:nth-child(5) { animation-delay: 0.25s; }
.grupo-card:nth-child(n+6) { animation-delay: 0.3s; }

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
