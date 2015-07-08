

-- LAYER: mo_assessment9808-250_flt
DROP TABLE IF EXISTS layers_flt.mo_assessment_multi;

CREATE TABLE layers_flt.mo_assessment_multi AS
    SELECT ST_Multi(ST_Union(geom)) as geom, values
        FROM layers."mo_assessment9808-250_flt"
	GROUP BY values;

CREATE INDEX mo_assessment_multi_gist
    ON  layers_flt.mo_assessment_multi USING GIST (geom);

ALTER TABLE layers_flt.mo_assessment_multi
    OWNER TO redlist_admin;
