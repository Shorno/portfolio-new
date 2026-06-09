import { Container } from "@/components/primitives/container";
import { LoginForm } from "@/components/operator/login-form";

export const metadata = {
  title: "Console Access",
  description: "Secure gateway login for Shorno's operator manual.",
};

export default function LoginPage() {
  return (
    <Container className="flex min-h-[calc(100vh-var(--site-header-h)-120px)] items-center justify-center py-12">
      <LoginForm />
    </Container>
  );
}
