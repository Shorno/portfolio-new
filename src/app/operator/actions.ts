"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized access. Active session required.");
  }
  return session;
}

export async function createJobApplication(data: {
  company: string;
  role: string;
  url?: string;
  status: "applied" | "interviewing" | "offered" | "rejected" | "ghosted";
  notes?: string;
}) {
  await requireAuth();

  const [inserted] = await db
    .insert(jobApplications)
    .values({
      company: data.company.trim(),
      role: data.role.trim(),
      url: data.url?.trim() || null,
      status: data.status,
      notes: data.notes?.trim() || null,
    })
    .returning();

  revalidatePath("/operator");
  return inserted;
}

export async function updateJobApplicationStatus(
  id: string,
  status: "applied" | "interviewing" | "offered" | "rejected" | "ghosted"
) {
  await requireAuth();

  const [updated] = await db
    .update(jobApplications)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(jobApplications.id, id))
    .returning();

  revalidatePath("/operator");
  return updated;
}

export async function updateJobApplicationNotes(id: string, notes: string) {
  await requireAuth();

  const [updated] = await db
    .update(jobApplications)
    .set({
      notes: notes.trim() || null,
      updatedAt: new Date(),
    })
    .where(eq(jobApplications.id, id))
    .returning();

  revalidatePath("/operator");
  return updated;
}

export async function deleteJobApplication(id: string) {
  await requireAuth();

  const [deleted] = await db
    .delete(jobApplications)
    .where(eq(jobApplications.id, id))
    .returning();

  revalidatePath("/operator");
  return deleted;
}
