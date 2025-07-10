"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./index.module.css";
import { format } from "date-fns";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Notification({
  setNotificationModal,
  filteredNotifications,
}: {
  setNotificationModal: (value: boolean) => void;
  filteredNotifications: any[];
}) {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <div className={styles.heading}>
          <p>Notifications ({filteredNotifications.length})</p>
        </div>
        <IoIosCloseCircleOutline
          onClick={() => setNotificationModal(false)}
          className={styles.icon_close}
        />
      </div>

      {filteredNotifications.map((notification: any, index: number) => {
        const formattedDate = format(
          new Date(notification?.notification_data?.created_at),
          "yyyy-MM-dd HH:mm"
        );

        return (
          <div
            key={index}
            className={styles.notificationCard}
            onClick={() => {
              router.push(`/compliance/controls`);
              setNotificationModal(false);
            }}
          >
            <div className={styles.leftSection}>
              {notification?.notification_data?.logo ? (
                <Image
                  src={notification.notification_data.logo}
                  width={30}
                  height={30}
                  alt="Vendor Logo"
                  className={styles.logo}
                />
              ) : (
                <div
                  className={styles.logo}
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#eee",
                    borderRadius: "50%",
                  }}
                />
              )}
              <div className={styles.textContent}>
                <strong className={styles.vendorName}>
                  {notification?.notification_data?.vendor}
                </strong>
                <p className={styles.complianceStatus}>
                  {notification?.notification_data?.compliance_status}
                </p>
              </div>
            </div>
            <div className={styles.rightSection}>
              <p className={styles.date}>{formattedDate}</p>
              <button
                className={styles.closeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  // No actual remove logic here, just UI effect
                  console.log("Remove notification ID:", notification?.id);
                }}
              >
                ✖
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
