var mapDiv, map;

describe('LayerGroup options', function () {
  it('should include `makeBoundsAware` as default false', function () {
    var layerGroup = L.layerGroup();
    expect(layerGroup.options.makeBoundsAware).toBe(false);
  });
  it('should include `makeBoundsAware` as true if passed as arg', function () {
    var layerGroup = L.layerGroup([], { makeBoundsAware: true });
    expect(layerGroup.options.makeBoundsAware).toBe(true);
  });
});

describe('FeatureGroup options', function () {
  it('should include `makeBoundsAware` as default false', function () {
    var featureGroup = L.featureGroup();
    expect(featureGroup.options.makeBoundsAware).toBe(false);
  });
  it('should include `makeBoundsAware` as true if passed as arg', function () {
    var featureGroup = L.featureGroup([], { makeBoundsAware: true });
    expect(featureGroup.options.makeBoundsAware).toBe(true);
  });
  it('should include `minZoom` if passed as arg', function () {
    var featureGroup = L.featureGroup([], { minZoom: 5 });
    expect(featureGroup.options.minZoom).toBe(5);
  });
  it('should include `maxZoom` if passed as arg', function () {
    var featureGroup = L.featureGroup([], { maxZoom: 5 });
    expect(featureGroup.options.maxZoom).toBe(5);
  });
});

describe('LayerGroup.initialize', function () {
  it('should still behave as the base L.LayerGroup implementation and add any passed layers', function () {
    var marker = L.marker([50.5, 30.5]);
    var layerGroup = L.layerGroup([marker]);
    expect(layerGroup.hasLayer(marker)).toBe(true);
  });
});

describe('LayerGroup.addLayer', function () {
  beforeEach(function () {
    mapDiv = document.createElement('div');
    mapDiv.setAttribute('style', 'height: 500px; width: 500px;');
    document.body.appendChild(mapDiv);
    map = L.map(mapDiv).fitBounds([
      [40, -30],
      [41, -29]
    ]);
  });
  afterEach(function () {
    mapDiv.parentNode.removeChild(mapDiv);
  });
  it('should also add layer to the map if within the map bounds and options.makeBoundsAware === false', function () {
    var layerGroup = L.layerGroup().addTo(map);
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(true);
  });
  it('should also add layer to the map if outside the map bounds and options.makeBoundsAware === false', function () {
    var layerGroup = L.layerGroup().addTo(map);
    var marker = L.marker([70, -50]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(true);
  });
  it('should also add layer to the map if within the map bounds and options.makeBoundsAware === true', function () {
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true
    }).addTo(map);
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(true);
  });
  it('should not add layer to the map if outside the map bounds and options.makeBoundsAware === true', function () {
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true
    }).addTo(map);
    var marker = L.marker([70, -50]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(false);
  });
  // minZoom, maxZoom
  it('should add layer to the map if minZoom is defined and map zoom is greater. options.makeBoundsAware has to be set to true', function () {
    map.setZoom(6);
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true,
      minZoom: 5
    }).addTo(map);
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(true);
  });
  it('should not add layer to the map if minZoom is defined and map zoom is less. options.makeBoundsAware has to be set to true', function () {
    map.setZoom(4);
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true,
      minZoom: 5
    }).addTo(map);
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(false);
  });
  it('should add layer to the map if maxZoom is defined and map zoom is less. options.makeBoundsAware has to be set to true', function () {
    map.setZoom(4);
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true,
      maxZoom: 5
    }).addTo(map);
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(true);
  });
  it('should not add layer to the map if maxZoom is defined and map zoom is greater. options.makeBoundsAware has to be set to true', function () {
    map.setZoom(6);
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true,
      maxZoom: 5
    }).addTo(map);
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(false);
  });
});

describe('LayerGroup when added to a map', function () {
  beforeEach(function () {
    mapDiv = document.createElement('div');
    mapDiv.setAttribute('style', 'height: 500px; width: 500px;');
    document.body.appendChild(mapDiv);
    map = L.map(mapDiv).fitBounds([
      [40, -30],
      [41, -29]
    ]);
  });
  afterEach(function () {
    mapDiv.parentNode.removeChild(mapDiv);
  });
  it('should also add child layers to the map if they are within the map bounds and options.makeBoundsAware === false', function () {
    var layerGroup = L.layerGroup();
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    layerGroup.addTo(map);
    expect(map.hasLayer(marker)).toBe(true);
  });
  it('should also add child layers to the map if they are outside the map bounds and options.makeBoundsAware === false', function () {
    var layerGroup = L.layerGroup();
    var marker = L.marker([70, -50]);
    layerGroup.addLayer(marker);
    layerGroup.addTo(map);
    expect(map.hasLayer(marker)).toBe(true);
  });
  it('should also add child layers to the map if they are within the map bounds and options.makeBoundsAware === true', function () {
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true
    });
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    layerGroup.addTo(map);
    expect(map.hasLayer(marker)).toBe(true);
  });
  it('should not add child layers to the map if they are outside the map bounds and options.makeBoundsAware === true', function () {
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true
    });
    var marker = L.marker([70, -50]);
    layerGroup.addLayer(marker);
    layerGroup.addTo(map);
    expect(map.hasLayer(marker)).toBe(false);
  });
});

