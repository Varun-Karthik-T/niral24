# Car Sales Conversation Processor

## Overview

The **Car Sales Conversation Processor** is a powerful tool designed to analyze car sales conversation transcripts. It intelligently extracts essential information such as customer requirements, company policies discussed, and customer objections, all without the need for extensive training data. This project is ideal for sales teams looking to streamline their processes and improve customer interactions.

## Features

- **Data Input**: Easily fetch and process data from multiple sources:
  - Direct text input for quick analysis.
  - Upload `.txt` files for batch processing.
  - Extract text from `.pdf` files for comprehensive analysis.

- **Data Extraction**:
  - Automatically extract customer requirements, company policies, and objections.
  - View extracted data in a user-friendly profile interface.
  - Download extracted data in CSV or PDF formats for reporting.
  - Visualize data insights using interactive bar and pie charts.

- **User Interface**:
  - Choose between light and dark mode for a customizable user experience.
  - Responsive design to ensure usability across devices.

## Tech Stack

### Backend
- **Flask REST API**: For handling requests and serving data.
- **PDFPlumber**: For extracting text from PDF files.
- **LLaMA 3.1:8b via Ollama**: To convert text into structured JSON format.

### Frontend
- **React.js**: For building a dynamic user interface.
- **Tailwind CSS**: For styling and responsive design.
- **Shadcn UI**: A component library for enhanced UI elements.
- **jsPDF**: To convert JSON data into downloadable PDF format.
- **Chart.js**: For creating interactive data visualizations.

## Getting Started

### Prerequisites

- Python 3.x
- Node.js (for frontend)
- npm (Node package manager)

### Backend Setup

1. **Install Ollama** (if not already installed):
   - Follow the installation instructions on [Ollama's website](https://ollama.com).

2. **Clone the repository**:
   ```bash
   git clone <repository-url>

3. **Set up the backend**:
   ```bash
   cd Server
   ```

4. **Create and activate a virtual environment**:
   - For Windows:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - For macOS/Linux:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

5. **Install required packages**:
   ```bash
   pip install -r req.txt
   ```

6. **Run the server**:
   ```bash
   python server.py
   ```

### Frontend Setup

1. **Navigate to the client directory**:
   ```bash
   cd Client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## Usage

Once both the backend and frontend servers are running, you can access the application in your web browser at `http://localhost:3000` (or the specified port). 

### Features
- **Input Conversation**: Manually enter conversation text or upload `.txt` or `.pdf` files.
- **Process Data**: Click on the process button to extract relevant information from the conversation.
- **View Data**: Access a user-friendly interface to view extracted data.
- **Download Options**: Export the extracted data in CSV or PDF formats.
- **Data Visualization**: Utilize bar and pie charts to gain insights from the data.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information on how to get involved.

## Contact

For any questions or feedback, please reach out to [your-email@example.com].

---

Thank you for checking out the Car Sales Conversation Processor! We hope it enhances your car sales processes and improves customer satisfaction.
```

### Key Improvements Made:
- **Title and Introduction**: Added a more engaging title and expanded the overview to highlight the project's purpose.
- **Detailed Features**: Enhanced descriptions of features to clarify their benefits.
- **Tech Stack Organization**: Clearly separated backend and frontend technologies for better readability.
- **Getting Started Section**: Included prerequisites and a cloning step for better onboarding.
- **Usage Instructions**: Clarified how to access and use the application.
- **Contributing and Contact Sections**: Encouraged community involvement and provided a way to contact for support.

This revised `README.md` should provide a comprehensive and engaging guide for users and contributors alike!
