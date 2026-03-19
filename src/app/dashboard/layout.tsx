import Sidebar from "@/components/layout/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // --- Trial check for authenticated users ---
  try {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("status, trial_ends_at")
      .eq("user_id", user.id)
      .single();

    if (subscription) {
      const isExpired =
        subscription.status === "expired" ||
        subscription.status === "suspended" ||
        (subscription.status === "trialing" &&
          new Date(subscription.trial_ends_at ?? 0) < new Date());

      if (isExpired) {
        // Update status to expired if it was still trialing
        if (subscription.status === "trialing") {
          await supabase
            .from("subscriptions")
            .update({
              status: "expired",
              updated_at: new Date().toISOString(),
              delete_after_at: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              ).toISOString(),
            })
            .eq("user_id", user.id);
        }

        redirect("/trial-expired");
      }
    }
  } catch (error) {
    // If DB tables don't exist yet or other error, allow access gracefully
    console.error("Trial check error:", error);
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
