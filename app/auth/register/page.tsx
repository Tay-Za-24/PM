"use client";

import styles from "../css/auth.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z
  .object({
    displayName: z
      .string()
      .min(2, "Display name must be at least 2 characters")
      .max(30, "Display name is too long"),

    email: z.email("Invalid email address"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
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
    // server action
  };

  return (
    <>
      <header>
        <h1 className={styles.authLogo}>Logo</h1>
      </header>

      <section className={styles.authSection}>
        <div className={styles.formWrap}>
          <h2 className={`${styles.authTitle} fw-bold`}>Create Account</h2>

          <form
            className={styles.authForm}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Display Name */}
            <div className={styles.inputWrap}>
              <input
                placeholder=" "
                id="displayName"
                type="text"
                maxLength={30}
                {...register("displayName")}
                aria-invalid={!!errors.displayName}
              />
              <label htmlFor="displayName">Display Name</label>
            </div>
            {errors.displayName && (
              <p className={styles.error}>{errors.displayName.message}</p>
            )}

            {/* Email */}
            <div className={styles.inputWrap}>
              <input
               placeholder=" "
                id="email"
                type="email"
                autoComplete="email"
                maxLength={50}
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              <label htmlFor="email">Email</label>
            </div>
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}

            {/* Password */}
            <div className={styles.inputWrap}>
              <input
                placeholder=" "
                id="password"
                type="password"
                autoComplete="new-password"
                maxLength={30}
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              <label htmlFor="password">Password</label>
            </div>
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}

            {/* Confirm Password */}
            <div className={styles.inputWrap}>
              <input
                placeholder=" "
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                maxLength={30}
                {...register("confirmPassword")}
                aria-invalid={!!errors.confirmPassword}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            {errors.confirmPassword && (
              <p className={styles.error}>
                {errors.confirmPassword.message}
              </p>
            )}

            {/* Button */}
            <div className={styles.btnWrap}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
