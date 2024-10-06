
export const getUniqueFeatures = (features, comparatorProperty) => {
  const uniqueIds = new Set();
  const uniqueFeatures = [];
  for (const feature of features) {
      const id = feature.properties[comparatorProperty];
      if (!uniqueIds.has(id)) {
          uniqueIds.add(id);
          uniqueFeatures.push(feature);
      }
  }
  return uniqueFeatures;
}

export const makeBoundsFromPoly = (polygon) => {
  return [
    polygon.bounds.coordinates[0][2][0],
    polygon.bounds.coordinates[0][0][1],
    polygon.bounds.coordinates[0][0][0],
    polygon.bounds.coordinates[0][2][1],
  ]
}

export const randomStartingPosition = () => {
  if (window.innerWidth < 500) {
    return {
      center: [-103.4216601, 49.2173029],
      zoom: 3,
    };
  } else {
    const possibleStarts = [
      [-100.1953125, 47.27922900257082],
      [140.625, -27.68352808378776],
      [-68.5546875, -19.973348786110602],
    ];
    return {
      center: possibleStarts[Math.floor(Math.random() * possibleStarts.length)],
      zoom: 3,
    };
  }
}

export const createSetFeatureCollection = (featureStateKey, map) => {
  const oldFeatureCollection = [];
  return (newFeatures) => {
    // Clear old features
    oldFeatureCollection.forEach((featureIdentfier) => {
      map.setFeatureState(featureIdentfier, {
        [featureStateKey]: false,
      });
    });
    oldFeatureCollection.length = 0;

    // Add new features
    newFeatures.forEach((feature) => {
      const featureIdentfier = {
        source: feature.source,
        sourceLayer: feature.sourceLayer,
        id: feature.id,
      };
      map.setFeatureState(featureIdentfier, {
        [featureStateKey]: true,
      });
      oldFeatureCollection.push(featureIdentfier);
    });
  };
};

export const exportMap = (map) => {
  if (!("devicePixelRatio" in window)) {
    const dpi = 300;
    Object.defineProperty(window, "devicePixelRatio", {
      get: function () {
        return dpi / 96;
      },
    });
  }

  // create a virtual 2d <canvas> element
  const screenshotCanvas = document.createElement("canvas");
  const screenshotWidth = map.getCanvas().width;
  const screenshotHeight = map.getCanvas().height;
  screenshotCanvas.width = screenshotWidth;
  screenshotCanvas.height = screenshotHeight;
  const screenshotContext = screenshotCanvas.getContext("2d");

  // create a virtual <img> to screenshot the current map.
  const currentMap = new Image();

  // images load asynchronously, so wait for img.src to load then execute
  currentMap.onload = function () {
    screenshotContext.fillStyle = "#333";
    screenshotContext.fillRect(0, 0, screenshotWidth, screenshotHeight);

    // "draw" the map <img> into the screenshot canvas
    screenshotContext.drawImage(currentMap, 0, 0);

    // settings for attributions text
    const attributions = "© Native Land Digital © Mapbox © OpenStreetMap";
    const fontHeight = 24;
    screenshotContext.font = `${fontHeight}px Helvetica Neue, Arial, Helvetica, sans-serif`;
    const attributionsMetrics = screenshotContext.measureText(attributions);
    const attributionsWidth = attributionsMetrics.width; // measure text width, in order to offset from the bottom right corner

    // transparent container backdrop for attributions
    screenshotContext.fillStyle = "rgba(255, 255, 255, 0.5)";
    const attributionsHorizontalPadding = 10; // right and left padding
    const attributionsVerticalPadding = 5; // top and bottom padding
    const attributionsContainerX =
      screenshotWidth - attributionsWidth - attributionsHorizontalPadding * 2;
    const attributionsContainerY =
      screenshotHeight -
      fontHeight -
      attributionsMetrics.actualBoundingBoxAscent +
      attributionsMetrics.actualBoundingBoxDescent -
      attributionsVerticalPadding * 2;

    screenshotContext.fillRect(
      attributionsContainerX, // X position of top left corner
      attributionsContainerY, // Y position of top left corner
      attributionsWidth + attributionsHorizontalPadding * 2, // width of rect
      attributionsMetrics.actualBoundingBoxAscent +
        attributionsMetrics.actualBoundingBoxDescent +
        attributionsVerticalPadding * 2 // length of rect
    );

    // write attributions text into its container
    screenshotContext.fillStyle = "black";
    screenshotContext.fillText(
      attributions,
      screenshotWidth - attributionsWidth - attributionsHorizontalPadding, // X position of text bounding box's top left corner
      screenshotHeight - fontHeight // Y position of text bounding box's top left corner
    );

    // downloading image
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = screenshotCanvas.toDataURL("image/png", 0.92);
    link.click();
  };

  currentMap.src = map.getCanvas().toDataURL("image/png");
}
