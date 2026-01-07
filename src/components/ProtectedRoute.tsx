import { useRouter } from 'next/router';
import { useSupabaseAuth } from "@/contexts/SupabaseAuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useSupabaseAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    const router = useRouter();
    router.replace('/auth');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
