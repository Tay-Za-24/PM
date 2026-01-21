"use client";

import styles from "../css/auth.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import icoGoogle from "../../../public/images/icons/ico-google.svg";
import { z } from "zod";
import { useState } from "react";
import Modal from "../../components/modal";
import AnimatedText from "../../components/animText";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().min(3, "Email must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
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

    console.log("LOGIN SUCCESS ✅");
  } catch (err) {
    console.log("LOGIN ERROR ❌", err);
  }
};


  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header>
        <h1 className={styles.authLogo}>Logo</h1>``
      </header>

      <section className={styles.authSection}>
        <div className={styles.formWrap}>
          <h2 className={`${styles.authTitle} fw-bold`}>
            <AnimatedText
              text="Login"
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
                autoComplete="current-password"
                maxLength={30}
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              <label htmlFor="password">Password</label>
            </div>
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}

            {/* Button */}
            <div className={styles.btnWrap}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Continue"}
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
                <span className={styles.btnText}>
                  Continue with Google
                </span>
              </button>
            </div>
          </form>
          <p className={styles.toRegister}>
            New here?
            <Link href="/auth/register" className={styles.linkTxt}>
              Create an account.
            </Link>
          </p>
          <p className={styles.toRegister}>
            Oops..
            <Link href="/auth/forget-password" className={styles.linkTxt}>
              Forgot your Password?
            </Link>
          </p>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AnimatedText
            text="Still Under Construction"
          />
        </Modal>
      </section>
    </>
  );
}
