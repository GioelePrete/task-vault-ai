-- Create projects table to store project information
CREATE TABLE IF NOT EXISTS projects
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,  -- Unique identifier for the project
    user        TEXT    NOT NULL,                   -- User associated with the project
    name        TEXT    NOT NULL,                   -- Project name
    description TEXT    NOT NULL,                   -- Project description
    status      TEXT    NOT NULL,                   -- Status of the project
    progress    INTEGER NOT NULL,                   -- Progress of the project
    owner       TEXT    NOT NULL,                   -- Owner of the project
    priority    TEXT    NOT NULL,                   -- Priority level of the project
    FOREIGN KEY (status) REFERENCES status (id),    -- Relationship with status table
    FOREIGN KEY (priority) REFERENCES priority (id) -- Relationship with priority table
);

-- Create boards table to store board information
CREATE TABLE IF NOT EXISTS boards
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,  -- Unique identifier for the board
    projectID   INTEGER NOT NULL,                   -- Project associated with the board
    name        TEXT    NOT NULL,                   -- Board name
    description TEXT    NOT NULL,                   -- Board description
    status      TEXT    NOT NULL,                   -- Status of the board
    progress    INTEGER NOT NULL,                   -- Progress of the board
    tasks       INTEGER NOT NULL DEFAULT 0,         -- Number of tasks in the board (default: 0)
    priority    TEXT    NOT NULL,                   -- Priority level of the board
    FOREIGN KEY (status) REFERENCES status (id),    -- Relationship with status table
    FOREIGN KEY (priority) REFERENCES priority (id) -- Relationship with priority table
);

-- Create tasks table to store task information
CREATE TABLE IF NOT EXISTS tasks
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,                                 -- Unique identifier for the task
    boardID     INTEGER NOT NULL,                                                  -- Board associated with the task
    title       TEXT    NOT NULL,                                                  -- Task title
    status      TEXT    NOT NULL CHECK (status IN ('todo', 'inProgress', 'done')), -- Task status
    columnOrder INTEGER NOT NULL,                                                  -- Order of the task within the board
    image       TEXT                                                               -- Task image (optional)
);

-- Create collaborators table to store collaborator information
CREATE TABLE IF NOT EXISTS collaborators
(
    id        INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for the collaborator
    projectID INTEGER NOT NULL,                  -- Project associated with the collaborator
    user      TEXT    NOT NULL,                  -- User associated with the collaborator
    email     TEXT    NOT NULL,                  -- Email of the collaborator
    role      TEXT    NOT NULL,                  -- Role of the collaborator
    UNIQUE (projectID, email)                    -- Ensure uniqueness of project and email combination
);

-- Create users table to store user information
CREATE TABLE IF NOT EXISTS users
(
    id       INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for the user
    fullname TEXT NOT NULL,                     -- Full name of the user
    email    TEXT NOT NULL,                     -- Email of the user
    password TEXT NOT NULL                      -- Password of the user
);

-- Create status table to store status values
CREATE TABLE IF NOT EXISTS status
(
    id   TEXT NOT NULL, -- Status identifier
    name TEXT NOT NULL  -- Status name
);

-- Create priority table to store priority values
CREATE TABLE IF NOT EXISTS priority
(
    id   TEXT NOT NULL, -- Priority identifier
    name TEXT NOT NULL  -- Priority name
);

-- Create a view named projectView to provide project information with additional details
CREATE VIEW IF NOT EXISTS projectView AS
SELECT projects.id,
       projects.user,
       projects.name,
       projects.description,
       status.id                         AS statusID,
       status.name                       AS status,
       projects.progress,
       projects.owner,
       priority.id                       AS priorityID,
       priority.name                     AS priority,
       GROUP_CONCAT(collaborators.email) AS collaboratorsList
FROM projects
         JOIN status ON projects.status = status.id
         JOIN priority ON projects.priority = priority.id
         LEFT JOIN collaborators ON projects.id = collaborators.projectID
GROUP BY projects.id;

-- Create a view named boardsView to provide board information with additional details
CREATE VIEW IF NOT EXISTS boardsView AS
SELECT boards.id,
       boards.projectID,
       boards.name,
       boards.description,
       status.id     AS statusID,
       status.name   AS status,
       boards.progress,
       boards.tasks,
       priority.id   AS priorityID,
       priority.name AS priority
FROM boards
         JOIN status ON boards.status = status.id
         JOIN priority ON boards.priority = priority.id;

-- Create a trigger to update board tasks count after task insertion
CREATE TRIGGER IF NOT EXISTS update_board_tasks_insert
    AFTER INSERT
    ON tasks
    FOR EACH ROW
BEGIN
    UPDATE boards
    SET tasks = (SELECT COUNT(*) FROM tasks WHERE tasks.boardID = NEW.boardID)
    WHERE boards.id = NEW.boardID;
END;

-- Create a trigger to update board tasks count after task deletion
CREATE TRIGGER IF NOT EXISTS update_board_tasks_delete
    AFTER DELETE
    ON tasks
    FOR EACH ROW
BEGIN
    UPDATE boards
    SET tasks = (SELECT COUNT(*) FROM tasks WHERE tasks.boardID = OLD.boardID)
    WHERE boards.id = OLD.boardID;
END;

-- Create a trigger to delete associated boards when a project is deleted
CREATE TRIGGER IF NOT EXISTS delete_associated_boards
    AFTER DELETE
    ON projects
    FOR EACH ROW
BEGIN
    DELETE FROM boards WHERE projectID = OLD.id;
END;

-- Create a trigger to delete associated collaborators when a project is deleted
CREATE TRIGGER IF NOT EXISTS delete_associated_collaborators
    AFTER DELETE
    ON projects
    FOR EACH ROW
BEGIN
    DELETE FROM collaborators WHERE projectID = OLD.id;
END;

-- Create a trigger to delete associated tasks when a board is deleted
CREATE TRIGGER IF NOT EXISTS delete_associated_tasks
    AFTER DELETE
    ON boards
    FOR EACH ROW
BEGIN
    DELETE FROM tasks WHERE boardID = OLD.id;
END;

-- Insert initial data for priority values
INSERT INTO priority (id, name)
VALUES ('allPriority', 'All Priority'),
       ('veryLow', 'Very Low'),
       ('low', 'Low'),
       ('medium', 'Medium'),
       ('high', 'High'),
       ('veryHigh', 'Very High');

-- Insert initial data for status values
INSERT INTO status (id, name)
VALUES ('allStatus', 'All Status'),
       ('notStarted', 'Not Started'),
       ('pending', 'Pending'),
       ('onHold', 'On Hold'),
       ('inProgress', 'In Progress'),
       ('completed', 'Completed');
