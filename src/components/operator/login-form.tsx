"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Rule } from "@/components/primitives/rule";

export function LoginForm() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error: signUpError } = await authClient.signUp.email({
          email,
          password,
          name,
          callbackURL: "/operator",
        });
        if (signUpError) {
          setError(signUpError.message || "Failed to register.");
        } else {
          router.push("/operator");
          router.refresh();
        }
      } else {
        const { error: signInError } = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/operator",
        });
        if (signInError) {
          setError(signInError.message || "Invalid credentials.");
        } else {
          router.push("/operator");
          router.refresh();
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md border border-line bg-bg-elev p-6 md:p-8">
      <div className="mb-6">
        <span className="mono-label text-accent">SECURE GATEWAY</span>
        <h2 className="mt-2 font-display text-4xl text-fg">
          Console{" "}
          <span className="font-display-italic text-accent">
            {isSignUp ? "register" : "access"}
          </span>
        </h2>
      </div>

      <Rule variant="ticked" className="mb-6" />

      {error && (
        <div className="mb-6 border border-accent/30 bg-accent-soft px-4 py-3 text-xs text-accent font-mono">
          [ERROR] {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {isSignUp && (
          <div>
            <label className="mono-label block mb-1.5" htmlFor="name">
              Operator Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Shorno Kamal Roy"
              className="w-full border border-line bg-bg px-3 py-2 font-mono text-sm text-fg outline-none focus:border-accent transition-colors"
            />
          </div>
        )}

        <div>
          <label className="mono-label block mb-1.5" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="operator@email.com"
            className="w-full border border-line bg-bg px-3 py-2 font-mono text-sm text-fg outline-none focus:border-accent transition-colors"
          />
          {isSignUp && (
            <p className="mt-1 font-mono text-[10px] text-muted">
              * Verification: Must match configured administrator email
            </p>
          )}
        </div>

        <div>
          <label className="mono-label block mb-1.5" htmlFor="password">
            Access Key / Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-line bg-bg px-3 py-2 font-mono text-sm text-fg outline-none focus:border-accent transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-accent-fg hover:bg-accent/90 py-2.5 font-mono text-xs tracking-mono-wide uppercase transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? "INITIALIZING..." : isSignUp ? "EXECUTE SIGNUP" : "INITIALIZE CONSOLE"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError(null);
          }}
          className="font-mono text-xs text-muted hover:text-accent transition-colors cursor-pointer"
        >
          {isSignUp ? "[ Switch to Log In Mode ]" : "[ Request New Operator Account ]"}
        </button>
      </div>
    </div>
  );
}
