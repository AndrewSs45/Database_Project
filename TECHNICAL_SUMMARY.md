# 📋 Resumen Técnico - Dashboard UniTutorAdmin

## 🏗️ Arquitectura Implementada: Clean Architecture

```
┌─────────────────────────────────────────────────┐
│           INTERFACE LAYER (Presentación)        │
│  Controllers → Routes → Views (EJS + CSS/JS)   │
├─────────────────────────────────────────────────┤
│         APPLICATION LAYER (Casos de Uso)       │
│  Lógica de negocio, validaciones, orquestación │
├─────────────────────────────────────────────────┤
│           INFRASTRUCTURE LAYER                  │
│  Repositorios MySQL, Database Connection Pool  │
├─────────────────────────────────────────────────┤
│  DOMAIN LAYER (Entidades e Interfaces)         │
│  Reglas de negocio, interfaces de repositorios │
└─────────────────────────────────────────────────┘
```

---

## 📁 Árbol de Archivos Creados

```
src/
├── domain/
│   ├── entities/
│   │   ├── UserEntity.js
│   │   ├── TutorEntity.js
│   │   ├── MedicalConditionEntity.js
│   │   ├── RecognitionEntity.js
│   │   ├── AnnotationEntity.js
│   │   ├── CreditEntity.js
│   │   ├── CreditHistoryEntity.js
│   │   ├── EventEntity.js
│   │   └── AttendanceEntity.js
│   └── repositories/
│       ├── IUserRepository.js
│       ├── ITutorRepository.js
│       ├── IMedicalConditionRepository.js
│       ├── IRecognitionRepository.js
│       ├── IAnnotationRepository.js
│       ├── ICreditRepository.js
│       ├── ICreditHistoryRepository.js
│       ├── IEventRepository.js
│       └── IAttendanceRepository.js
├── application/
│   └── use-cases/
│       ├── GetDashboardKPIsUseCase.js
│       ├── GetProfessorsUseCase.js
│       ├── GetTutorsUseCase.js
│       ├── GetMedicalConditionsUseCase.js
│       ├── GetRecentRecognitionsUseCase.js
│       ├── GetRecentAnnotationsUseCase.js
│       ├── GetCreditsUseCase.js
│       ├── GetEventsUseCase.js
│       ├── GetAttendanceUseCase.js
│       ├── UpdateUserUseCase.js
│       ├── DeleteUserUseCase.js
│       ├── CreateTutorUseCase.js
│       ├── UpdateTutorUseCase.js
│       └── DeleteTutorUseCase.js
├── infrastructure/
│   ├── repositories/
│   │   ├── MySQLUserRepository.js
│   │   ├── MySQLTutorRepository.js
│   │   ├── MySQLMedicalConditionRepository.js
│   │   ├── MySQLRecognitionRepository.js
│   │   ├── MySQLAnnotationRepository.js
│   │   ├── MySQLCreditRepository.js
│   │   ├── MySQLCreditHistoryRepository.js
│   │   ├── MySQLEventRepository.js
│   │   └── MySQLAttendanceRepository.js
│   ├── database/
│   │   └── DatabaseConnection.js
│   └── server.js (ACTUALIZADO)
├── interface/
│   ├── controllers/
│   │   └── DashboardController.js (NUEVO)
│   ├── routes/
│   │   └── routes.js (ACTUALIZADO)
│   └── views/
│       └── dashboard.ejs (NUEVO)
└── frontend/
    ├── dashboard.css (NUEVO)
    └── dashboard-index.js (NUEVO)
```

---

## 🔗 Flujo de Datos

### GET /dashboard (Renderizar)
```
Browser Request
      ↓
Router (GET /dashboard)
      ↓
DashboardController.handleGetDashboard()
      ↓
Ejecuta 9 Use Cases en paralelo:
  • GetDashboardKPIsUseCase
  • GetProfessorsUseCase
  • GetTutorsUseCase
  • GetMedicalConditionsUseCase
  • GetRecentRecognitionsUseCase
  • GetRecentAnnotationsUseCase
  • GetCreditsUseCase
  • GetEventsUseCase
  • GetAttendanceUseCase
      ↓
Cada Use Case → Repositorio → MySQL Query
      ↓
Recolecta datos en objeto
      ↓
res.render('dashboard', data)
      ↓
EJS genera HTML con datos
      ↓
CSS (dashboard.css) estiliza
      ↓
Browser renderiza página completa
```

