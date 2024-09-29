import { getTranslations } from 'next-intl/server';

export default async function ChangelogEditor({ changelog, createdAt, updatedAt }) {

  const t = await getTranslations('Maps');

  return (
    <>
      <p className="text-xs mt-1" suppressHydrationWarning>{t('added')} {new Date(createdAt).toLocaleDateString()}, {t('updated')} {new Date(updatedAt).toLocaleDateString()} * </p>
      <ul className="list-disc list-inside mt-2.5">
      {changelog.map((change, i) => {
        return (
          <li key={`change-${i}`}>{change.description} ({new Date(change.createdAt).toLocaleDateString()})</li>
        )
      })}
      </ul>
      <p className="text-xs mt-2.5">{t('changelog-note')}</p>
    </>
  );
}
