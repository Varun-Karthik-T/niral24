import React from "react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";

function Pdf({ data }) {
  const handleDownload = () => {
    const doc = new jsPDF();

    data.forEach((item, index) => {
      // If this isn't the first page, add a new page
      if (index > 0) {
        doc.addPage();
      }

      // Add title for each conversation block
      doc.setFontSize(16);
      doc.text(`Conversation ${index + 1}`, 10, 10);

      // Add company policies
      doc.setFontSize(12);
      doc.text("Company Policies:", 10, 20);
      Object.entries(item.conversations[0].company_policies).forEach(
        ([key, value], i) => {
          doc.text(`${key}: ${value}`, 10, 30 + i * 10);
        }
      );

      // Add customer objections
      doc.text("Customer Objections:", 10, 80);
      Object.entries(item.conversations[0].customer_objections).forEach(
        ([key, value], i) => {
          doc.text(`${key}: ${value}`, 10, 100 + i * 10);
        }
      );

      // Add customer requirements
      doc.text("Customer Requirements:", 10, 150);
      Object.entries(item.conversations[0].customer_requirements).forEach(
        ([key, value], i) => {
          doc.text(`${key}: ${value}`, 10, 170 + i * 10);
        }
      );
    });

    // Save the PDF
    doc.save("data.pdf");
  };

  return <Button onClick={handleDownload}>Download as PDF</Button>;
}

export default Pdf;
