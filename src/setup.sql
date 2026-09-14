
-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- ========================================
-- Service Project Table
-- ========================================

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
)

- ========================================
-- Insert sample data: Projects
-- ========================================
INSERT INTO project (organization_id, title, description, location, date)
VALUES
(1, 'Community Center Renovation', 'Renovate and improve a local community center for public activities.', 'Ikeja Community Center', '2026-10-05'),
(1, 'Neighborhood Road Repair', 'Repair damaged sections of a neighborhood road to improve transportation.', 'Ikeja, Lagos', '2026-10-12'),
(1, 'Public Park Improvement', 'Improve a public park by repairing facilities and creating a cleaner recreational space.', 'Ikeja Public Park', '2026-10-19'),
(1, 'Community Water Station', 'Install and improve access to a reliable community water station.', 'Ikeja Community', '2026-10-26'),
(1, 'School Building Maintenance', 'Complete maintenance work on classrooms and other school facilities.', 'Ikeja Community School', '2026-11-02'),
(2, 'Community Vegetable Garden', 'Establish a community vegetable garden to promote local food production.', 'Ikeja Community Garden', '2026-11-09'),
(2, 'Urban Farming Workshop', 'Teach community members practical techniques for growing food in urban areas.', 'Ikeja Community Center', '2026-11-16'),
(2, 'Tree Planting Initiative', 'Plant trees in selected community areas to promote a healthier environment.', 'Ikeja Green Park', '2026-11-23'),
(2, 'Sustainable Farming Training', 'Provide training on sustainable farming methods and responsible resource use.', 'Ikeja Agricultural Center', '2026-11-30'),
(2, 'School Garden Project', 'Create a school garden where students can learn about farming and food sustainability.', 'Ikeja Community School', '2026-12-07'),
(3, 'Community Food Drive', 'Organize a food collection and distribution program for families in need.', 'Ikeja Community Hall', '2026-12-14'),
(3, 'Neighborhood Cleanup', 'Organize volunteers to clean public spaces and improve the local environment.', 'Ikeja Central District', '2026-12-21'),
(3, 'Senior Support Program', 'Coordinate volunteers to provide assistance and companionship to senior community members.', 'Ikeja Senior Center', '2026-12-28'),
(3, 'Charity Donation Drive', 'Collect essential supplies and distribute them to local charitable organizations.', 'Ikeja Volunteer Center', '2027-01-04'),
(3, 'Youth Mentorship Day', 'Connect volunteers with young people for educational guidance and personal development.', 'Ikeja Community Center', '2027-01-11');