describe('When navigating the map', function () {
  beforeEach(function () {
    mapDiv = document.createElement('div');
    mapDiv.setAttribute('style', 'height: 500px; width: 500px;');
    document.body.appendChild(mapDiv);
    map = L.map(mapDiv, {
      minZoom: 0,
      maxZoom: 20,
      zoomAnimation: false
    }).fitBounds([
      [40, -30],
      [41, -29]
    ]);
  });
  afterEach(function () {
    mapDiv.parentNode.removeChild(mapDiv);
  });
  it('should add child layers to the map that are in the new extent but were not in the previous', function () {
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true
    }).addTo(map);
    var marker = L.marker([60.5, -29.5]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(false);
    map.fitBounds([
      [60, -30],
      [61, -29]
    ]);
    expect(map.hasLayer(marker)).toBe(true);
  });
  it('should remove child layers from the map that are not in the new extent but were in the previous', function () {
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true
    }).addTo(map);
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(true);
    map.fitBounds([
      [60, -30],
      [61, -29]
    ]);
    expect(map.hasLayer(marker)).toBe(false);
  });
  // minZoom, maxZoom
  it('should add layer if map zoom was previously less than minZoom but is now greater after navigation. options.makeBoundsAware has to be set to true', function () {
    map.setZoom(4);
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true,
      minZoom: 5
    }).addTo(map);
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(false);
    map.setZoom(6);
    expect(map.hasLayer(marker)).toBe(true);
  });
  it('should remove layer if map zoom was previously greater than minZoom but is now less after navigation. options.makeBoundsAware has to be set to true', function () {
    map.setZoom(6);
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true,
      minZoom: 5
    }).addTo(map);
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(true);
    map.setZoom(4);
    expect(map.hasLayer(marker)).toBe(false);
  });
  it('should add layer if map zoom was previously greater than maxZoom but is now less after navigation. options.makeBoundsAware has to be set to true', function () {
    // map.setZoom(6);
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true,
      maxZoom: 5
    }).addTo(map);
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(false);
    map.setZoom(4);
    expect(map.hasLayer(marker)).toBe(true);
  });
  it('should remove layer if map zoom was previously less than maxZoom but is now greater after navigation. options.makeBoundsAware has to be set to true', function () {
    map.setZoom(4);
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true,
      maxZoom: 5
    }).addTo(map);
    var marker = L.marker([40.5, -29.5]);
    layerGroup.addLayer(marker);
    expect(map.hasLayer(marker)).toBe(true);
    map.setZoom(6);
    expect(map.hasLayer(marker)).toBe(false);
  });
});

// These also apply to Polygons or any path type with .getBounds func
describe('Polylines', function () {
  beforeEach(function () {
    mapDiv = document.createElement('div');
    mapDiv.setAttribute('style', 'height: 500px; width: 500px;');
    document.body.appendChild(mapDiv);
    map = L.map(mapDiv).fitBounds([
      [40, -30],
      [41, -29]
    ]);
  });
  afterEach(function () {
    mapDiv.parentNode.removeChild(mapDiv);
  });
  it('should be added if they are fully within the map bounds', function () {
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true
    }).addTo(map);
    var polyline = L.polyline([
      [40.5, -29.5],
      [40.7, -29.7]
    ]);
    layerGroup.addLayer(polyline);
    expect(map.hasLayer(polyline)).toBe(true);
  });
  it('should be added if they intersect the map bounds', function () {
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true
    }).addTo(map);
    var polyline = L.polyline([
      [40.5, -29.5],
      [43.5, -32.5]
    ]);
    layerGroup.addLayer(polyline);
    expect(map.hasLayer(polyline)).toBe(true);
  });
  it('should not be added if they do not intersect the map bounds in any way', function () {
    var layerGroup = L.layerGroup([], {
      makeBoundsAware: true
    }).addTo(map);
    var polyline = L.polyline([
      [42.5, -31.5],
      [43.5, -32.5]
    ]);
    layerGroup.addLayer(polyline);
    expect(map.hasLayer(polyline)).toBe(false);
  });
});