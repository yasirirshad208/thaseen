import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to /home
  redirect("/home");

  return null; // The page content won't be rendered
}
