Leaflet.boundsAwareLayerGroup
===

[Leaflet.LayerGroup][] plugin to render only layers in the current map bounds

Adding many layers to a map can significantly decrease browser performance, even if the layers aren't currently visible because they're not within the map bounds. Leaflet.boundsAwareLayerGroup patches Leaflet.LayerGroup to manage adding layers within the map bounds and removing layers that are not on each bounds change (zoom, pan, etc...).

Check out the [demo][] comparing performance with and without Leaflet.boundsAwareLayerGroup for 5,000 markers.

## Using the plugin

Create a new [Leaflet.LayerGroup][] with the `makeBoundsAware` option.

```javascript
new L.LayerGroup([marker1, marker2], {
	makeBoundsAware: true
}.addTo(map);
```

or

```javascript
L.layerGroup([marker1, marker2], {
	makeBoundsAware: true
}).addTo(map);
```

Leaflet.boundsAwareLayerGroup works with [Leaflet.FeatureGroup][] as well...

```javascript
L.featureGroup([marker1, marker2], {
	makeBoundsAware: true
}).addTo(map);
```

[leaflet.layergroup]: http://leafletjs.com/reference.html#layergroup
[leaflet.featuregroup]: http://leafletjs.com/reference.html#featuregroup

[example]: http://brandoncopeland.github.io/Leaflet.boundsAwareLayerGroup/example/