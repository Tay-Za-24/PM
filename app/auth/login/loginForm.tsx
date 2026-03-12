"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import icoGoogle from "../../../public/images/icons/ico-google.svg";
import { z } from "zod";
import { useState } from "react";
import Modal from "../../components/modal";
import AnimatedText from "../../components/animText";
import Link from "next/link";
import { api } from "@/app/utils/api";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().min(3, "Email must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
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

  const onSubmit = async (data: FormData) => {
    try {
      setApiError(false);

      const responseData = await api("auth/login", {
        method: "POST",
        body: data,
      });

      const accessToken =
        responseData?.access_token ?? responseData?.data?.access_token;

      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
      }

      const workspaceCode =
        responseData?.user?.last_workspace_code ??
        responseData?.data?.user?.last_workspace_code;

      if (workspaceCode) {
        router.push(`/workspace/${workspaceCode}`);
        return;
      }

      router.push("/create/workspace");
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



  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header>
        <h1 className="authLogo">Logo</h1>
      </header>

      <section className="authSection">
        <div className="formWrap">
          <h2 className="authTitle fw-bold">
            <AnimatedText
              text="Login"
            />
          </h2>

          <form
            className="authForm"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {apiError && (
              <p className="api-error d-block">Server Error. Please Try again.</p>
            )}
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
              <label htmlFor="email">Email</label>
            </div>
            {errors.email && (
              <p className="error">{errors.email.message}</p>
            )}

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
                {isSubmitting ? "Loading..." : "Continue"}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="submitBtn"
                disabled={isSubmitting}
              >
                <div className="btnIco">
                  <img src={icoGoogle.src} alt="" />
                </div>
                <span className="btnText">
                  Continue with Google
                </span>
              </button>
            </div>
          </form>
          <p className="toRegister">
            New here?
            <Link href="/auth/register" className="linkTxt">
              Create an account.
            </Link>
          </p>
          <p className="toRegister">
            Oops..
            <Link href="/auth/forget-password" className="linkTxt">
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
