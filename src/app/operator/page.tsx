import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Container } from "@/components/primitives/container";
import { Dashboard } from "@/components/operator/dashboard";

export const metadata = {
  title: "Operator Console",
  description: "Internal job application tracking system.",
};

export default async function OperatorPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/operator/login");
  }

  // Fetch applications from the database sorted by appliedAt desc
  const apps = await db.query.jobApplications.findMany({
    orderBy: desc(jobApplications.appliedAt),
  });

  return (
    <Container className="min-h-screen">
      <Dashboard initialApplications={apps} />
    </Container>
  );
}
