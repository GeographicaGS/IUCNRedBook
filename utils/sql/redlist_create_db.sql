
-- Role: redlist_admin
-- DROP ROLE redlist_admin;
CREATE ROLE redlist_admin LOGIN
  NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;

-- Database: redlist
-- DROP DATABASE redlist;
CREATE DATABASE redlist
  WITH OWNER = redlist_admin
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'C'
       LC_CTYPE = 'C'
       CONNECTION LIMIT = -1;

-- Connect to Red List DB
\connect redlist

-- Create Schema to store map layers
CREATE SCHEMA layers;
ALTER SCHEMA layers OWNER TO redlist_admin;

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

-- Enable PostGIS
CREATE EXTENSION postgis;
-- Enable Topology
CREATE EXTENSION postgis_topology;
