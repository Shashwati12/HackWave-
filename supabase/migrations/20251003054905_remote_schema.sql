alter table "public"."events" alter column "id" set default extensions.uuid_generate_v4();

alter table "public"."teams" alter column "id" set default extensions.uuid_generate_v4();

alter table "public"."users" drop column "passing_out_year";

alter table "public"."users" alter column "id" set default extensions.uuid_generate_v4();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$
;



