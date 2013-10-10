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
    // mapDiv.remove(); // doesn't seem necessary with phantomjs?
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
    // mapDiv.remove(); // doesn't seem necessary with phantomjs?
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