import { getUpcomingProjects,
         getProjectDetails   
 } from '../models/projects.js';


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
    const title = "Service Project Details";
    res.render('project', { title, project });
}  



export { 
    showProjectsPage, 
    showProjectDetailsPage 
};