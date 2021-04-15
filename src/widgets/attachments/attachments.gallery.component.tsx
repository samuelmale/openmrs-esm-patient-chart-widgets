import React, { useState } from "react";
import styles from "./attachment-gallery.css";

export const Gallery: React.FC<{ items: any[] }> = ({ items }) => {
  const galleryItems = items?.map(item => (
    <div>
      <img src={item.src} onClick={event => showOverlay(true)} />
    </div>
  ));
  return (
    <>
      <div
        id="overlay"
        className={styles.overlay}
        onClick={event => showOverlay(false)}
      >
        <img src={items[0].src} />
      </div>
      <div id="container" className={styles.container}>
        {galleryItems}
      </div>
    </>
  );
};

const showOverlay = (show: boolean) => {
  if (show) {
    document.getElementById("overlay").style.display = "block";
  } else {
    document.getElementById("overlay").style.display = "none";
  }
};
