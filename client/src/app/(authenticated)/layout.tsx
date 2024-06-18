import ProtectedComponent from "@/components/ProtectedComponent";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedComponent>{children}</ProtectedComponent>;
}
