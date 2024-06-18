import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type ProtectedComponentProps = {
  children: React.ReactNode;
};

export default function ProtectedComponent({
  children,
}: Readonly<ProtectedComponentProps>) {
  const c = cookies();
  const auth = c.get('Authorization');
  if (!auth) {
    redirect('/login')
  }

  return children;
}
