import { makemap } from "./map.js";
let map = makemap();

var data = {
  labels: [],
  datasets: [
    {
      label: "Dataset #1",
      backgroundColor: ["rgba(59, 250, 6, 0.2)", "rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(59, 250, 6, 0.8)", "rgba(255,99,132,.8)"],
      borderWidth: 2,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [],
    },
  ],
};
function addData(chart, label, data) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
}
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

  map.on("mouseenter", "rtsp", (e) => {
    // get the attributes for the specific feature under the mouse
    let message = "<h1> Routes </h1><ul>";
    e.features.forEach((feature) => {
      message += `<li>${feature.properties.linename}</li>`;
    });
    message += "</ul>";
    let popup = new mapboxgl.Popup({
      closeButton: false,
      className: "popup-style",
    });

    popup.setLngLat(e.lngLat).setHTML(message).addTo(map);
  });

  map.on("mouseleave", "rtsp", (e) => {
    // get all HTML elements with the class name 'popup-style'
    let popup = document.getElementsByClassName("popup-style");

    // remove all elements with this class name
    if (popup.length) {
      popup[0].remove();
    }
  });

  map.on("click", "rtsp", (e) => {
    removeData(chart);
    removeData(chart);
    let properties = e.features[0].properties;
    let otp = properties["otp"];
    let line = properties["linename"];
    addData(chart, line, otp);
    addData(chart, line, 100 - otp);
    chart.update();
    document.getElementById(
      "routedesc"
    ).innerHTML = `Route ${line} is on-time <span style="color: rgba(59, 250, 6, 0.8)">${otp}% <span/> 
    of the time.`;
  });
});

var options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      stacked: true,
      grid: {
        display: true,
        color: "rgba(255,99,132,0.2)",
      },
    },
    x: {
      grid: {
        display: true,
      },
    },
  },
};

const chart = new Chart("chart", {
  type: "doughnut",
  options: options,
  data: data,
});
