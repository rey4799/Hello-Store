"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const logoutAction = () => {
  const cookiesStore = cookies();

  cookiesStore.delete("Authorization");
  redirect("/login");
};