### POST /users/update (Actualizar Usuario)
```
Form Submit (AJAX)
      ↓
POST /users/update
      ↓
DashboardController.handleUpdateUser()
      ↓
Valida: userId, field, value
      ↓
UpdateUserUseCase.execute()
      ↓
Valida longitudes y formato
      ↓
MySQLUserRepository.updateField()
      ↓
SQL: UPDATE Users SET [field] = ? WHERE User_ID = ?
      ↓
Retorna resultado JSON
      ↓
JavaScript frontend:
  - Si éxito: Muestra alerta verde, recarga página
  - Si error: Muestra alerta roja
```

### POST /tutors/create (Crear Tutor)
```
Form Submit (AJAX)
      ↓
POST /tutors/create
      ↓
DashboardController.handleCreateTutor()
      ↓
CreateTutorUseCase.execute()
      ↓
Valida todos los campos
      ↓
Crea TutorEntity
      ↓
MySQLTutorRepository.create()
      ↓
SQL: INSERT INTO Tutor (User_ID, First_Name, Last_Name, Contact_Number)
      ↓
Retorna Tutor ID
      ↓
Respuesta JSON con éxito
      ↓
Frontend recarga dashboard
```

---

## 🔌 Dependencias Inyectadas

### DashboardController recibe:
```javascript
constructor(
  getDashboardKPIsUseCase,
  getProfessorsUseCase,
  getTutorsUseCase,
  getMedicalConditionsUseCase,
  getRecentRecognitionsUseCase,
  getRecentAnnotationsUseCase,
  getCreditsUseCase,
  getEventsUseCase,
  getAttendanceUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  createTutorUseCase,
  updateTutorUseCase,
  deleteTutorUseCase
)
```

### Cada Use Case recibe sus repositorios:
```javascript
// Ejemplo: GetProfessorsUseCase
constructor(userRepository) {
  this.userRepository = userRepository;
}

// Ejemplo: UpdateUserUseCase
constructor(userRepository) {
  this.userRepository = userRepository;
}

// Ejemplo: CreateTutorUseCase
constructor(tutorRepository) {
  this.tutorRepository = tutorRepository;
}
```

### Cada Repositorio recibe el pool de MySQL:
```javascript
class MySQLUserRepository {
  constructor(pool) {
    this.pool = pool;
  }
}
```

---

## 📊 Métodos por Clase

### DashboardController (6 métodos)
- `handleGetDashboard(req, res)` - Obtiene y renderiza datos
- `handleUpdateUser(req, res)` - Actualiza usuario
- `handleDeleteUser(req, res)` - Elimina usuario
- `handleCreateTutor(req, res)` - Crea tutor
- `handleUpdateTutor(req, res)` - Actualiza tutor
- `handleDeleteTutor(req, res)` - Elimina tutor

### MySQLUserRepository (6 métodos)
- `getAll()` - Obtiene todos los usuarios
- `getById(userId)` - Usuario específico
- `getProfessors()` - Solo profesores
- `getStudents()` - Solo estudiantes
- `countByRole()` - Cuenta por rol
- `updateField(userId, field, value)` - Actualiza campo
- `deleteById(userId)` - Elimina usuario

### Cada Entity (métodos helper)
```javascript
UserEntity: isStudent(), isProfessor(), getFullName()
TutorEntity: getFullName()
RecognitionEntity: getDateFormatted()
AnnotationEntity: getDateFormatted()
CreditEntity: isPositive(), isNegative(), getDateFormatted()
EventEntity: getDateFormatted(), isUpcoming()
AttendanceEntity: isPresent(), isAbsent(), isJustified(), getDateFormatted()
```

---

## 🎯 Validaciones Implementadas

### UpdateUserUseCase
- ✓ userId, field, value requeridos
- ✓ field no nulo
- ✓ field < 50 caracteres
- ✓ value < 500 caracteres (strings)
- ✓ Usuario debe existir

### DeleteUserUseCase
- ✓ userId válido (string)
- ✓ Usuario existe
- ✓ Elimina tutores asociados antes
- ✓ Luego elimina el usuario

