import { getUpcomingProjects,
         getProjectDetails,
         getCategoriesByProjectId,
         createProject   
 } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';


const number_of_projects = 5; // Number of upcoming projects to display


const showProjectsPage =  async (req, res) => {
    const projects = await getUpcomingProjects(number_of_projects);

    const title = "Upcoming Service Projects";
    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res, next) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) {
        const error = new Error('Project not found');
        error.status = 404;
        return next(error);
    }

    const categories = await getCategoriesByProjectId(projectId);
    const title = "Service Project Details";


    res.render('project', { title, project, categories });
};  


const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
}

const processNewProjectForm = async (req, res) => {
    // Extract form data from req.body
    const { title, description, location, date, organizationId } = req.body;

    try {
        // Create the new project in the database
        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
}

export { 
    showProjectsPage, 
    showProjectDetailsPage,
    showNewProjectForm, 
    processNewProjectForm
};