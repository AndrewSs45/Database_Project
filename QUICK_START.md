# 🚀 Guía Rápida - Dashboard UniTutorAdmin

## ⚡ Inicio Rápido en 3 Pasos

### 1️⃣ Importar Base de Datos
Ejecuta el SQL que generaste (`studentControl.sql`) en tu cliente MySQL:
```bash
mysql -h localhost -u UniTutorAdmin -p studentControl < studentControl.sql
```

### 2️⃣ Iniciar Servidor
```bash
npm start
```

Verás:
```
✓ Database pool created
🚀 Server running on http://localhost:3000
📊 Database: studentControl
🔗 Host: localhost
📋 Dashboard available at http://localhost:3000/dashboard
```

### 3️⃣ Acceder al Dashboard
Abre en tu navegador:
```
http://localhost:3000/dashboard
```

---

## 📊 ¿Qué Verás?

### Header
- Título: "Performance Overview – UniTutorAdmin"
- Subtítulo: "Sistema de Gestión Académica"

### KPI Cards (4 tarjetas)
- 👨‍🏫 **Profesores**: 10
- 👨‍🎓 **Estudiantes**: 100
- 👨‍👩‍👧 **Tutores**: 15
- 📅 **Próximos Eventos**: 4

### Secciones con Tablas
1. **Profesores** - Listar, editar edad/características, eliminar
2. **Tutores** - CRUD completo (crear, listar, editar, eliminar)
3. **Condiciones Médicas** - Visualizar alergias, asma, diabetes, etc.
4. **Reconocimientos** - Últimos premios y reconocimientos
5. **Anotaciones** - Notas recientes sobre estudiantes
6. **Créditos** - Balance positivo/negativo de estudiantes
7. **Eventos** - Calendario de eventos académicos
8. **Asistencia** - Control por evento (Presente/Ausente/Justificado)

---

## 🎮 Cómo Usar Cada Función

### Editar Usuario (Profesor)
```
1. Busca la tabla "Profesores"
2. Haz click en botón "Editar" (azul)
3. Se abre modal
4. Cambia Edad o Características
5. Click en "Guardar Cambios"
6. Dashboard se actualiza
```

### Eliminar Usuario
```
1. Haz click en "Eliminar" (rojo)
2. Confirma en el popup
3. Usuario eliminado (y sus tutores asociados)
```

### Crear Nuevo Tutor
```
1. Haz click en "+ Nuevo Tutor"
2. Llena el formulario:
   - Estudiante ID: ej. "STU6001"
   - Nombre: ej. "Carlos"
   - Apellido: ej. "Doe"
   - Teléfono: ej. "+54-9-11-5555-0001"
3. Click "Guardar Tutor"
```

### Editar Tutor
```
1. Busca el tutor en la tabla
2. Click en "Editar"
3. Modal abre con datos
4. Modifica y guarda
```

### Eliminar Tutor
```
1. Click en "Eliminar"
2. Confirma
3. Listo
```

---

## 🏛️ Estructura de Archivos

```
src/
├── domain/
│   ├── entities/          # 8 entidades de negocio
│   └── repositories/      # 9 interfaces de repositorios
├── application/
│   └── use-cases/         # 13 casos de uso
├── infrastructure/
│   ├── repositories/      # 9 implementaciones MySQL
│   ├── database/
│   │   └── DatabaseConnection.js
│   └── server.js          # Servidor Express
└── interface/
    ├── controllers/       # DashboardController
    ├── routes/           # Rutas del dashboard
    ├── views/
    │   └── dashboard.ejs  # Vista principal
    └── public/

src/frontend/
├── dashboard.css          # Estilos
└── dashboard-index.js     # Assets JS
```

---

## 🎨 Características Visuales

### Cards KPI
- Fondo blanco con borde izquierdo de color
- Número grande y label en mayúsculas
- Icono emoji a la derecha
- Hover: levanta y añade sombra

### Tablas
- Headers con fondo gradiente gris
- Filas alternadas (blanco/gris claro)
- Hover: fondo azul claro
- Sticky headers (quedan arriba al scroll)

### Botones
- **Azul**: Editar (primary)
- **Verde**: Crear/Guardar (success)
- **Rojo**: Eliminar (danger)
- **Gris**: Cancelar (secondary)

### Badges
- **Verde**: Positivo, Presente
- **Rojo**: Negativo, Ausente
- **Naranja**: Condiciones médicas
- **Azul**: Información general

### Alertas
- Aparecen arriba
- Auto-desaparecen en 4 segundos
- Verde para éxito, rojo para errores

---

## 🔧 Desarrollo

### Modo Desarrollo (con auto-reload)
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

### Build Frontend (si usas Webpack)
```bash
npm run build
```

---

## 📱 Responsividad

- **Desktop** (1024px+): Óptimo, todas las características visibles
- **Tablet** (768-1024px): Tablas con scroll horizontal
- **Móvil** (<768px): Stack vertical, botones full-width

---

## 🐛 Solucionar Problemas

### "Cannot find module..."
```bash
npm install
```

### "Connection refused" a MySQL
- Verifica que MySQL esté corriendo
- Comprueba credenciales en `.env`
- Confirma que la BD `studentControl` existe

### "port 3000 already in use"
```bash
# Cambia PORT en .env a otro puerto (ej: 3001)
PORT=3001
```

### Estilos no cargan
- Asegúrate que `/dashboard.css` esté en `src/frontend/`
- Si usas producción, ejecuta `npm run build` primero

---

## 🎯 Próximos Pasos

1. **Explorar**: Navega todas las secciones
2. **Probar CRUD**: Crea, edita y elimina tutores
3. **Personalizar**: Edita los estilos en `dashboard.css`
4. **Expandir**: Añade más funcionalidades según necesites

---

## 📞 Soporte

Para preguntas sobre la arquitectura, revisa `DASHBOARD_README.md`

¡Disfruta tu dashboard académico! 🎉
