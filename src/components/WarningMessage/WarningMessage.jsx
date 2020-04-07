import React from "react";
import styles from "./WarningMessage.module.css";

const WarningMessage = () => {
  return (
    <div className={styles.alert}>
      <p>Contact already exists!</p>
    </div>
  );
};

export default WarningMessage;
