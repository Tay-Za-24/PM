"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/app/dashboard/component/sidebar";
import { api } from "@/app/utils/api";

export default function WorkspacePage() {
  const params = useParams<{ workspaceCode: string }>();
  const workspaceCode = params.workspaceCode;
  const [workspaceName, setWorkspaceName] = useState("Workspace");

  useEffect(() => {
    if (!workspaceCode) {
      return;
    }

    const token = localStorage.getItem("access_token") ?? "";

    api(`workspace/${workspaceCode}`, {
      method: "GET",
      token,
    })
      .then((responseData) => {
        const name =
          responseData?.data?.workspace_name ??
          responseData?.workspace_name ??
          responseData?.data?.name ??
          `Workspace ${workspaceCode}`;

        setWorkspaceName(name);
      })
      .catch(() => {
        setWorkspaceName(`Workspace ${workspaceCode}`);
      });
  }, [workspaceCode]);

  return (
    <div className="dashboard-wrap">
      <Sidebar workspaceName={workspaceName} workspaceCode={workspaceCode} />
      <main style={{ padding: "1.5rem" }}>
        <h2 className="fs-30 fw-bold">{workspaceName}</h2>
        <p>Workspace code: {workspaceCode}</p>
      </main>
    </div>
  );
}
