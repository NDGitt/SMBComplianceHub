# SMB Compliance Hub

A comprehensive compliance management platform for small and medium businesses, helping them navigate regulatory requirements and find the right compliance providers.

## Features

- **Compliance Discovery**: Interactive wizard to identify required compliance requirements
- **Provider Directory**: Comprehensive database of compliance service providers
- **Results Dashboard**: Detailed analysis and recommendations
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **UI Components**: Radix UI, Shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: Drizzle ORM with PostgreSQL
- **Deployment**: GitHub Pages (Frontend), Vercel/Railway (Backend)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (for backend)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/SMBComplianceHub.git
cd SMBComplianceHub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database and API keys
```

4. Run database migrations:
```bash
npm run db:push
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the frontend for GitHub Pages:
```bash
npm run build:frontend
```

Build the full application (frontend + backend):
```bash
npm run build
```

## Deployment

### GitHub Pages (Frontend)

The frontend is automatically deployed to GitHub Pages via GitHub Actions. The workflow triggers on pushes to the main branch.

#### Quick Setup

1. **Configure for your GitHub username**:
```bash
npm run setup:github-pages <your-github-username>
```

2. **Push to GitHub**:
```bash
git add .
git commit -m "Configure for GitHub Pages"
git push origin main
```

3. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Set Source to "GitHub Actions"

4. **Access your site**:
   - Your site will be available at: `https://your-username.github.io/SMBComplianceHub`

#### Manual Deployment

To manually deploy:
```bash
npm run deploy
```

**Important**: Update the `homepage` field in `package.json` with your actual GitHub username:
```json
{
  "homepage": "https://your-username.github.io/SMBComplianceHub"
}
```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Backend Deployment

The backend can be deployed to platforms like:
- Vercel
- Railway
- Heroku
- DigitalOcean App Platform

## Project Structure

```
SMBComplianceHub/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and configurations
│   └── index.html
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Database operations
├── shared/               # Shared types and schemas
├── attached_assets/      # Static assets and data
└── dist/                 # Build output
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@smbcompliancehub.com or create an issue in this repository. 