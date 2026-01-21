import { Metadata } from "next";
import CreateWorkspaceForm from "./createWorkspaceForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function RegisterPage() {
  return <CreateWorkspaceForm />;
}
