DROP FUNCTION IF EXISTS gs_redlist_createviews(name, name);

CREATE OR REPLACE FUNCTION gs_redlist_createviews(name, name)
    RETURNS int AS
    $$
    DECLARE
        rec RECORD;
        totviews int := 0;
    BEGIN

        FOR rec IN EXECUTE 'SELECT '
                              || $2
                              || ' AS nm FROM ' || $1
                              || ' GROUP BY ' || $2
        LOOP
            EXECUTE 'CREATE VIEW '
                        || $1
                        || '_'
                        ||  rec.nm
                        || '_v AS SELECT * FROM '
                        || $1
                        || ' WHERE '
                        || $2 || '=' || rec.nm
                        || ';';
            totviews := totviews + 1;
	END LOOP;
	RETURN totviews;
    END;
    $$
    LANGUAGE plpgsql;

-- SELECT gs_redlist_createviews('pruebas.metro', 'vegdom_cod');
-- SELECT gs_redlist_createviews('pruebas.mo_reg03_flt', 'values');
-- SELECT gs_redlist_createviews('pruebas.mo_reg06_flt', 'values');
-- SELECT gs_redlist_createviews('pruebas.mo_reg15_flt', 'values');
