
CREATE INDEX mo_assessment_multi_gist
    ON  layers_flt.mo_assessment_multi USING GIST (geom);
