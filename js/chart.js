function addData(chart, data) {
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

const makechart = () => {
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

  return new Chart("chart", {
    type: "doughnut",
    options: options,
    data: data,
  });
};

export { addData, removeData, makechart };
