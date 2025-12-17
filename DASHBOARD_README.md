# UniTutorAdmin Dashboard - Arquitectura Clean Architecture

## 📊 Descripción General

Se ha implementado un **Dashboard académico completo** para la base de datos `studentControl` siguiendo **Clean Architecture** con Node.js + Express + MySQL2. El sistema proporciona:

### ✅ Características Implementadas

#### 1. **KPIs y Estadísticas Principales**
- Total de profesores (Role_ID = 1000)
- Total de estudiantes (Role_ID = 1001)
- Total de tutores registrados
- Próximos eventos académicos

#### 2. **Gestión de Usuarios**
- **Listado de Profesores**: Mostrar todos los profesores con opciones de editar edad/características y eliminar
- **Edición de Usuarios**: Actualizar Age y Characteristics mediante modal interactivo
- **Eliminación de Usuarios**: Borrar usuarios con confirmación y cascada de datos relacionados

#### 3. **Gestión de Tutores**
- **CRUD Completo**: Crear, leer, actualizar y eliminar tutores
- **Relación con Estudiantes**: Vinculación mediante User_ID
- **Contacto Directo**: Mostrar y editar número de contacto
- **Modal de Formularios**: Interfaz amigable para crear/editar

#### 4. **Datos Académicos**
- **Condiciones Médicas**: Listado de condiciones por estudiante
- **Reconocimientos**: Últimos 10 reconocimientos con fechas
- **Anotaciones**: Notas recientes sobre estudiantes
- **Créditos**: Balance positivo/negativo de estudiantes con valores
- **Eventos**: Calendario de eventos académicos próximos
- **Asistencia**: Control de asistencia por evento (Presente/Ausente/Justificado)

---

## 🏗️ Arquitectura Clean Architecture

### **Capas Implementadas**

#### **1. Domain Layer** (`src/domain/`)
**Entidades:**
- `UserEntity` - Usuarios (profesores y estudiantes)
- `TutorEntity` - Tutores/Apoderados
- `MedicalConditionEntity` - Condiciones médicas
- `RecognitionEntity` - Reconocimientos
- `AnnotationEntity` - Anotaciones
- `CreditEntity` - Créditos académicos
- `CreditHistoryEntity` - Historial de créditos
- `EventEntity` - Eventos académicos
- `AttendanceEntity` - Registros de asistencia

**Interfaces de Repositorios:**
- `IUserRepository`
- `ITutorRepository`
- `IMedicalConditionRepository`
- `IRecognitionRepository`
- `IAnnotationRepository`
- `ICreditRepository`
- `ICreditHistoryRepository`
- `IEventRepository`
- `IAttendanceRepository`

#### **2. Application Layer** (`src/application/use-cases/`)
**Use Cases de Lectura:**
- `GetDashboardKPIsUseCase` - KPIs principales
- `GetProfessorsUseCase` - Listado de profesores
- `GetTutorsUseCase` - Listado de tutores
- `GetMedicalConditionsUseCase` - Condiciones médicas
- `GetRecentRecognitionsUseCase` - Reconocimientos recientes
- `GetRecentAnnotationsUseCase` - Anotaciones recientes
- `GetCreditsUseCase` - Créditos
- `GetEventsUseCase` - Eventos
- `GetAttendanceUseCase` - Asistencia

**Use Cases de Modificación:**
- `UpdateUserUseCase` - Actualizar usuario
- `DeleteUserUseCase` - Eliminar usuario
- `CreateTutorUseCase` - Crear tutor
- `UpdateTutorUseCase` - Actualizar tutor
- `DeleteTutorUseCase` - Eliminar tutor

#### **3. Infrastructure Layer** (`src/infrastructure/`)
**Repositorios MySQL:**
- `MySQLUserRepository`
- `MySQLTutorRepository`
- `MySQLMedicalConditionRepository`
- `MySQLRecognitionRepository`
- `MySQLAnnotationRepository`
- `MySQLCreditRepository`
- `MySQLCreditHistoryRepository`
- `MySQLEventRepository`
- `MySQLAttendanceRepository`

