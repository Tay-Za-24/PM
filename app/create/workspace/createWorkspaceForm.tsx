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
    return (
      <>
      <div className="createSection">
        <h2 className="createTitle fs-30 fw-bold">
          <AnimatedText
            text="How do you want to use PM?"
          />
        </h2>
        <section>
          <form>
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
              <label htmlFor="workSpaceName">Your WorkSpace Name ?</label>
            </div>
            {errors.workSpaceName && (
              <p className="error">{errors.workSpaceName.message}</p>
            )}
          </form>
        </section>
      </div>
      </>
    )
}