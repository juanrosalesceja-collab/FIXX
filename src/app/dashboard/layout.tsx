import Sidebar from "@/components/layout/sidebar";
import { query } from "@/lib/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  let userId = null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    userId = payload.userId;
  } catch (error) {
    console.error("Auth error in layout:", error);
    redirect("/login");
  }

  // --- Trial check for authenticated users ---
  try {
    const { rows } = await query(
      "SELECT status, trial_end_at FROM subscriptions WHERE user_id = $1 LIMIT 1",
      [userId]
    );

    const subscription = rows[0];

    if (subscription) {
      const isExpired =
        subscription.status === "expired" ||
        (subscription.status === "trialing" &&
          new Date(subscription.trial_end_at ?? 0) < new Date());

      if (isExpired) {
        // Update status to expired if it was still trialing
        if (subscription.status === "trialing") {
          await query(
            "UPDATE subscriptions SET status = 'expired' WHERE user_id = $1",
            [userId]
          );
        }

        redirect("/trial-expired");
      }
    }
  } catch (error) {
    console.error("Trial check error:", error);
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
