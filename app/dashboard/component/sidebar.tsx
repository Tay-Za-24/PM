import styles from "../css/sidebar.module.css";
import icoBatman from "../../../public/images/batman.jpg";
import Image from "next/image";
import Link from "next/link";

type SidebarProps = {
  workspaceName: string;
  workspaceCode: string;
};

export default function Sidebar({ workspaceName, workspaceCode }: SidebarProps) {
  return (
    <div className={styles.sidebarWrap}>
      <h1 className={styles.workspaceTitle}>
        <Image src={icoBatman} alt="Workspace Icon" width={40} height={40} />
        {workspaceName}
      </h1>
      <Link href={`/workspace/${workspaceCode}`}>HOME</Link>
    </div>
  );
}
