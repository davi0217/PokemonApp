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

## 🔧 Tecnologías

- React (hooks)
- CSS o Tailwind (a tu elección)
- [PokéAPI](https://pokeapi.co/) como fuente de datos

---

## 🌐 API utilizada

- Obtener Pokémon por nombre o ID:  
  `https://pokeapi.co/api/v2/pokemon/{nombre_o_id}`  
  Ejemplos:
  - `https://pokeapi.co/api/v2/pokemon/pikachu`
  - `https://pokeapi.co/api/v2/pokemon/25`

---

## 🎯 Requisitos técnicos simulando una prueba real

- Componentización clara.
- Uso de React Hooks (`useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, `useContext`).
- Código limpio y bien organizado.
- No es necesario diseño elaborado (estilos mínimos).
- Favorecer la mantenibilidad y separación de responsabilidades.

---

## 🧩 Sugerencias de componentes (opcional)

- `SearchBar`
- `PokemonDetails`
- `FavoritesList`
- `ThemeToggle`
- `AppContextProvider` (contexto global para favoritos, tema y contador)

---

## ⚙️ Bonus (opcional)

- Filtro de favoritos por tipo (agua, fuego, planta, etc.).
- Comparar dos Pokémon seleccionados (modo batalla).
- Scroll infinito o paginación de Pokémon.
- Buscador con sugerencias mientras se escribe.

---

## 🕐 Tiempo estimado

Entre 5 y 8 horas para una versión funcional.

---

## 📁 Estructura base sugerida

