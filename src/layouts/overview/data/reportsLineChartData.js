const reportsLineChartData = {
  sales: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Vendas",
        backgroundColor: "rgba(0, 123, 255, 0.5)",
        borderColor: "rgba(0, 123, 255, 1)",
        data: [65, 59, 80, 81, 56, 55]
      }
    ]
  },
  tasks: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Tarefas",
        backgroundColor: "rgba(0, 200, 123, 0.5)",
        borderColor: "rgba(0, 200, 123, 1)",
        data: [28, 48, 40, 19, 86, 27]
      }
    ]
  }
};

export default reportsLineChartData;
