"use client";
import { getDataFromLocalStorage } from "@/utils/localStorageAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function DashboardPage() {
  const { replace } = useRouter();
  const checkCredentials = async () => {
    const localStorageAuth = await getDataFromLocalStorage();
    if (!localStorageAuth) {
      replace("/login");
    }
  };

  useEffect(() => {
    checkCredentials();
  }, []);

  return <div>DashboardPage</div>;
}
