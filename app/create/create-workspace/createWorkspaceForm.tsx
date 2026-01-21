"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/app/utils/api";
import styles from "../css/dashboard.module.css"

const FormSchema = z.object({
  workSpaceName: z.string().min(3, "Workspace Name must be at least 3 characters"),
  projectName: z.string().min(8, "Project Name must be at least 8 characters"),
});

export default function CreateWorkspaceForm() {
    return (
      <>
        <section>
        </section>
      </>
    )
}