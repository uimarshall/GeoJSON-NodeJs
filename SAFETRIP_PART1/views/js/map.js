mapboxgl.accessToken =
    "pk.eyJ1IjoidWltYXJzaGFsbCIsImEiOiJjazVpNDZsd3kwNzV6M2ZsOXJ4dWVkYjd4In0.gWu1O4QWFtjN2wfMG11q6Q";
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    zoom: 9,
    center: [3.406448, 6.465422]
});

// Fetch roads from API
async function getRoads() {
    const res = await fetch("/api/v1/roads");
    const data = await res.json();
    // console.log(data);

    // Reconstruct d data frm Db to what mapbox needs
    const roads = data.data.map(road => {
        return {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    road.location.coordinates[0],
                    road.location.coordinates[1]
                ]
            },
            properties: {
                roadId: road.roadId,
                icon: "shop"
            }
        };
    });
    loadMap(roads);
}

// Load map with roads
const loadMap = roads => {
    map.on("load", function() {
        map.addLayer({
            id: "points",
            type: "symbol",
            source: {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: roads
                        // features: [{
                        //     type: "Feature",
                        //     geometry: {
                        //         type: "Point",
                        //         coordinates: [3.406448, 6.465422]
                        //     },
                        //     properties: {
                        //         roadId: "0001",
                        //         icon: "road"
                        //     }
                        // }]
                }
            },
            layout: {
                "icon-image": "{icon}-15",
                "icon-size": 1.5,
                "text-field": "{storeId}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.9],
                "text-anchor": "top"
            }
        });
    });
};
getRoads();