import { getTranslations } from '@/i18n/server-i18n';

import MapModal from '@/components/front-map/modal';

export default async function Disclaimer({ disclaimer }) {

  return (
    <MapModal
      headerText="Disclaimer"
      bodyText={disclaimer}
      footerText="Close"
    />
  );
}