### CreateTutorUseCase
- ✓ Todos los campos requeridos
- ✓ firstName < 50 caracteres
- ✓ lastName < 50 caracteres
- ✓ contactNumber < 20 caracteres

### UpdateTutorUseCase
- ✓ Todas las validaciones de CreateTutor
- ✓ Tutor debe existir

### DeleteTutorUseCase
- ✓ tutorId válido (number)
- ✓ Tutor existe antes de eliminar

---

## 💾 Queries SQL Utilizadas

### Lectura
```sql
SELECT * FROM Users
SELECT * FROM Users WHERE Role_ID = 1000 (Profesores)
SELECT * FROM Users WHERE Role_ID = 1001 (Estudiantes)
SELECT COUNT(*) FROM Users WHERE Role_ID = [id]
SELECT * FROM Tutor
SELECT * FROM Medical_Condition
SELECT * FROM Recognition ORDER BY Date DESC LIMIT 10
SELECT * FROM Annotation ORDER BY Date DESC LIMIT 10
SELECT * FROM Credit
SELECT * FROM Event WHERE Date >= CURDATE() ORDER BY Date ASC
SELECT * FROM Attendance
```

### Escritura
```sql
UPDATE Users SET [field] = ? WHERE User_ID = ?
DELETE FROM Users WHERE User_ID = ?
INSERT INTO Tutor (User_ID, First_Name, Last_Name, Contact_Number)
UPDATE Tutor SET ... WHERE Tutor_ID = ?
DELETE FROM Tutor WHERE Tutor_ID = ?
DELETE FROM Tutor WHERE User_ID = ? (cascada)
```

---

## 🎨 Componentes CSS

### Layout
- `.dashboard-header` - Header sticky con gradient
- `.dashboard-container` - Max-width 1400px, centrado
- `.kpi-section` - Grid responsive para KPIs
- `.table-section` - Tablas responsivas

### Componentes
- `.kpi-card` - Card individual con border coloreado
- `.badge` - Badges para estados
- `.btn` - Botones con variantes
- `.modal` - Modales con overlay
- `.alert` - Alertas con colores por tipo

### Responsividad
- Desktop: Grid de 4 columnas
- Tablet (1024px): Grid de 2-3 columnas
- Mobile (768px): Stack vertical
- Pequeño (480px): Optimizado para phones

---

## 🚀 Performance

- **Carga de Dashboard**: Ejecuta 9 queries en paralelo (Promise.all)
- **Pool de Conexiones**: 10 conexiones máximo
- **Sin ORM**: SQL directo = más rápido
- **Lazy Loading**: Solo carga datos necesarios
- **Caching**: Puedes agregar con Redis si lo necesitas

---

## 🔐 Seguridad

✓ Parametrized queries (? placeholders)
✓ Input validation en use-cases
✓ Error handling sin detalles sensibles
✓ CORS: No configurado (confiar en mismo origen)
✓ XSS: EJS escapa HTML automáticamente

---

## 📈 Escalabilidad

La arquitectura permite fácilmente:
1. Agregar más repositorios
2. Agregar más use-cases
3. Agregar más tablas
4. Agregar autenticación
5. Agregar roles y permisos
6. Agregar auditoría
7. Cambiar BD sin afectar controladores

---

## 🎓 Ejemplo: Agregar Nueva Funcionalidad

Supongamos querer crear "Crear Anotación" desde dashboard:

1. **Crear Use Case** (`CreateAnnotationUseCase.js`)
```javascript
class CreateAnnotationUseCase {
  constructor(annotationRepository) { ... }
  async execute(userId, description, date) { ... }
}
```

2. **Agregar método a Controlador**
```javascript
async handleCreateAnnotation(req, res) { ... }
```

3. **Agregar ruta**
```javascript
router.post('/annotations/create', (req, res) => dashboardController.handleCreateAnnotation(req, res));
```

4. **Agregar botón en vista**
```ejs
<button onclick="openAnnotationModal()">+ Nueva Anotación</button>
```

5. **Agregar modal en JS**
- Formulario en HTML
- Manejador de submit
- AJAX POST a /annotations/create

**¡Listo!** Arquitectura clean hace cambios fáciles y seguros.

---

## 📞 Contacto y Soporte

- Ver `DASHBOARD_README.md` para documentación completa
- Ver `QUICK_START.md` para uso rápido
- Revisar código en `src/` para detalles técnicos
