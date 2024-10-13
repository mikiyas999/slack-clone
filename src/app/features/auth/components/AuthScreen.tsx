"use client";

import React, { useState } from "react";
import { AuthFlow } from "../types";
import { SignInCard } from "./SignInCard";
import { SignUpCard } from "./SignUpCard";

const AuthScreen = () => {
  const [authFlow, setAuthFlow] = useState<AuthFlow>("signIn");

  return (
    <section className="h-full flex items-center justify-center bg-[#5C3B58]">
      <aside className="md:h-auto md:w-[420px]">
        {authFlow === "signIn" ? (
          <SignInCard setState={setAuthFlow} />
        ) : (
          <SignUpCard setState={setAuthFlow} />
        )}
      </aside>
    </section>
  );
};

export default AuthScreen;
