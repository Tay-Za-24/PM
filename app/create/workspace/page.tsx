import { Metadata } from "next";
import CreateWorkspaceForm from "./createWorkspaceForm";

export const metadata: Metadata = {
  title: "Create Workspace",
};

export default function RegisterPage() {
  return <CreateWorkspaceForm />;
}
