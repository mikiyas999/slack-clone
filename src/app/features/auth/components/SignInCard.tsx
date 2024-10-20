import React, { useState } from "react";
import { AuthFlow } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignInCardProps {
  setState: (state: AuthFlow) => void;
}
export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInByOAuth = (provider: "github" | "google") => {
    setPending(true);
    signIn(provider).finally(() => setPending(false));
  };

  const signInByEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    signIn("password", {
      email: account.email,
      password: account.password,
      flow: "signIn",
    })
      .catch(() => {
        setError("Invalid credentials");
      })
      .finally(() => setPending(false));
  };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another provider to login
        </CardDescription>
      </CardHeader>
      {!!error && (
        <span className="bg-destructive/30 p-3 rounded-md flex items-center text-white gap-x-2 text-sm mb-2">
          <TriangleAlert className="size-4" />
          {error}
        </span>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <aside className="flex flex-col gap-y-2.5">
          <Button
            size="sm"
            disabled={pending}
            variant="outline"
            onClick={() => signInByOAuth("google")}
            className="w-full flex items-center justify-center gap-x-2"
          >
            <FcGoogle className="size-5" />
            Continue with Google
          </Button>
          <Button
            size="sm"
            disabled={pending}
            variant="outline"
            onClick={() => signInByOAuth("github")}
            className="w-full flex items-center justify-center gap-x-2"
          >
            <FaGithub className="size-5" />
            Continue with GitHub
          </Button>
        </aside>

        <Separator className="my-2" />

        <form className="space-y-4" onSubmit={signInByEmail}>
          <fieldset>
            <label
              htmlFor="email"
              className="text-sm font-medium text-neutral-700"
            >
              Email
            </label>
            <Input
              required
              id="email"
              name="email"
              type="email"
              disabled={pending}
              value={account.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
            />
          </fieldset>
          <fieldset>
            <label
              htmlFor="password"
              className="text-sm font-medium text-neutral-700"
            >
              Password
            </label>
            <Input
              required
              id="password"
              type="password"
              name="password"
              disabled={pending}
              value={account.password}
              placeholder="Enter your password"
              onChange={(e) =>
                setAccount({ ...account, password: e.target.value })
              }
            />
          </fieldset>
          <Button size="sm" type="submit" disabled={pending} className="w-full">
            Continue with email
          </Button>
        </form>
        <p className="text-xs text-center text-neutral-500">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
