Leaflet.boundsAwareLayerGroup
===

[Leaflet.LayerGroup][] plugin to render only layers in the current map bounds

Adding many layers to a map can significantly decrease browser performance, even if the layers aren't currently visible because they're not within the map bounds. Leaflet.boundsAwareLayerGroup patches Leaflet.LayerGroup to manage adding layers within the map bounds and removing layers that are not on each bounds change (zoom, pan, etc...).

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


[leaflet.layergroup]: http://leafletjs.com/reference.html#layergroup