"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AnimatedText from "@/app/components/animText";

const formSchema = z.object({
  email: z.string().min(3, "Email must be at least 3 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
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
            <AnimatedText
              text="Forget Password"
            />
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
              <label htmlFor="email">Email</label>
            </div>
            {errors.email && (
              <p className="error">
                {errors.email.message}
              </p>
            )}

            {/* Button */}
            <div className="btnWrap">
              <button
                type="submit"
                className="submitBtn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
          <p className="toRegister">
            Enter your email and we&apos;ll send you a link !
          </p>
        </div>
      </section>
    </>
  );
}
