export default function ChangelogEditor({ changelog }) {

  return (
    <>
      <ul className="list-disc list-inside">
      {changelog.map((change, i) => {
        return (
          <li key={`change-${i}`}>{change.description} ({new Date(change.createdAt).toLocaleDateString()})</li>
        )
      })}
      </ul>
    </>
  );
}
