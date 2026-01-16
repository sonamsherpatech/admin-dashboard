import AuthGuard from "@/components/auth/AuthGuard";

export default function Dashboard() {
  return (
    <AuthGuard>
      <h1>This is a dashboard</h1>;
    </AuthGuard>
  );
}
