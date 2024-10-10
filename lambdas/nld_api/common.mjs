export const assembleFeatures = (dbRows) => {
  const featureList = []
  dbRows.forEach(row => {
    const geometry = JSON.parse(row.geojson)
    if(geometry) {
      const feature = {
        type : "Feature",
        properties : {
          "Name" : row.name,
          "ID" : row.id,
          "Slug" : row.slug,
          "description" : `https://native-land.ca/maps/${row.category}/${row.slug}`,
          "color" : row.color,
        },
        geometry : {
          type : geometry.coordinates[0].length === 1 ? "Polygon" : "MultiPolygon",
          coordinates : geometry.coordinates[0].length === 1 ? geometry.coordinates[0] : geometry.coordinates
        }
      }
      featureList.push(feature)
    }
  })
  return featureList;
}
