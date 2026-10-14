import db from './db.js';

/**
 * Adds a user as a volunteer for a project.
 * @param {number} projectId - The ID of the project.
 * @param {number} userId - The ID of the user volunteering.
 */
const addVolunteer = async (projectId, userId) => {
  const query = `
    INSERT INTO project_volunteer (project_id, user_id)
    VALUES ($1, $2);
  `;

  await db.query(query, [projectId, userId]);
};

/**
 * Removes a user as a volunteer for a project.
 * @param {number} projectId - The ID of the project.
 * @param {number} userId - The ID of the user to remove.
 */
const removeVolunteer = async (projectId, userId) => {
  const query = `
    DELETE FROM project_volunteer
    WHERE project_id = $1 AND user_id = $2;
  `;

  await db.query(query, [projectId, userId]);
};

/**
 * Checks whether a user is currently volunteering for a specific project.
 * @param {number} projectId - The ID of the project.
 * @param {number} userId - The ID of the user.
 * @returns {boolean} True if the user is volunteering for the project.
 */
const isUserVolunteering = async (projectId, userId) => {
  const query = `
    SELECT 1
    FROM project_volunteer
    WHERE project_id = $1 AND user_id = $2;
  `;

  const result = await db.query(query, [projectId, userId]);
  return result.rows.length > 0;
};

/**
 * Retrieves all projects a given user has volunteered for.
 * @param {number} userId - The ID of the user.
 * @returns {Array} An array of project objects.
 */
const getVolunteeredProjectsByUserId = async (userId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.location,
      p.date
    FROM project p
    JOIN project_volunteer pv ON p.project_id = pv.project_id
    WHERE pv.user_id = $1
    ORDER BY p.date ASC;
  `;

  const result = await db.query(query, [userId]);
  return result.rows;
};

export { 
    addVolunteer, 
    removeVolunteer, 
    isUserVolunteering, 
    getVolunteeredProjectsByUserId };