import { makemap } from "./map.js";
import { make_chart } from "./chart.js";
import { setup_hover } from "./interacton.js";
let map = makemap();
let chart = make_chart();
map.on("load", () => {
  // LOAD DATA: add vector tileset from DVRPC's server

  map.addSource("rtsp_tile", {
    type: "vector",
    url: "https://www.tiles.dvrpc.org/data/rtps-reliability.json",
    minzoom: 8,
  });

  map.addLayer({
    id: "rtsp",
    type: "line",
    source: "rtsp_tile",
    "source-layer": "otp",
    paint: {
      "line-width": 3,
      "line-opacity": 1,
      "line-color": {
        property: "otp",
        stops: [
          [60, "red"],
          [70, "orange"],
          [80, "yellow"],
          [90, "green"],
          [100, "light blue"],
        ],
      },
    },
  });
  setup_hover(map, chart);
});
