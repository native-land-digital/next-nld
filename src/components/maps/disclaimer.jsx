import { getTranslations } from '@/i18n/server-i18n';

import MapModal from '@/components/front-map/modal';

export default async function Disclaimer({ disclaimer }) {

  const t = await getTranslations('Maps');

  return (
    <MapModal
      headerText="Disclaimer"
      bodyText={disclaimer}
      footerText="Close"
    />
  );
}
