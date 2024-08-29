import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const countColors = (data) => {
  const colorCount = {};

  data.forEach((item) => {
    item.conversations.forEach((conversation) => {
      const color = conversation.customer_requirements.color;
      if (color) {
        colorCount[color] = (colorCount[color] || 0) + 1;
      }
    });
  });

  return colorCount;
};

const countIssues = (data) => {
  const issueCount = {
    car_issues: 0,
    customer_experience_issues: 0,
    price_issues: 0,
    refurbishment_quality: 0,
  };

  data.forEach(item => {
    item.conversations.forEach(conversation => {
      for (const key in issueCount) {
        if (conversation.customer_objections[key]) {
          issueCount[key] += 1;
        }
      }
    });
  });

  return issueCount;
};

// Prepare data for the company policies chart
const preparePoliciesChartData = (data) => {
  const policies = {
    "free_rc_transfer": 0,
    "free_rsa_for_one_year": 0,
    "return_policy": 0,
    "five_day_money_back_guarantee": 0,
  };

  data.forEach(item => {
    item.conversations.forEach(conversation => {
      for (const key in policies) {
        if (conversation.company_policies[key]) {
          policies[key] += 1;
        }
      }
    });
  });

  return {
    labels: Object.keys(policies),
    datasets: [{
      label: 'Policy Count',
      data: Object.values(policies),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };
};

const prepareIssuesChartData = (data) => {
  const issueData = countIssues(data);

  return {
    labels: Object.keys(issueData),
    datasets: [{
      label: 'Issue Count',
      data: Object.values(issueData),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    }],
  };
};

const ChartComponent = ({ data, type }) => {
  let chartData;
  let chartTitle;
  let chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          fontSize: 15,
        },
      },
    },
  };

  if (type === 'color') {
    const colorData = countColors(data);
    chartData = {
      labels: Object.keys(colorData),
      datasets: [{
        label: 'Car Colors',
        data: Object.values(colorData),
        backgroundColor: ['aqua', 'green', 'red', 'yellow', 'purple', 'orange', 'white'],
        borderColor: ['aqua', 'green', 'red', 'yellow', 'purple', 'orange', 'white'],
        borderWidth: 0.5,
      }],
    };
    chartTitle = 'Car Color Distribution';
    // Use Pie chart options
    chartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            fontSize: 15,
          },
        },
        title: {
          display: true,
          text: 'Car Color Distribution',
        },
      },
    };
  } else if (type === 'policies') {
    chartData = preparePoliciesChartData(data);
    chartTitle = 'Company Policies Overview';
    chartOptions = {
      ...chartOptions,
      plugins: {
        ...chartOptions.plugins,
        title: {
          display: true,
          text: 'Company Policies Chart',
        },
      },
    };
  } else if (type === 'issues') {
    chartData = prepareIssuesChartData(data);
    chartTitle = 'Customer Objections Overview';
    chartOptions = {
      ...chartOptions,
      plugins: {
        ...chartOptions.plugins,
        title: {
          display: true,
          text: 'Customer Objections Chart',
        },
      },
    };
  }

  return (
    <div style={{ margin: '0 auto' }} className='w-[400px] h-[300px]'>
      <h2>{chartTitle}</h2>
      {type === 'color' ? (
        <Pie data={chartData} options={chartOptions} />
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default ChartComponent;
