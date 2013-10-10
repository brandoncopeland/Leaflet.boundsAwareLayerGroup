var defaultOptions = {
  makeBoundsAware: false
};

L.LayerGroup.include({
  options: defaultOptions,

  initialize: function (layers, options) {
    L.setOptions(this, options);

    // L.LayerGroup base initialize implementation
    this._layers = {};
    var i, len;
    if (layers) {
      for (i = 0, len = layers.length; i < len; i++) {
        this.addLayer(layers[i]);
      }
    }
  }
});

L.layerGroup = function (layers, options) {
  return new L.LayerGroup(layers, options);
};