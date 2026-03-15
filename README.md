# 🎨 AI Background Remover - MVP

An AI-powered online background removal tool built for the overseas market. Built with Cloudflare Workers + React + remove.bg API.

## 🚀 Live Demo

Coming soon!

## ✨ Features

- **Fast Processing**: Remove backgrounds in seconds using AI
- **Easy to Use**: Drag and drop interface
- **High Quality**: Powered by remove.bg API
- **Responsive**: Works on desktop and mobile
- **No Storage**: All processing happens in memory, privacy-focused

## 🏗️ Architecture

```
User Browser
    ↓
Cloudflare Pages (Frontend - React)
    ↓
Cloudflare Worker (Backend - API Gateway)
    ↓
remove.bg API (AI Processing)
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Cloudflare Workers
- **API**: remove.bg
- **Deployment**: Cloudflare Pages + Workers
- **Domain & CDN**: Cloudflare

## 📦 Project Structure

```
bg-remover-mvp/
├── worker/              # Cloudflare Worker backend
│   ├── src/
│   │   └── index.js    # Worker logic
│   ├── wrangler.toml   # Cloudflare config
│   └── package.json
├── frontend/            # React frontend
│   ├── src/
│   │   ├── App.jsx     # Main app component
│   │   ├── App.css     # Styles
│   │   └── main.jsx    # Entry point
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── docs/               # Documentation
│   └── mvp-prd.md     # MVP Requirements
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- [Cloudflare account](https://dash.cloudflare.com/)
- [remove.bg API key](https://www.remove.bg/api)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/649019011/bg-remover-mvp.git
   cd bg-remover-mvp
   ```

2. **Install dependencies**

   For frontend:
   ```bash
   cd frontend
   npm install
   ```

   For worker:
   ```bash
   cd ../worker
   npm install
   ```

3. **Set up Cloudflare Worker**

   Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

   Login to Cloudflare:
   ```bash
   wrangler login
   ```

   Set your remove.bg API key as a secret:
   ```bash
   cd worker
   wrangler secret put REMOVEBG_API_KEY
   # Enter your API key when prompted
   ```

4. **Deploy the Worker**
   ```bash
   wrangler deploy
   ```

   Copy the Worker URL (e.g., `https://bg-remover-worker.your-subdomain.workers.dev`)

5. **Configure Frontend**

   Create a `.env` file in the `frontend` directory:
   ```bash
   cd frontend
   echo "VITE_WORKER_URL=https://your-worker-url.workers.dev" > .env
   ```

6. **Run locally**
   ```bash
   npm run dev
   ```

   Open http://localhost:3000

7. **Deploy to Cloudflare Pages**
   ```bash
   npm run build
   npx wrangler pages deploy dist
   ```

## 🌍 Deployment

### Cloudflare Worker (Backend)

```bash
cd worker
npm run deploy
```

### Cloudflare Pages (Frontend)

```bash
cd frontend
npm run build
npx wrangler pages deploy dist
```

## 📊 Cost Estimation

### MVP Phase (Monthly)
- **Domain**: ~$1 (if purchased)
- **remove.bg API**: $0-20 (50 free credits, then $0.20/image)
- **Cloudflare**: $0 (Free tier sufficient)
- **Total**: $0-20/month

### Growth Phase (Monthly)
- **Domain**: ~$1
- **remove.bg API**: $12/month (1000 images)
- **Cloudflare Pro**: $20/month (optional)
- **Total**: ~$33/month + 3% Stripe fees

## 🎯 Business Model

### Pricing
- **Free**: 5 images/month, low resolution (500px)
- **Pro**: $9/month or $89/year, unlimited + HD (2000px)
- **API**: Coming soon

### Target Markets
- **Primary**: US, UK, Canada
- **Secondary**: Australia, New Zealand
- **Expansion**: Southeast Asia, Latin America

## 📝 MVP Requirements

See [docs/mvp-prd.md](docs/mvp-prd.md) for complete product requirements.

## 🚧 Roadmap

- [x] Basic image upload and processing
- [x] Drag and drop interface
- [x] Background removal with remove.bg API
- [x] Download processed image
- [ ] Usage tracking and limits
- [ ] Stripe payment integration
- [ ] Multi-language support
- [ ] Batch processing
- [ ] Background replacement
- [ ] API endpoints for developers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [remove.bg](https://www.remove.bg) for the amazing AI background removal API
- [Cloudflare](https://www.cloudflare.com) for the excellent Workers and Pages platform
- [React](https://react.dev) and [Vite](https://vitejs.dev) for the frontend framework

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ by [乘风](https://github.com/649019011)
