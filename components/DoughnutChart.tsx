'use client';

// Import the necessary components and plugins from the 'chart.js' library
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js';

// Import the Doughnut component from the 'react-chartjs-2' library
import { Doughnut } from 'react-chartjs-2';

// Register the ArcElement plugin with the ChartJS library
ChartJS.register( ArcElement );

// Register the Tooltip and Legend plugins with the ChartJS library
ChartJS.register( Tooltip, Legend );

// Define the DoughnutChart component.
// This component takes an object as a prop with a property called 'accounts'.
// The 'accounts' property is an array of objects representing bank accounts.
const DoughnutChart = ( { accounts }: DoughnutChartProps ) =>
{
  // Extract the names of the bank accounts from the 'accounts' array.
  // The 'map' method is used to iterate over each object in the array.
  // The 'name' property of each object is accessed to get the account name.
  const accountNames = accounts.map( ( account ) => account.name );

  // Extract the current balances of the bank accounts from the 'accounts' array.
  // The 'map' method is used to iterate over each object in the array.
  // The 'currentBalance' property of each object is accessed to get the account balance.
  const balances = accounts.map( ( account ) => account.currentBalance );

  // Create the data object for the Doughnut chart.
  // The 'datasets' property is an array with a single object.
  // The 'label' property is set to 'Banks'.
  // The 'data' property is set to the 'balances' array, which contains the current balances of the bank accounts.
  // The 'background' property is an array of three colors for the three slices of the doughnut chart.
  const data = {
    datasets: [
      {
        label: 'Banks',
        data: balances,
        background: ['#0747b6', '#2265d8', '#2f91fa']
      }
    ],

    // Set the labels for the doughnut chart to the account names.
    labels: accountNames
  };

  // Return the Doughnut chart component with the data and options.
  // The 'data' prop is set to the 'data' object created above.
  // The 'options' prop is an object with a single property set to 'cutout: '60%''.
  // This sets the size of the center of the doughnut chart.
  // The 'plugins' property is an object with a single property set to 'legend: { display: false }'.
  // This hides the legend in the chart.
  return <Doughnut
    data={ data }
    options={ {
      cutout: '60%',
      plugins: {
        legend: {
          display: false
        }
      }
    }}
  />;
};

// Export the DoughnutChart component as the default export.
export default DoughnutChart;
