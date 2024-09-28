export default function ChangelogEditor({ changelog, createdAt, updatedAt }) {

  return (
    <>
      <p className="text-xs mt-1" suppressHydrationWarning>Added {new Date(createdAt).toLocaleDateString()}, last updated {new Date(updatedAt).toLocaleDateString()} * </p>
      <ul className="list-disc list-inside mt-2.5">
      {changelog.map((change, i) => {
        return (
          <li key={`change-${i}`}>{change.description} ({new Date(change.createdAt).toLocaleDateString()})</li>
        )
      })}
      </ul>
      <p className="text-xs mt-2.5">* older dates may be inaccurate due to tech changes along the way</p>
    </>
  );
}
