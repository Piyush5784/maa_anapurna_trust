import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const isAdmin = (role: string): boolean => {
  return role === Role.ADMIN;
};

export const isUser = (role: string): boolean => {
  return role === Role.USER;
};

export const hasRole = (userRole: string, requiredRole: Role): boolean => {
  if (requiredRole === Role.USER) {
    return userRole === Role.USER || userRole === Role.ADMIN;
  }
  return userRole === requiredRole;
};

export const requireAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Authentication required");
  }
  return session;
};

export const requireAdmin = async () => {
  const session = await requireAuth();
  if (!isAdmin(session.user.role)) {
    throw new Error("Admin access required");
  }
  return session;
};

// Hook for client-side role checking
export const useRole = () => {
  // This would be used with useSession() from next-auth/react
  // Example usage in a component:
  // const { data: session } = useSession();
  // const { isAdmin, isUser } = useRole();
  // const userIsAdmin = session ? isAdmin(session.user.role) : false;

  return {
    isAdmin,
    isUser,
    hasRole,
  };
};
//     hasRole,
//   };
// };
