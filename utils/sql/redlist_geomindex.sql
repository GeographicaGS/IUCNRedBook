

-- Creating geom index for each layer

CREATE INDEX emberger_gist
    ON  layers.emberger USING GIST (geom);

CREATE INDEX ifn_rev_final_gist
    ON  layers.ifn_rev_final USING GIST (geom);

CREATE INDEX metro_gist
    ON  layers.metro USING GIST (geom);

CREATE INDEX mo_assessment_gist
    ON  layers."mo_assessment9808-250_flt" USING GIST (geom);

CREATE INDEX mo_monitoring_gist
    ON  layers."mo_monitoring9808-250_flt" USING GIST (geom);

CREATE INDEX mo_reg03_flt_gist
    ON  layers.mo_reg03_flt USING GIST (geom);

CREATE INDEX mo_reg06_flt_gist
    ON  layers.mo_reg06_flt USING GIST (geom);

CREATE INDEX mo_reg15_flt_gist
    ON  layers.mo_reg15_flt USING GIST (geom);

CREATE INDEX wdpa_june2015_mar_pts_gist
    ON  layers."wdpa_june2015_mar-shapefile-points" USING GIST (geom);

CREATE INDEX wdpa_june2015_mar_poly_gist
    ON  layers."wdpa_june2015_mar-shapefile-polygons" USING GIST (geom);
