import { getTranslations } from '@/i18n/server-i18n';

export default async function ChangelogEditor({ changelog, createdAt, updatedAt }) {

  const t = await getTranslations('Listings');

  return (
    <div className="mt-4">
      <p className="nld-text-sm nld-text-grey-300" suppressHydrationWarning>{t('added')} {new Date(createdAt).toLocaleDateString()}, {t('updated')} {new Date(updatedAt).toLocaleDateString()} * </p>
      <ul className="list-disc list-inside mt-4 nld-text-md nld-text-grey-500">
      {changelog.map((change, i) => {
        return (
          <li key={`change-${i}`}>{change.description} <span className="nld-text-grey-300">({new Date(change.createdAt).toLocaleDateString()})</span></li>
        )
      })}
      </ul>
      <p className="nld-text-sm nld-text-grey-300 italic mt-4">{t('changelog-note')}</p>
    </div>
  );
}
