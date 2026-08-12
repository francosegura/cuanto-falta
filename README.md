# Faltan Dias

App familiar que muestra cuantos dias faltan para el proximo viaje entre
hermanos (en Espana) y padres/abuelo (en Rio Negro, Argentina).

## Que tiene esta primera version (MVP)

- Pantalla principal con el contador gigante: "FALTAN X DIAS PARA VER A [NOMBRE]"
- Los datos de los viajes estan escritos a mano en `src/data/trips.js`
- Muestra automaticamente el proximo viaje que va a pasar (el mas cercano en el tiempo)
- Una animacion simple de avion volando de un personaje a otro (placeholder con emojis,
  se reemplaza despues por las ilustraciones generadas con IA)

## Lo que todavia NO tiene (proximos pasos)

- Conexion a Firebase (por ahora los datos son fijos en el codigo)
- Notificaciones configurables
- Integracion con Google Calendar
- Ilustraciones reales de la familia

## Como correrlo en tu computadora

### 1. Instalar Node.js
Si no lo tenes, bajalo de https://nodejs.org (version LTS).

### 2. Instalar las dependencias del proyecto
Abri una terminal dentro de esta carpeta (`faltan-dias`) y corre:

```
npm install
```

### 3. Instalar Expo Go en el celular
- iPhone: buscar "Expo Go" en la App Store
- Android: buscar "Expo Go" en Google Play

### 4. Iniciar el proyecto
En la misma terminal:

```
npm start
```

Esto va a abrir una ventana en el navegador con un codigo QR.

### 5. Abrir la app en el celular
- iPhone: abrir la app de Camara y apuntar al QR, va a aparecer un aviso para
  abrirlo en Expo Go
- Android: abrir Expo Go y tocar "Scan QR code"

Con eso ya deberias ver la pantalla del contador funcionando en tu celular,
con los datos de ejemplo de `src/data/trips.js`.

## Como cambiar la fecha de un viaje (por ahora, a mano)

Editar el archivo `src/data/trips.js` y cambiar el valor de `date`
(formato `YYYY-MM-DD`, por ejemplo `2026-11-03`). Guardar el archivo:
la app se actualiza sola en el celular sin reiniciar nada.
