"use client";

import styles from "../css/auth.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../components/modal";
import icoGoogle from "../../../public/images/icons/ico-google.svg";
import AnimatedText from "../../components/animText";
import { useState } from "react";
import Link from "next/link";
import { api } from "@/app/utils/api";
import { useRouter } from "next/navigation";

const loginSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name is too long"),

    email: z.email("Invalid email address"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirm_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

type LoginFormData = z.infer<typeof loginSchema>;

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
        const result = await api("auth/register", {
          method: "POST",
          body: data,
        });

        router.push("/auth/login")
      } catch (err: any) {
        console.error("ERROR:", err);
      }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header>
        <h1 className={styles.authLogo}>Logo</h1>
      </header>

      <section className={styles.authSection}>
        <div className={styles.formWrap}>
          <h2 className={`${styles.authTitle} fw-bold`}>
            <AnimatedText
            texts={[
              'Create Account'
            ]}
            />
          </h2>

          <form
            className={styles.authForm}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Name */}
            <div className={styles.inputWrap}>
              <input
                placeholder=" "
                id="name"
                type="text"
                maxLength={30}
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              <label htmlFor="name">Name</label>
            </div>
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
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
                autoComplete="off"
                // autoComplete="new-password"
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
                id="confirm_password"
                type="password"
                autoComplete="off"
                maxLength={30}
                {...register("confirm_password")}
                aria-invalid={!!errors.confirm_password}
              />
              <label htmlFor="confirm_password">Confirm Password</label>
            </div>
            {errors.confirm_password && (
              <p className={styles.error}>{errors.confirm_password.message}</p>
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
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                <div className={styles.btnIco}>
                  <img src={icoGoogle.src} />
                </div>
                <span className={styles.btnText}>Continue with Google</span>
              </button>
            </div>
          </form>
          <p className={styles.toRegister}>
            Already has one?
            <Link href="/auth/login" className={styles.linkTxt}>
              Login Here.
            </Link>
          </p>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AnimatedText
            texts={["Still Under Construction."]}
          />
        </Modal>
      </section>
    </>
  );
}
