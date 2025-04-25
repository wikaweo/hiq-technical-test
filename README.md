# 📄 HIQ Technical Test – Text Processing Application

## 📚 Project Overview

This is a fullstack web application where users can upload a text file.  
The backend processes the file by finding the most frequently used word and surrounding it with `foo` and `bar`.  
The goal was to treat this assignment like a real-world client project: applying good structure, best practices, and production-like thinking.

---

## 🛠️ Technology Stack

- **Frontend**: React (with Vite)
- **Backend**: ASP.NET Core 8 Minimal API
- **Testing**: xUnit for backend unit tests
- **Tooling**: .NET 8 SDK, Node.js 18+, npm, Visual Studio 2022+

---

## 📂 Project Structure

/Fullstack or frontend
├── hiq-test-frontend/    # React + Vite frontend
├── hiq-test-backend/     # ASP.NET Core 8 backend
├── Example files to process/ # Example .txt files
├── Answers.md            # Answers to recruitment questions
├── README.md             # Project instructions

---

## 🚀 How to Set Up and Run Locally

### Prerequisites

- .NET 8 SDK installed
- Node.js 18+ and npm installed
- Visual Studio 2022+ (optional but recommended)

---

### 1. Clone the Repository

git clone https://dev.azure.com/hiqskane/_git/hiq-technical-test
cd "Fullstack or frontend"

---

### 2. Setup and Run Backend

cd hiq-test-backend
dotnet restore
dotnet build
dotnet run

The backend server will run at:
https://localhost:5000

---

### 3. Setup and Run Frontend

In a new terminal:
cd hiq-test-frontend
npm install
npm run dev

Frontend will be available at:
http://localhost:5173

---

### 4. Upload and Process Files

- Navigate to [http://localhost:5173](http://localhost:5173) in your browser.
- Upload a `.txt` file.
- The processed text will be displayed with the most frequent word surrounded by `foo` and `bar`.

---

## 🧪 How to Run Backend Tests

Unit tests are provided to validate the core text processing logic.

Inside the solution directory:
dotnet test

---

## 🏢 Production Build and Deployment Strategy

### Backend
- Publish the backend using:
dotnet publish -c Release -o ./publish

- Deploy to Azure App Service, AWS Elastic Beanstalk, or similar.
- Enforce HTTPS and configure CORS to allow only the frontend domain.

---

### Frontend
- Build the frontend for production:
npm run build

- Serve the built files (`dist/`) using:
  - Azure Static Web Apps
  - Vercel
  - Netlify
  - AWS S3 + CloudFront

---

### Environment Variables

- API base URLs should be environment-specific.
- Secrets and connection strings should be stored securely (e.g., Azure Key Vault).

---

## 🌍 Local Production Emulation (Optional)

To emulate a production-like environment locally:

1. Serve the frontend static files:
npm install -g serve
serve -s dist

2. Run the backend with:
dotnet run --configuration Release

This mimics separate deployments for frontend and backend.

---

## 🧠 Final Notes

This project was developed with the following principles in mind:

- Clear and maintainable project structure
- Production readiness mindset
- Solid frontend-backend integration
- Reliable, testable core business logic

---

# ✅ Thank you for reviewing!