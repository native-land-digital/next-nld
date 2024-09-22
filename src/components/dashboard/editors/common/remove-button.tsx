export default function RemoveButton({ removeFunction }) {
  return (
    <button onClick={() => removeFunction()} className="py-1 px-2.5 text-sm tracking-wide rounded-lg text-black bg-gray-100 hover:bg-gray-200 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
      </svg>
    </button>
  )
}
