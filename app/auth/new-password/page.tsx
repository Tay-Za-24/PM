import { Metadata } from "next";
import NewPasswordForm from "./newPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function RegisterPage() {
  return <NewPasswordForm />;
}
