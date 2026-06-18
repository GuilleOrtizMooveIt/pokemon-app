# Quiz React

Solo conceptos de React (hooks, estado, componentes, render, performance). Todas las preguntas son de revisión de código: leé el snippet y elegí el comentario correcto.

---

### 1. Input controlado

```jsx
const [username, setUsername] = useState("");
<input value={username} />
```

El input no deja escribir. ¿Por qué?

- A) Falta importar useState
- B) value debería ser defaultValue siempre
- C) Es un input controlado con value pero sin onChange: React fija el valor y no deja editar. Hay que pasar un onChange que actualice el estado
- D) Hay que envolverlo en un `<form>`

**Respuesta:** 

C) Es un input controlado con value pero sin onChange: React fija el valor y no deja editar. Hay que pasar un onChange que actualice el estado
---

### 2. Eventos

```jsx
<button onClick={fetchUser()}>Buscar</button>
```

El fetch se dispara solo al cargar, sin tocar el botón. ¿Por qué?

- A) Falta un useEffect
- B) onClick={fetchUser()} ejecuta la función en el render en vez de pasarla como referencia; debe ser onClick={fetchUser}
- C) fetchUser debería ir en mayúscula
- D) El botón necesita type="submit"

**Respuesta:** 

B) onClick={fetchUser()} ejecuta la función en el render en vez de pasarla como referencia; debe ser onClick={fetchUser}
---

### 3. Custom hook — responsabilidades

¿Por qué poner la lógica de fetch (loading, error, data) dentro de `useGithubUser` en lugar de `App`?

- A) Porque los hooks son más rápidos
- B) Porque React no deja hacer fetch en componentes
- C) Para evitar repetir imports
- D) Para separar responsabilidades: la lógica de datos/estado queda reutilizable y testeable, y App se ocupa solo de la UI

**Respuesta:** 
D) Para separar responsabilidades: la lógica de datos/estado queda reutilizable y testeable, y App se ocupa solo de la UI

---

### 4. Render de estados

```jsx
const { user, loading, error } = useGithubUser(username);
return (
  <>
    <SearchBar /* ... */ />
    <UserCard user={user} />
  </>
);
```

Se pide manejar loading y error. ¿Qué le falta?

- A) Nada, React maneja el loading solo
- B) Meter todo en un useEffect
- C) Renderizar condicionalmente: algo mientras loading, el error si existe, y UserCard solo cuando hay user (si no, puede romper con user en null)
- D) Un useRef

**Respuesta:** 
C) Renderizar condicionalmente: algo mientras loading, el error si existe, y UserCard solo cuando hay user (si no, puede romper con user en null)
---

### 5. Estado — dónde vive

El `username` vive en `App` y el hook lo recibe como parámetro. ¿Por qué tiene sentido?

- A) Única fuente de verdad: App controla el input y le pasa el valor al hook; duplicarlo en ambos lados los desincronizaría
- B) Los hooks no pueden tener estado
- C) useState no funciona dentro de custom hooks
- D) Es indistinto, da igual dónde viva

**Respuesta:** 
A) Única fuente de verdad: App controla el input y le pasa el valor al hook; duplicarlo en ambos lados los desincronizaría
---

### 6. Fetch bajo demanda

```jsx
useEffect(() => {
  fetchUser();
}, [username]);
```

Se pide búsqueda bajo demanda (al apretar el botón). ¿Cuál es el comentario correcto?

- A) Está perfecto, es lo mismo
- B) Falta [] como dependencia
- C) useEffect no puede llamar funciones async
- D) Esto busca en cada cambio de username (cada tecla), no bajo demanda. Hay que exponer fetchUser y llamarlo desde el onClick

**Respuesta:** 
D) Esto busca en cada cambio de username (cada tecla), no bajo demanda. Hay que exponer fetchUser y llamarlo desde el onClick
---

### 7. Listas — keys

```jsx
{repos.map((repo, index) => (
  <RepoItem key={index} repo={repo} />
))}
```

Para una lista que se filtra y reordena, ¿qué comentario es correcto?

