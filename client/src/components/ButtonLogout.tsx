"use client";

import { logoutAction } from "@/actions/user.action";

export default function ButtonLogout() {
  return (
    <button
      onClick={() => logoutAction()}
      className="text-sm font-medium text-gray-700 hover:text-gray-800"
    >
      Sign Out
    </button>
  );
}
