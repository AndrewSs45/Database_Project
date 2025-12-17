const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Infrastructure - Existing repositories
const MySQLTableRepository = require('./repositories/MySQLTableRepository');

// Infrastructure - Dashboard repositories
const MySQLUserRepository = require('./repositories/MySQLUserRepository');
const MySQLTutorRepository = require('./repositories/MySQLTutorRepository');
const MySQLMedicalConditionRepository = require('./repositories/MySQLMedicalConditionRepository');
const MySQLRecognitionRepository = require('./repositories/MySQLRecognitionRepository');
const MySQLAnnotationRepository = require('./repositories/MySQLAnnotationRepository');
const MySQLCreditRepository = require('./repositories/MySQLCreditRepository');
const MySQLCreditHistoryRepository = require('./repositories/MySQLCreditHistoryRepository');
const MySQLEventRepository = require('./repositories/MySQLEventRepository');
const MySQLAttendanceRepository = require('./repositories/MySQLAttendanceRepository');

// Database Connection
const DatabaseConnection = require('./database/DatabaseConnection');

// Application - Existing use cases
const GetTablesUseCase = require('../application/use-cases/GetTablesUseCase');

// Application - Dashboard use cases
const GetDashboardKPIsUseCase = require('../application/use-cases/GetDashboardKPIsUseCase');
const GetProfessorsUseCase = require('../application/use-cases/GetProfessorsUseCase');
const GetTutorsUseCase = require('../application/use-cases/GetTutorsUseCase');
const GetMedicalConditionsUseCase = require('../application/use-cases/GetMedicalConditionsUseCase');
const GetRecentRecognitionsUseCase = require('../application/use-cases/GetRecentRecognitionsUseCase');
const GetRecentAnnotationsUseCase = require('../application/use-cases/GetRecentAnnotationsUseCase');
const GetCreditsUseCase = require('../application/use-cases/GetCreditsUseCase');
const GetEventsUseCase = require('../application/use-cases/GetEventsUseCase');
const GetAttendanceUseCase = require('../application/use-cases/GetAttendanceUseCase');
const UpdateUserUseCase = require('../application/use-cases/UpdateUserUseCase');
const DeleteUserUseCase = require('../application/use-cases/DeleteUserUseCase');
const CreateTutorUseCase = require('../application/use-cases/CreateTutorUseCase');
const UpdateTutorUseCase = require('../application/use-cases/UpdateTutorUseCase');
const DeleteTutorUseCase = require('../application/use-cases/DeleteTutorUseCase');

// Interface - Existing controllers
const TableController = require('../interface/controllers/TableController');

// Interface - Dashboard controller
const DashboardController = require('../interface/controllers/DashboardController');

// Routes
const createRouter = require('../interface/routes/routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.pool = null;
    
    this.setupMiddleware();
    this.setupDatabase();
    this.setupDependencies();
    this.setupRoutes();
  }

  setupMiddleware() {
    // View engine setup
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '../interface/views'));

    // Static files
    // Serve CSS, JS, and other assets
    this.app.use(express.static(path.join(__dirname, '../frontend')));
    // Serve built webpack assets from /dist
    this.app.use('/dist', express.static(path.join(__dirname, '../../dist')));
    this.app.use(express.static(path.join(__dirname, '../interface/public')));

    // Parse JSON bodies
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  async setupDatabase() {
    try {
      this.pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'studentControl',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      console.log('✓ Database pool created');
    } catch (error) {
      console.error('✗ Database pool error:', error);
    }
  }

  setupDependencies() {
    // Existing dependencies
    const tableRepository = new MySQLTableRepository();
    const getTablesUseCase = new GetTablesUseCase(tableRepository);
    this.tableController = new TableController(getTablesUseCase, tableRepository);

    // Dashboard repositories
    const userRepository = new MySQLUserRepository(this.pool);
    const tutorRepository = new MySQLTutorRepository(this.pool);
    const medicalConditionRepository = new MySQLMedicalConditionRepository(this.pool);
    const recognitionRepository = new MySQLRecognitionRepository(this.pool);
    const annotationRepository = new MySQLAnnotationRepository(this.pool);
    const creditRepository = new MySQLCreditRepository(this.pool);
    const creditHistoryRepository = new MySQLCreditHistoryRepository(this.pool);
    const eventRepository = new MySQLEventRepository(this.pool);
    const attendanceRepository = new MySQLAttendanceRepository(this.pool);

    // Dashboard use cases
    const getDashboardKPIsUseCase = new GetDashboardKPIsUseCase(userRepository, tutorRepository, eventRepository, creditHistoryRepository);
    const getProfessorsUseCase = new GetProfessorsUseCase(userRepository);
    const getTutorsUseCase = new GetTutorsUseCase(tutorRepository);
    const getMedicalConditionsUseCase = new GetMedicalConditionsUseCase(medicalConditionRepository);
    const getRecentRecognitionsUseCase = new GetRecentRecognitionsUseCase(recognitionRepository);
    const getRecentAnnotationsUseCase = new GetRecentAnnotationsUseCase(annotationRepository);
    const getCreditsUseCase = new GetCreditsUseCase(creditRepository);
    const getEventsUseCase = new GetEventsUseCase(eventRepository);
    const getAttendanceUseCase = new GetAttendanceUseCase(attendanceRepository);
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    const deleteUserUseCase = new DeleteUserUseCase(userRepository, tutorRepository);
    const createTutorUseCase = new CreateTutorUseCase(tutorRepository);
    const updateTutorUseCase = new UpdateTutorUseCase(tutorRepository);
    const deleteTutorUseCase = new DeleteTutorUseCase(tutorRepository);

    // Dashboard controller
    this.dashboardController = new DashboardController(
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
    );
  }

  setupRoutes() {
    const router = createRouter(this.tableController, this.dashboardController);
    this.app.use('/', router);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on http://localhost:${this.port}`);
      console.log(`📊 Database: ${process.env.DB_NAME || 'Not configured'}`);
      console.log(`🔗 Host: ${process.env.DB_HOST || 'Not configured'}`);
      console.log(`📋 Dashboard available at http://localhost:${this.port}/dashboard`);
    });
  }
}

// Start server
const server = new Server();
server.start();

module.exports = Server;