**Configuración:**
- `DatabaseConnection.js` - Pool de conexiones MySQL2
- `server.js` - Configuración del servidor Express

#### **4. Interface Layer** (`src/interface/`)
**Controladores:**
- `DashboardController` - Orquesta todos los use-cases del dashboard
  - `handleGetDashboard()` - Renderiza la página
  - `handleUpdateUser()` - API para actualizar usuario
  - `handleDeleteUser()` - API para eliminar usuario
  - `handleCreateTutor()` - API para crear tutor
  - `handleUpdateTutor()` - API para actualizar tutor
  - `handleDeleteTutor()` - API para eliminar tutor

**Rutas:**
```javascript
GET /dashboard                    // Mostrar dashboard
POST /users/update               // Actualizar usuario
POST /users/delete               // Eliminar usuario
POST /tutors/create              // Crear tutor
POST /tutors/update              // Actualizar tutor
POST /tutors/delete              // Eliminar tutor
```

**Vistas:**
- `dashboard.ejs` - Dashboard completo con tablas, cards y modales

---

## 🎨 Diseño Visual

### **Paleta de Colores**
- **Primary Blue**: `#1f6feb` - Acciones principales
- **Dark Blue**: `#0d47a1` - Headers y énfasis
- **Success Green**: `#27ae60` - Positivo/Éxito
- **Danger Red**: `#e74c3c` - Negativo/Peligro
- **Warning Orange**: `#f39c12` - Alertas
- **Light Gray**: `#f5f7fb` - Fondos
- **Border Gray**: `#e0e6ed` - Bordes

### **Componentes**
- **Cards KPI**: Gradient backgrounds, iconos, números grandes
- **Tablas**: Filas alternadas, headers pegajosos, hover effects
- **Botones**: Estados primary, success, danger con transiciones suaves
- **Modales**: Animaciones slide-up, overlays oscuros, validación inline
- **Badges**: Colores según tipo (success, danger, warning, info)
- **Alerts**: Mensajes flotantes con auto-dismiss

### **Responsividad**
- **Desktop** (1024px+): Grid de 4 columnas para KPIs, tablas completas
- **Tablet** (768px-1024px): Grid de 2-3 columnas, tablas con scroll
- **Móvil** (<768px): Stack vertical, botones full-width, tablas comprimidas

---

## 📋 Tablas y Campos SQL Utilizados

```sql
-- Users
User_ID VARCHAR(20) PRIMARY KEY
First_Name VARCHAR(50), Last_Name VARCHAR(50)
Age INT, Email VARCHAR(100)
Grade_ID INT, Characteristics TEXT
Role_ID INT (1000=Professor, 1001=Student)

-- Tutor
Tutor_ID INT AUTO_INCREMENT PRIMARY KEY
User_ID VARCHAR(20) FOREIGN KEY
First_Name VARCHAR(50), Last_Name VARCHAR(50)
Contact_Number VARCHAR(20)

-- Medical_Condition
Condition_ID INT AUTO_INCREMENT PRIMARY KEY
User_ID VARCHAR(20) FOREIGN KEY
Condition_Name VARCHAR(100)
Description TEXT

-- Recognition
Recognition_ID INT AUTO_INCREMENT PRIMARY KEY
User_ID VARCHAR(20) FOREIGN KEY
Description TEXT, Date DATE

-- Annotation
Annotation_ID INT AUTO_INCREMENT PRIMARY KEY
User_ID VARCHAR(20) FOREIGN KEY
Description TEXT, Date DATE

-- Credit
Credit_ID INT AUTO_INCREMENT PRIMARY KEY
User_ID VARCHAR(20) FOREIGN KEY
Type ENUM('Positive','Negative')
Reason VARCHAR(200), Date DATE, Value INT

-- Credit_History
History_ID INT AUTO_INCREMENT PRIMARY KEY
User_ID VARCHAR(20) FOREIGN KEY
Total_Positive INT, Total_Negative INT
Balance INT GENERATED

-- Event
Event_ID INT AUTO_INCREMENT PRIMARY KEY
Event_Name VARCHAR(100)
Description TEXT, Date DATE, Location VARCHAR(100)

-- Attendance
Attendance_ID INT AUTO_INCREMENT PRIMARY KEY
User_ID VARCHAR(20) FOREIGN KEY
Event_ID INT FOREIGN KEY
Date DATE, Status ENUM('Present','Absent','Justified')
```

