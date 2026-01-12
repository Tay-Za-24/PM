import { Metadata } from "next";
import ForgetPasswordForm from "./forgetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function RegisterPage() {
  return <ForgetPasswordForm />;
}
