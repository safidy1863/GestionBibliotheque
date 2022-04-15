import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { isEmpty } from "../pages/Empty";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
  const listeLivre = useSelector((state) => state.livresReducer);
  const titre = !isEmpty(listeLivre)
    ? listeLivre.map((liste) => liste.titre)
    : ["sans donnee"];
  const nombre = !isEmpty(listeLivre) ? listeLivre.map((nb) => nb.nb) : [1];
  const data = {
    labels: titre,
    datasets: [
      {
        label: "# of Votes",
        data: nombre,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
  };
  return <Doughnut data={data} options={options} />;
}
