"use client"
import dynamic from 'next/dynamic';
import Image from "next/image";
import styles from "./page.module.css";

const MapContainer = dynamic(() => import('@/components/map/map-container'), {
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MapContainer />
      </main>
      <footer>
      </footer>
    </div>
  );
}
