import React from 'react';

const jsonToCsv = (json) => {
  const headers = Object.keys(json[0]).flatMap(key => Object.keys(json[0][key]).map(subKey => `${key}.${subKey}`));

  const csvRows = json.map(row =>
    headers.map(header => {
      const [mainKey, subKey] = header.split('.');
      return JSON.stringify(row[mainKey][subKey]);
    }).join(',')
  );


  return [headers.join(','), ...csvRows].join('\n');
};

function Csv({ data }) {
  const handleDownload = () => {
    const csvData = jsonToCsv(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    a.click();
  };

  return (
    <button onClick={handleDownload}>
      Download as CSV
    </button>
  );
}

export default Csv;
