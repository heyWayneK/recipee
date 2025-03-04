"use client";
import { useAuth } from "@clerk/nextjs";
import { supabase } from "@/utils/supabaseClient";

export default function MyComponent() {
  const { getToken } = useAuth();

  const fetchData = async () => {
    const token = await getToken({ template: "supabase" }); // Get the Supabase JWT

    // Pass the token in the headers for this specific request
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      //   .match({ id: requesting_user_id() }) // Optional: ensure it matches the authenticated user
      .setHeader("Authorization", `Bearer ${token}`);

    console.log(data, error);
  };

  return <button onClick={fetchData}>Fetch User Data</button>;
}
