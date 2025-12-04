import styles from '../css/sidebar.module.css';
import icoBatman from '../../public/images/batman.jpg';
import Image from 'next/image';

export default function Sidebar () {
    return (
        <div className={styles.sidebarWrap}>
            <h1 className={styles.workspaceTitle}>
                  <Image 
                    src={icoBatman}
                    alt="Batman Icon"
                    width={40}
                    height={40}
                />
                Sample Workspace
            </h1>
        </div>
    )
}