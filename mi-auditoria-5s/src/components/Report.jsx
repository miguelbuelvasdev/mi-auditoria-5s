import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const labels = [
  'Seiri',
  'Seiton',
  'Seiso',
  'Seiketsu',
  'Shitsuke'
];

export default function Report({ scores }) {
  const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  const data = {
    labels,
    datasets: [
      {
        label: 'Puntuación 5S',
        data: scores,
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(37, 99, 235, 1)'
      }
    ]
  };
  const options = {
    scales: {
      r: {
        min: 1,
        max: 5,
        ticks: { stepSize: 1, color: '#64748b' },
        pointLabels: { font: { size: 16 }, color: '#334155' }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  };

  return (
    <section className="mt-10 p-8 bg-slate-50 rounded-xl shadow-2xl max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Reporte de Auditoría 5S</h2>
      <p className="text-lg text-slate-700 mb-6">Puntuación General: <span className="font-bold text-blue-600">{avg}</span> / 5</p>
      <Radar data={data} options={options} />
    </section>
  );
}
