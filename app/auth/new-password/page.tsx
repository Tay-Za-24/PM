"use client";

import styles from "../css/auth.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AnimatedText from "@/app/components/animText";

const loginSchema = z.object({
  email: z.string().min(3, "Email must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <>
      <header>
        <h1 className={styles.authLogo}>Logo</h1>
      </header>

      <section className={styles.authSection}>
        <div className={styles.formWrap}>
          <h2 className={`${styles.authTitle} fw-bold`}>
            <AnimatedText
              text="New Password"
            />
          </h2>

          <form
            className={styles.authForm}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* email */}
            <div className={styles.inputWrap}>
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
            {errors.email && (
              <p className={styles.error}>
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <div className={styles.inputWrap}>
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
              <p className={styles.error}>
                {errors.password.message}
              </p>
            )}

            {/* Button */}
            <div className={styles.btnWrap}>
              <button
                type="submit"
                className={styles.submitBtn}
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
