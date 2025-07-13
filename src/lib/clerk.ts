import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getAuth() {
  const { userId } = await auth();
  return { userId };
}

export async function getCurrentUser() {
  const user = await currentUser();
  return user;
}

export async function requireAuth() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  return { userId };
}

export async function requireUser() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }
  
  return user;
}

export async function isAuthenticated() {
  const { userId } = await auth();
  return !!userId;
} 