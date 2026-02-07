"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AnimatedText from "@/app/components/animText";

const FormSchema = z.object({
  email: z.string().min(3, "Email must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof FormSchema>;

export default function NewPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
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

          <form
            className="authForm"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* email */}
            <div className="inputWrap">
              <input
                placeholder=" "
                id="email"
                type="text"
                autoComplete="email"
                maxLength={30}
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              <label htmlFor="new-password">New Password</label>
            </div>
            {errors.email && <p className="error">{errors.email.message}</p>}

            {/* Password */}
            <div className="inputWrap">
              <input
                placeholder=" "
                id="password"
                type="password"
                autoComplete="current-password"
                maxLength={30}
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              <label htmlFor="password">Password</label>
            </div>
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            {/* Button */}
            <div className="btnWrap">
              <button
                type="submit"
                className="submitBtn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
