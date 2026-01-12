import { Metadata } from "next";
import RegisterForm from "./registerForm";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
