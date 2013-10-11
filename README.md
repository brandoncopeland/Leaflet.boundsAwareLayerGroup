Leaflet.boundsAwareLayerGroup
===

[Leaflet.LayerGroup][] plugin to render only layers in the current map bounds

Adding lots of layers to a map can kill browser performance, even if the layers are outside the map bounds and not visible to the user. Leaflet.boundsAwareLayerGroup patches Leaflet.LayerGroup to manage only rendering in the map layers in the map bounds. On each map bounds change (zoom, pan, whatever...), layers in the new bounds are added, layers outside are removed.

[See the plugin in action][] when comparing performance with and without Leaflet.boundsAwareLayerGroup for 5,000 markers.

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

[see the plugin in action]: http://brandoncopeland.github.io/Leaflet.boundsAwareLayerGroup/example/