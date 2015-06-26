
DROP TYPE IF EXISTS tStepInt CASCADE;

create type tStepInt as (d timestamp , v int,inter int);


create or replace function userRegistrationsBySteps(start timestamp,finish timestamp,nsteps numeric)
    returns setof tStepInt as $$
DECLARE
    r RECORD;
    nseconds int;
    vinterval interval;
    previous_date timestamp;
    total int;
    inter int;
BEGIN
    nseconds :=  extract(epoch from (finish - start));

    vinterval := (nseconds/(nsteps-1) || ' seconds')::interval;

    total := 0;

    FOR r in select * FROM generate_series(start,finish,vinterval) LOOP

        if r.generate_series = start then
            inter := (SELECT count(cartodb_id) FROM user_registrations WHERE date_registered<start)::int;
        else
            inter := (SELECT count(cartodb_id) FROM user_registrations WHERE date_registered>=previous_date AND date_registered<r.generate_series)::int;
        end if;

        total := total + inter;

        RETURN QUERY SELECT r.generate_series::timestamp,total;
        previous_date := r.generate_series;

    END LOOP;

END
$$
LANGUAGE plpgsql;

select * from userRegistrationsBySteps('2015-01-01'::timestamp,'2015-06-01'::timestamp,6);


DROP TYPE IF EXISTS tStepDecimal CASCADE;
create type tStepDecimal as (d timestamp , v numeric);
create or replace function transactionsBySteps(start timestamp,finish timestamp,nsteps numeric,family text,paytype text)
    returns setof tStepDecimal as $$
DECLARE
    r RECORD;
    nseconds int;
    vinterval interval;
    previous_date timestamp;
    total numeric;
    c numeric;


BEGIN
    nseconds :=  extract(epoch from (finish - start));

    vinterval := (nseconds/(nsteps-1) || ' seconds')::interval;


    FOR r in select * FROM generate_series(start,finish,vinterval) LOOP

        if r.generate_series = start then

            total := (SELECT SUM(importe_abonado) FROM transactions WHERE date_transaction<start and familia_pago LIKE family AND payment_type LIKE paytype)::numeric;
            if total is null then
                total := 0.0;
            end if;

        else

            c:= (SELECT SUM(importe_abonado) FROM transactions WHERE date_transaction>=previous_date AND date_transaction<r.generate_series AND  familia_pago LIKE family AND payment_type LIKE paytype)::numeric;

            if c is not null then
                total := total + c;
            end if;

        end if;
        RETURN QUERY SELECT r.generate_series::timestamp,total::numeric;
        previous_date := r.generate_series;

    END LOOP;

END
$$
LANGUAGE plpgsql;

select * from transactionsBySteps('2015-01-01'::timestamp,'2015-06-01'::timestamp,6,'%','%');
