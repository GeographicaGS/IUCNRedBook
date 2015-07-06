
-- Author: Cayetano Benavent, 2015.
-- cayetano.benavent@geographica.gs

-- Function gs_removealltablesfromschema(name, name[])
-- Examples:
--      Example 1. Removing all tables from schema 'pruebas' except two tables, 'tablename01' and 'tablename02':
--          SELECT gs_removealltablesfromschema('pruebas', ARRAY['tablename01', 'tablename02']);
--      Example 2. Removing all tables from schema 'pruebas':
--          SELECT gs_removealltablesfromschema('pruebas', ARRAY['']);

-- DROP FUNCTION IF EXISTS gs_removealltablesfromschema(name, name[]);
CREATE FUNCTION gs_removealltablesfromschema(name, name[])
    RETURNS int AS
    $$
    DECLARE
        rec RECORD;
        totdrop int := 0;
    BEGIN

        FOR rec IN SELECT schemaname, tablename
            FROM pg_tables
            WHERE schemaname=$1
            AND tablename != ALL($2)

        LOOP
            EXECUTE 'DROP TABLE ' || rec.schemaname || '."' || rec.tablename || '";';
            totdrop := totdrop + 1;
        END LOOP;
        RETURN totdrop;
    END;
    $$
    LANGUAGE plpgsql;


-- Function gs_removeallviewsfromschema(name, name[])
-- Examples:
--      Example 1. Removing all views from schema 'pruebas' except two views, 'viewname01' and 'viewname02':
--          SELECT gs_removeallviewsfromschema('pruebas', ARRAY['viewname01', 'viewname02']);
--      Example 2. Removing all views from schema 'pruebas':
--          SELECT gs_removeallviewsfromschema('pruebas', ARRAY['']);

-- DROP FUNCTION IF EXISTS gs_removeallviewsfromschema(name, name[]);
CREATE FUNCTION gs_removeallviewsfromschema(name, name[])
    RETURNS int AS
    $$
    DECLARE
        rec RECORD;
        totdrop int := 0;
    BEGIN

        FOR rec IN SELECT schemaname, viewname
            FROM pg_views
            WHERE schemaname=$1
            AND viewname != ALL($2)

        LOOP
            EXECUTE 'DROP VIEW ' || rec.schemaname || '."' || rec.viewname || '";';
            totdrop := totdrop + 1;
        END LOOP;
        RETURN totdrop;
    END;
    $$
    LANGUAGE plpgsql;
