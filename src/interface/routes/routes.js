const express = require('express');

function createRouter(tableController, dashboardController) {
  const router = express.Router();

  // Existing table routes
  router.get('/', (req, res) => tableController.showTablesPage(req, res));
  router.get('/bank', (req, res) => tableController.showBankPage(req, res));
  router.get('/hello', (req, res) => tableController.showHelloWorld(req, res));
  router.get('/query', (req, res) => tableController.showQueryPage(req, res));

  // Dashboard routes
  router.get('/dashboard', (req, res) => dashboardController.handleGetDashboard(req, res));

  // User management routes
  router.post('/users/update', (req, res) => dashboardController.handleUpdateUser(req, res));
  router.post('/users/delete', (req, res) => dashboardController.handleDeleteUser(req, res));

  // Tutor management routes
  router.post('/tutors/create', (req, res) => dashboardController.handleCreateTutor(req, res));
  router.post('/tutors/update', (req, res) => dashboardController.handleUpdateTutor(req, res));
  router.post('/tutors/delete', (req, res) => dashboardController.handleDeleteTutor(req, res));

  return router;
}

module.exports = createRouter;