import { Metadata } from "next";
import LoginForm from "./loginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function RegisterPage() {
  return <LoginForm />;
}
