import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./index.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

type ModalProps = {
    modalContent: any;
    setOpenModal?: any;
    modalPosition?: "center" | "right";
    modalContainerStyles?: any;
    zIndex?: number;
    showCloseModalBtn?: boolean;
};

function Modal({
    modalContent,
    setOpenModal,
    modalPosition,
    modalContainerStyles,
    zIndex,
    showCloseModalBtn
}: ModalProps) {

    const [isZoomedOut, setIsZoomedOut] = useState(false);

    useEffect(() => {
        const el: any = document.querySelector(".tenant-layout main");
        if (el?.style.zoom === "0.9") {
            setIsZoomedOut(true);
            el.style.zoom = 1;
        }
        return () => {
            if (isZoomedOut && el?.style) {
                el.style.zoom = 0.9;
            }
        };
    }, [isZoomedOut]);

    return (
        <AnimatePresence>
            <motion.div
                className={styles.modalWrapper}
                style={{
                    justifyContent: modalPosition === "center" ? "center" : "flex-end",
                    zIndex: zIndex || 99,
                }}
                onClick={() => {
                    setOpenModal(false);
                    const el: any = document.querySelector(".tenant-layout main");
                    if (isZoomedOut && el?.style) {
                        el.style.zoom = 0.9;
                    }
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className={styles.modalContainer}
                    onClick={(evt) => evt.stopPropagation()}
                    style={{ ...modalContainerStyles }}
                    initial={{ scale: 0.8, opacity: 0 }} // Start smaller and transparent
                    animate={{ scale: 1, opacity: 1 }} // Scale up to full size and fade in
                    exit={{ scale: 0.8, opacity: 0 }} // Scale down and fade out
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth easing
                >
                    {showCloseModalBtn && (
                        <div
                            className={styles.closeBtn}
                            onClick={() => {
                                setOpenModal(false);
                                const el: any = document.querySelector(".tenant-layout main");
                                if (isZoomedOut && el?.style) {
                                    el.style.zoom = 0.9;
                                }
                            }}
                        >
                            <IoIosCloseCircleOutline  />
                            {/* /<IoMdClose style={{ margin: '0.5rem', height: '1.5rem', width: '1.5rem' }} /> */}
                        </div>
                    )}
                    {modalContent}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default Modal;