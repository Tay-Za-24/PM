import { redirect } from "next/navigation";

type LegacyWorkspaceRedirectProps = {
  params: Promise<{ workspaceCode: string }>;
};

export default async function LegacyWorkspaceRedirect({
  params,
}: LegacyWorkspaceRedirectProps) {
  const { workspaceCode } = await params;
  redirect(`/workspace/${workspaceCode}`);
}
