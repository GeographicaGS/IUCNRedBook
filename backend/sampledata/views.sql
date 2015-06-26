
update alasarr.user_registrations
set region=(
  select r.cod_region
  from alasarr.spain_regions r
  inner join alasarr.spain_provinces p ON p.region=r.cod_region
  where p.cod_prov=prov )


select 1 as 2,* from user_registrations;


select region from user

select (select r.cod_region
  from alasarr.spain_regions r
  inner join alasarr.spain_provinces p ON p.region=r.cod_region
  where p.cod_prov=prov ) as  que,* from alasarr.user_registrations


select * from pg_indexes where tablename='user_registrations';
CREATE INDEX ON user_registrations(region);
CREATE INDEX ON user_registrations(prov);
CREATE INDEX ON user_registrations(date_registered);
