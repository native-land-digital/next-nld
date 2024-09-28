export default function AddButton({ addFunction }) {
  return (
    <div className="w-full">
      <button onClick={() => addFunction()} className="py-1 px-2.5 text-sm tracking-wide rounded-lg text-black bg-gray-100 hover:bg-gray-200 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
        </svg>
      </button>
    </div>
  )
}
