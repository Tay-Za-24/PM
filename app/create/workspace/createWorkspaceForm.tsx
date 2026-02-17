"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/app/utils/api";
import AnimatedText from "@/app/components/animText";

const FormSchema = z.object({
  workspace_name: z.string().min(3, "workspace_name must be at least 3 characters"),
});

type FormData = z.infer<typeof FormSchema>;

export default function CreateWorkspaceForm() {
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
    } = useForm<FormData>({
      resolver: zodResolver(FormSchema),
    });
    const onSubmit = async (data: FormData) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw await res.json();

        console.log("LOGIN SUCCESS");
      } catch (err) {
        console.log("LOGIN ERROR", err);
      }
    };
    return (
      <>
        <div className="createSection">
          <h2 className="createTitle fs-30 fw-bold">
            <AnimatedText text="How do you want to use PM?" />
          </h2>
          <section>
            <form
              className="authForm create"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="inputWrap">
                <input
                  placeholder=" "
                  id="workspace_name"
                  type="text"
                  autoComplete="workspace_name"
                  maxLength={30}
                  {...register("workspace_name")}
                  aria-invalid={!!errors.workspace_name}
                />
                <label htmlFor="workspace_name">Your WorkSpace Name</label>
              </div>
              {errors.workspace_name && (
                <p className="error">{errors.workspace_name.message}</p>
              )}
              <div className="submitBtn">
                <div className="ico-btn ico-private"></div>
                <div className="about-private">
                  <p className="btn-ttl">Private Workspace</p>
                  <p>
                    Private Workspace only allows users you invite and no other
                    user can view or join any of the internal projects.
                  </p>
                </div>
              </div>
              <div className="submitBtn">
                <div className="ico-btn ico-public"></div>
                <div className="about-private">
                  <p className="btn-ttl">Public Workspace</p>
                  <p>
                    Anyone can see what you're doing. but not everyone can edit nor do anything to what you're doing. 
                  </p>
                </div>
              </div>
            </form>
          </section>
        </div>
      </>
    );
}