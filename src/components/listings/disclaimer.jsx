'use client';
import { useState } from 'react';
import MapModal from '@/components/maps/modal';

export default function Disclaimer({ disclaimer }) {

  const [ modalOpen, setModalOpen ] = useState(true);

  return (
    <MapModal
      headerText="Disclaimer"
      bodyText={disclaimer}
      modalOpen={modalOpen}
      setModalOpen={(state) => setModalOpen(state)}
      footerText="Close"
    />
  );
}
