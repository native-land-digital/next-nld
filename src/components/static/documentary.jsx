export default function Documentary() {
  return (
    <div className="mt-4">
      <div className="w-full lg:w-4/5 m-auto relative rounded-lg overflow-hidden shadow-lg" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/yQ5HxDoftdg"
          title="AYLLU: Memorias y Visiones - Teaser Oficial (subtitled)"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <p className="text-center text-xs text-gray-500 mt-2">Official teaser for AYLLU: Memorias y Visiones</p>
    </div>
  );
}