- A) Está perfecto, key={index} es lo recomendado
- B) El índice como key trae bugs al filtrar/reordenar; conviene una key estable y única como repo.id
- C) No hace falta key
- D) La key debería ir en repo, no en RepoItem

**Respuesta:** 
B) El índice como key trae bugs al filtrar/reordenar; conviene una key estable y única como repo.id
---

### 8. Performance — igualdad referencial

```jsx
const RepoList = React.memo(function RepoList({ repos }) { /* ... */ });

// en el padre, en cada render:
<RepoList repos={repos.filter(r => r.stargazers_count > 0)} />
```

RepoList está memoizado pero re-renderiza siempre. ¿Por qué?

- A) .filter(...) crea un array nuevo cada render (nueva referencia), así que memo ve una prop distinta. Hay que estabilizarlo con useMemo o pasar la referencia ya calculada
- B) React.memo no sirve para listas
- C) Falta key en los items
- D) Hay que usar useState para los repos

**Respuesta:** 

---

### 9. Performance — fetchUser estable

Se pide que `fetchUser` no se recree en cada render. ¿Cómo se logra y por qué importa?

- A) No se puede, siempre se recrea
- B) Declarándolo como var global
- C) Con useCallback(..., [username]): mantiene la misma referencia entre renders, lo que evita romper el memo de los hijos y re-ejecuciones de effects que lo usen como dependencia
- D) Poniéndolo dentro de un useEffect

**Respuesta:** 
C) Con useCallback(..., [username]): mantiene la misma referencia entre renders, lo que evita romper el memo de los hijos y re-ejecuciones de effects que lo usen como dependencia
---

### 10. useReducer vs varios useState

El hook maneja `user`, `repos`, `loading` y `error`. ¿Cuándo conviene useReducer en vez de varios useState?

- A) Nunca, está deprecado
- B) Cuando esos estados cambian juntos y de forma coordinada (al iniciar: loading=true, error=null; al terminar: loading=false + datos): el reducer centraliza las transiciones y evita estados inconsistentes
- C) Solo en class components
- D) Cuando hay un único estado booleano

**Respuesta:** 
B) Cuando esos estados cambian juntos y de forma coordinada (al iniciar: loading=true, error=null; al terminar: loading=false + datos): el reducer centraliza las transiciones y evita estados inconsistentes
---

## Extra (opcional)

Preguntas bonus de async / JavaScript (no de React). Son opcionales: no es obligatorio contestarlas y no restan si quedan en blanco. Suman puntos extra a las 10 anteriores.

---

### 11. Fetch en paralelo (Extra)

La consigna pide que los dos fetches corran en paralelo. ¿Cuál opción lo hace?

**A)**
```js
const poke = await fetch(pokeUrl);
const species = await fetch(speciesUrl);
```

**B)**
```js
const [poke, species] = await Promise.all([
  fetch(pokeUrl),
  fetch(speciesUrl),
]);
```

**C)**
```js
fetch(pokeUrl);
fetch(speciesUrl);
```

- D) Las tres hacen lo mismo

**Respuesta:** 

---

### 12. El 404 que no salta (Extra)

```js
try {
  const [poke, species] = await Promise.all([
    fetch(pokeUrl),
    fetch(speciesUrl),
  ]);
  // ...usar los datos
} catch (e) {
  setError("No se encontró el Pokémon");
}
```

Buscás un Pokémon que no existe (la API responde 404) y el catch nunca se ejecuta. ¿Por qué?

- A) Promise.all no funciona con fetch
- B) fetch no rechaza ante un 404: la respuesta se resuelve igual con res.ok === false. Hay que chequear res.ok (o res.status) en cada fetch y lanzar el error a mano
- C) Falta un await antes de Promise.all
- D) El catch necesita un finally

**Respuesta:** 

---

### 13. Qué hace Promise.all si uno falla (Extra)

Suponé que ya agregaste el chequeo de res.ok y uno de los dos fetches lanza un error. ¿Qué hace Promise.all?

- A) Espera a que el otro termine y devuelve lo que pudo
- B) Rechaza apenas una promesa rechaza (fail-fast): el await entero lanza y entrás al catch
- C) Devuelve un array con undefined en el que falló
- D) Reintenta solo el que falló

**Respuesta:** 
