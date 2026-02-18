"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/app/utils/api";
import AnimatedText from "@/app/components/animText";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  workspace_name: z
    .string()
    .min(3, "workspace_name must be at least 3 characters"),
});

type FormData = z.infer<typeof FormSchema>;

export default function CreateWorkspaceForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (
    data: FormData,
    event?: { nativeEvent?: SubmitEvent }
  ) => {
    try {
      setApiError(false);

      const submitter = event?.nativeEvent?.submitter as
        | HTMLButtonElement
        | undefined;
      const isPrivate = submitter?.value === "private";

      const responseData = await api("workspace/create", {
        method: "POST",
        body: {
          ...data,
          is_private: isPrivate,
        },
      });

      const workspaceCode =
        responseData?.workspace_code ??
        responseData?.data?.workspace_code ??
        responseData?.workspace?.workspace_code ??
        responseData?.data?.workspace?.workspace_code ??
        responseData?.workspace?.code ??
        responseData?.data?.workspace?.code;

      if (workspaceCode) {
        router.push(`/?workspace=${workspaceCode}`);
        return;
      }

      setApiError(true);
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: Record<string, string[]> } };
      if (apiErr?.data?.message) {
        Object.entries(apiErr.data.message).forEach(([field, messages]) => {
          setError(field as keyof FormData, {
            type: "server",
            message: (messages as string[])[0],
          });
        });
      } else {
        setApiError(true);
      }
    }
  };

  return (
    <>
      <div className="createSection">
        <h2 className="createTitle fs-30 fw-bold">
          <AnimatedText text="How do you want to use PM?" />
        </h2>
        {apiError && (
          <p className="api-error d-block">Server Error. Please Try again.</p>
        )}
        <section>
          <form className="authForm create" onSubmit={handleSubmit(onSubmit)} noValidate>
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
            <button
              type="submit"
              value="private"
              className="submitBtn"
              disabled={isSubmitting}
            >
              <div className="ico-btn ico-private"></div>
              <div className="about-private">
                <p className="btn-ttl">Private Workspace</p>
                <p>
                  Private Workspace only allows users you invite and no other
                  user can view or join any of the internal projects.
                </p>
              </div>
            </button>
            <button
              type="submit"
              value="public"
              className="submitBtn"
              disabled={isSubmitting}
            >
              <div className="ico-btn ico-public"></div>
              <div className="about-private">
                <p className="btn-ttl">Public Workspace</p>
                <p>
                  Anyone can see what you&apos;re doing. but not everyone can edit
                  nor do anything to what you&apos;re doing.
                </p>
              </div>
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
