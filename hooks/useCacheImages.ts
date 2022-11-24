import { useEffect, useState } from 'react';

const cacheImage = (item : any) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve("");
    };
    img.onerror = () => {
      // console.log("Failed", err);
      reject();
    };
    const isMobile = window.innerWidth <= 500;
    img.src = `https://homingos-magik.s3.ap-south-1.amazonaws.com/flam-poc${
      isMobile ? "-mobile" : ""
    }/landing_${isMobile ? "mobile_" : ""}${item}.webp`;
  });

export const cacheImages = (start : any, end : any, cb : any) => {
  const items = Array(end - start + 1).fill(0);
  return Promise.all(
    items.map(async (_item, i) => {
      await cacheImage(i + start);
    })
  ).then(() => {
    cb();
  });
};

export const useCacheImages = (end : any) => {
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    cacheImages(1, end, () => setLoading(false));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWaiting(false);
      // document.querySelector("body").style.height = "2000vh";
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return [loading || waiting];
};
