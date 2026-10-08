import db from "./db.js";

const getAllProjects = async () => {
    const query = `SELECT project_id, organization.name AS organization_name, title, project.description, project.organization_id, location, date
                   FROM public.project
                   JOIN public.organization
                   ON project.organization_id = organization.organization_id`;

    const result = await db.query(query);
    return result.rows;
};



const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};


const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
        p.project_id,
        p.organization_id,
        p.title,
        p.description,
        p.location,
        p.date,
        o.name AS organization_name
        FROM project p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1;
        `;
    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);
    return result.rows;

};

const getProjectDetails = async (projectId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            o.organization_id,
            o.name AS organization_name
            FROM project p
            JOIN organization o ON p.organization_id = o.organization_id
            WHERE p.project_id = $1;
            `;
    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};


const getCategoriesByProjectId = async (projectId) => {
  const query = `SELECT 
                    c.category_id,
                    c.name
                    FROM category c
                    JOIN project_category pc ON c.category_id = pc.category_id
                    WHERE pc.project_id = $1`;
  const queryParams = [projectId];
  const result = await db.query(query, queryParams);
  return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO project (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (projectId, organizationId, title, description, location, date) => {
  const query = `
    UPDATE project
    SET organization_id = $1, title = $2, description = $3, location = $4, date = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const queryParams = [organizationId, title, description, location, date, projectId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Project not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated project with ID:', projectId);
  }

  return result.rows[0].project_id;
};



export { 
    getAllProjects, 
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    getCategoriesByProjectId,
    updateProject
};
