"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AnimatedText from "@/app/components/animText";
import { api } from "@/app/utils/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const FormSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof FormSchema>;

export default function NewPasswordForm() {
  const [apiError, setApiError] = useState(false);
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });


  useEffect(() => {
    const tokenFromQuery = searchParams.get("token");
    if (tokenFromQuery) {
      setValue("token", tokenFromQuery);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      setApiError(false);

      await api("auth/reset-password", {
        method: "POST",
        body: data,
      });
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
      <header>
        <h1 className="authLogo">Logo</h1>
      </header>

      <section className="authSection">
        <div className="formWrap">
          <h2 className="authTitle fw-bold">
            <AnimatedText text="New Password" />
          </h2>

          <form className="authForm" onSubmit={handleSubmit(onSubmit)} noValidate>
            {apiError && (
              <p className="api-error d-block">Server Error. Please Try again.</p>
            )}
            <div className="inputWrap">
              <input
                placeholder=" "
                id="token"
                type="text"
                autoComplete="off"
                maxLength={300}
                {...register("token")}
                aria-invalid={!!errors.token}
              />
              <label htmlFor="token">Reset Token</label>
            </div>
            {errors.token && <p className="error">{errors.token.message}</p>}

            <div className="inputWrap">
              <input
                placeholder=" "
                id="password"
                type="password"
                autoComplete="new-password"
                maxLength={30}
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              <label htmlFor="password">New Password</label>
            </div>
            {errors.password && <p className="error">{errors.password.message}</p>}

            <div className="btnWrap">
              <button type="submit" className="submitBtn" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
