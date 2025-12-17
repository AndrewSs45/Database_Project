/**
 * DashboardController - Orchestrates dashboard operations
 */
class DashboardController {
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
  ) {
    this.getDashboardKPIsUseCase = getDashboardKPIsUseCase;
    this.getProfessorsUseCase = getProfessorsUseCase;
    this.getTutorsUseCase = getTutorsUseCase;
    this.getMedicalConditionsUseCase = getMedicalConditionsUseCase;
    this.getRecentRecognitionsUseCase = getRecentRecognitionsUseCase;
    this.getRecentAnnotationsUseCase = getRecentAnnotationsUseCase;
    this.getCreditsUseCase = getCreditsUseCase;
    this.getEventsUseCase = getEventsUseCase;
    this.getAttendanceUseCase = getAttendanceUseCase;
    this.updateUserUseCase = updateUserUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
    this.createTutorUseCase = createTutorUseCase;
    this.updateTutorUseCase = updateTutorUseCase;
    this.deleteTutorUseCase = deleteTutorUseCase;
  }

  async handleGetDashboard(req, res) {
    try {
      // Load all data in parallel
      const [kpis, professors, tutors, medicalConditions, recognitions, annotations, credits, events, attendance] = 
        await Promise.all([
          this.getDashboardKPIsUseCase.execute(),
          this.getProfessorsUseCase.execute(),
          this.getTutorsUseCase.execute(),
          this.getMedicalConditionsUseCase.execute(),
          this.getRecentRecognitionsUseCase.execute(10),
          this.getRecentAnnotationsUseCase.execute(10),
          this.getCreditsUseCase.execute(),
          this.getEventsUseCase.execute(),
          this.getAttendanceUseCase.execute()
        ]);

      const data = {
        kpis: kpis.success ? kpis.data : {},
        professors: professors.success ? professors.data : [],
        tutors: tutors.success ? tutors.data : [],
        medicalConditions: medicalConditions.success ? medicalConditions.data : [],
        recognitions: recognitions.success ? recognitions.data : [],
        annotations: annotations.success ? annotations.data : [],
        credits: credits.success ? credits.data : [],
        events: events.success ? events.data : [],
        attendance: attendance.success ? attendance.data : []
      };

      res.render('dashboard', data);
    } catch (error) {
      res.status(500).render('dashboard', { 
        error: 'Failed to load dashboard',
        kpis: {}, professors: [], tutors: [], medicalConditions: [],
        recognitions: [], annotations: [], credits: [], events: [], attendance: []
      });
    }
  }

  async handleUpdateUser(req, res) {
    try {
      const { userId, field, value } = req.body;

      if (!userId || !field || !value) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: userId, field, value'
        });
      }

      const result = await this.updateUserUseCase.execute(userId, field, value);
      
      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  async handleDeleteUser(req, res) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        });
      }

      const result = await this.deleteUserUseCase.execute(userId);
      
      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  async handleCreateTutor(req, res) {
    try {
      const { userId, firstName, lastName, contactNumber } = req.body;

      const result = await this.createTutorUseCase.execute(userId, firstName, lastName, contactNumber);
      
      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  async handleUpdateTutor(req, res) {
    try {
      const { tutorId, userId, firstName, lastName, contactNumber } = req.body;

      const result = await this.updateTutorUseCase.execute(tutorId, userId, firstName, lastName, contactNumber);
      
      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  async handleDeleteTutor(req, res) {
    try {
      const { tutorId } = req.body;

      if (!tutorId) {
        return res.status(400).json({
          success: false,
          error: 'Tutor ID is required'
        });
      }

      const result = await this.deleteTutorUseCase.execute(parseInt(tutorId));
      
      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}

module.exports = DashboardController;
