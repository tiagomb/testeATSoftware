import ApexCharts from 'react-apexcharts';
import { useQuery } from 'react-query';
import { ApexOptions } from 'apexcharts';

export interface DataPoint {
  id: string;
  timestamp: string;
  react: number;
  angular: number;
  vue: number;
}

const fetchChartData = async (): Promise<DataPoint[]> => {
  const response = await fetch('http://localhost:3001/frameworks');
  if (!response.ok) {
    throw new Error('Erro ao buscar os dados');
  }
  return response.json();
};

export default function LineChart() {
  const { data = [], error, isLoading } = useQuery(['chartData'], fetchChartData);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao buscar dados.</p>;

  const chartData: { series: ApexOptions['series']; options: ApexOptions } = {
    series: [
      {
        name: 'React',
        data: data.map((point) => ({ x: point.timestamp, y: point.react })),
      },
      {
        name: 'Angular',
        data: data.map((point) => ({ x: point.timestamp, y: point.angular })),
      },
      {
        name: 'Vue',
        data: data.map((point) => ({ x: point.timestamp, y: point.vue })),
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: '100%',
        width: '100%',
      },
      xaxis: {
        type: 'category',
        labels: {
          format: 'yyyy-MM-dd',
        },
      },
      yaxis: {
        title: {
          text: 'Popularidade',
        },
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Popularidade de Frameworks ao longo do tempo',
        align: 'center',
      },
    },
  };

  return (
    <div style={{ width: '100vw', height: '50vh' }}>
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="line"  // Define o tipo do gráfico na tag ApexCharts
        height="100%"
        width="100%"
      />
    </div>
  );
};