---

## 🚀 Cómo Usar

### **1. Requisitos Previos**
```bash
Node.js >= 14.0
MySQL Server ejecutándose
npm install (ya ejecutado)
```

### **2. Configuración .env**
```env
DB_HOST=localhost
DB_USER=UniTutorAdmin
DB_PASSWORD=UniTutor4dm1n2025
DB_NAME=studentControl
DB_PORT=3306
PORT=3000
```

### **3. Ejecutar la Aplicación**
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

### **4. Acceder al Dashboard**
Abrir navegador en: `http://localhost:3000/dashboard`

---

## 📝 Funcionalidades Específicas

### **Actualizar Usuario**
1. Click en botón "Editar" en la fila del profesor
2. Se abre modal con Edad y Características
3. Editar y guardar
4. Dashboard se actualiza automáticamente

### **Eliminar Usuario**
1. Click en "Eliminar"
2. Confirmación de seguridad
3. Se elimina usuario y tutores asociados
4. Dashboard se recarga

### **Crear Tutor**
1. Click en "+ Nuevo Tutor"
2. Llenar formulario (Estudiante ID, Nombre, Apellido, Teléfono)
3. Guardar
4. Se añade a la tabla

### **Editar Tutor**
1. Click en "Editar" en la fila del tutor
2. Modal se abre con datos precargados
3. Modificar y guardar

### **Eliminar Tutor**
1. Click en "Eliminar"
2. Confirmación
3. Se elimina del sistema

---

## 🔒 Validación y Seguridad

- **Input Validation**: Longitudes máximas en use-cases
- **Sanitización**: Parámetros validados antes de queries SQL
- **Error Handling**: Try-catch en controladores y repositorios
- **Mensajes Seguros**: No exponen detalles técnicos
- **Transacciones**: Cascada de eliminación (User → Tutor)

---

## 📊 Estadísticas de Código

- **Entidades**: 8
- **Repositorio Interfaces**: 9
- **Repositorio Implementaciones**: 9
- **Use Cases**: 13
- **Controladores**: 1 (DashboardController)
- **Rutas**: 5 (GET /dashboard, POST 4 operations)
- **Vistas**: 1 (dashboard.ejs con 900+ líneas)
- **Estilos**: 1 (dashboard.css con 600+ líneas)

---

## 🎯 Objetivos Cumplidos

✅ Clean Architecture con separación clara de capas
✅ CRUD completo para usuarios y tutores
✅ Dashboard con KPIs y múltiples secciones
✅ Diseño responsivo y moderno
✅ Validación de entrada y manejo de errores
✅ Modales y formularios interactivos
✅ Tablas con diseño profesional
✅ Badges y estados visuales
✅ Mensajes de éxito/error
✅ Arquitectura escalable para futuras mejoras

---

## 📞 Próximas Mejoras (Opcionales)

- [ ] Crear/editar reconocimientos y anotaciones desde dashboard
- [ ] Crear/editar créditos desde dashboard
- [ ] Exportar datos a CSV/Excel
- [ ] Filtros avanzados en tablas
- [ ] Búsqueda por nombre/ID
- [ ] Paginación en tablas grandes
- [ ] Autenticación de usuarios
- [ ] Roles y permisos
- [ ] Auditoría de cambios
- [ ] Gráficos de estadísticas
