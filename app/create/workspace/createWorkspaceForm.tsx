"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/app/utils/api";
import AnimatedText from "@/app/components/animText";

const FormSchema = z.object({
  workSpaceName: z.string().min(3, "workSpaceName must be at least 3 characters"),
});

type FormData = z.infer<typeof FormSchema>;

export default function CreateWorkspaceForm() {
    const {
      register,
      handleSubmit,
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
                  id="workSpaceName"
                  type="text"
                  autoComplete="workSpaceName"
                  maxLength={30}
                  {...register("workSpaceName")}
                  aria-invalid={!!errors.workSpaceName}
                />
                <label htmlFor="workSpaceName">Your WorkSpace Name</label>
              </div>
              {errors.workSpaceName && (
                <p className="error">{errors.workSpaceName.message}</p>
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