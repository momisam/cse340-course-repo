import expess from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, 
         showNewOrganizationForm, 
         processNewOrganizationForm, 
         showEditOrganizationForm, 
         processEditOrganizationForm, 
         organizationValidation } from './controllers/organizations.js';
import { showProjectsPage, 
         showProjectDetailsPage,
         showNewProjectForm,
         processNewProjectForm
         } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';

const router = expess.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', processNewProjectForm);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage)


//error-handling routes
router.get('/error', testErrorPage);




export default router;