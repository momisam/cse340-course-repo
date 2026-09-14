import db from "./db.js";

const getAllProjects = async () => {
    const query = `SELECT project_id, organization.name AS organization_name, title, project.description, project.organization_id, location, date
                   FROM public.project
                   JOIN public.organization
                   ON project.organization_id = organization.organization_id`;

    const result = await db.query(query);
    return result.rows;
};



export { getAllProjects };
