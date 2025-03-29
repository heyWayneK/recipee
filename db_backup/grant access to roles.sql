
INFORMATION: UNSURE QF THIS ONE:
-- REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;


GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


THE IMPORTANT ONES
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."webhook_queue" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."webhook_queue" TO "service_role";