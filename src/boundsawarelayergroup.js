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
  },

  addLayer: function (layer) {
    var id = this.getLayerId(layer);
    this._layers[id] = layer;

    if (this._map) {
      if (this.options.makeBoundsAware === true) {
        this._addForBounds([layer], this._map);
      } else {
        this._map.addLayer(layer);
      }
    }

    return this;
  },

  onAdd: function (map) {
    this._map = map;
    if (this.options.makeBoundsAware === true) {
      this._addForBounds(this._layers, map);
      map.on('moveend', function () {
        this._addForBounds(this._layers, map);
      }, this);
    } else {
      this.eachLayer(map.addLayer, map);
    }
  },

  _addForBounds: function (layerArray, map) {
    var mapBounds = map.getBounds(), intersectsMapBounds, layer, i;

    for (i in layerArray) {
      layer = layerArray[i];
      intersectsMapBounds = true; // assume should be rendered by default

      if (typeof layer.getLatLng === 'function') {
        if (!mapBounds.contains(layer.getLatLng())) {
          intersectsMapBounds = false;
        }
      } else if (typeof layer.getBounds === 'function') {
        if (!mapBounds.intersects(layer.getBounds())) {
          intersectsMapBounds = false;
        }
      }

      if (intersectsMapBounds) {
        map.addLayer(layer);
      } else {
        map.removeLayer(layer);
      }
    }
  }
});

L.layerGroup = function (layers, options) {
  return new L.LayerGroup(layers, options);
};