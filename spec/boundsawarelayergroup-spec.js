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

describe('LayerGroup .initialize', function () {
  it('should still behave as the base L.LayerGroup implementation and add any passed layers', function () {
    var marker = L.marker([50.5, 30.5]);
    var layerGroup = L.layerGroup([marker]);
    expect(layerGroup.hasLayer(marker)).toBe(true);
  });
});