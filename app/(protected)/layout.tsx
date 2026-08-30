import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return <>{children}</>;
};

export default ProtectedLayout;
