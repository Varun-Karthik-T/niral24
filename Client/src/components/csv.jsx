import React from 'react';
import {Button} from './ui/button';
// Utility function to convert nested JSON data to CSV
const jsonToCsv = (json) => {
  // Extract headers from nested keys
  const headers = Object.keys(json[0].conversations[0]).flatMap((key) =>
    Object.keys(json[0].conversations[0][key]).map((subKey) => `${key}.${subKey}`)
  );

  // Map each object in conversations to a CSV row
  const csvRows = json.flatMap((row) =>
    row.conversations.map((conversation) =>
      headers.map((header) => {
        const [mainKey, subKey] = header.split('.');
        return JSON.stringify(conversation[mainKey][subKey] || '');
      }).join(',')
    )
  );

  // Combine headers and rows
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
    <Button onClick={handleDownload}>
      Download as CSV
    </Button>
  );
}

export default Csv;
