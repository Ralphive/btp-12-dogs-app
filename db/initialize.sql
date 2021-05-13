-- 12 Factor APp
-- XII. Admin processes
-- Run admin/management tasks as one-off processes. Creating tables, DB migrations and others.. 
CREATE TABLE IF NOT EXISTS dog_collection 
    (url varchar(256) NOT NULL primary key, 
    breed varchar(256) NOT NULL,
    subbreed varchar(256) NOT NULL);