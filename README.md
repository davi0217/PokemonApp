# 🐱‍👤 Gestor de Pokémon Favoritos

Aplicación construida con React que permite buscar Pokémon, ver sus detalles y guardarlos en una lista de favoritos. Ideal como prueba técnica de nivel junior–medio, con uso moderado de hooks avanzados como `useMemo`, `useRef`, `useCallback` y `useContext`.

---

## 🚀 Funcionalidades principales

- 🔍 Búsqueda de Pokémon por nombre o ID.
- 📄 Visualización de datos del Pokémon:
  - Nombre
  - Imagen
  - Tipos
  - Estadísticas base
- ⭐ Añadir o quitar Pokémon a favoritos.
- ❤️ Ver la lista de Pokémon favoritos en una sección aparte.
- 💾 Guardar favoritos en `localStorage`.
- 🔢 Contador global de búsquedas realizadas.
- 🌙 Modo claro/oscuro con cambio de tema global.

---

## 🌐 API utilizada

- Obtener Pokémon por nombre o ID:  
  `https://pokeapi.co/api/v2/pokemon/{nombre_o_id}`  
  Ejemplos:
  - `https://pokeapi.co/api/v2/pokemon/pikachu`
  - `https://pokeapi.co/api/v2/pokemon/25`


## ⚙️ Bonus 

- Filtro de favoritos por tipo (agua, fuego, planta, etc.).
- Comparar dos Pokémon seleccionados (modo batalla).
- Scroll infinito o paginación de Pokémon.
- Buscador con sugerencias mientras se escribe.



