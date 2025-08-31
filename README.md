# Context Engineering Website

A modern, professional website for Context Engineering - transforming AI development from alchemy to engineering through systematic context management.

## 🚀 Features

- **Modern Tech Stack**: React 19 + TypeScript + Vite
- **Multi-language Support**: English, Chinese, French
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Complete meta tags and structured data
- **Performance**: Code splitting and lazy loading
- **Accessibility**: WCAG compliant
- **Search Functionality**: Real-time content search
- **Table of Contents**: Auto-scrolling navigation
- **Contact Form**: Functional contact system

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/[YOUR_GITHUB_USERNAME]/kilo-nodal-link.git
cd kilo-nodal-link

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🔧 Configuration

### GitHub Pages Setup

1. **Replace URLs in `index.html`**:
   - Replace `[YOUR_GITHUB_USERNAME]` with your actual GitHub username
   - Update all URLs from `https://[YOUR_GITHUB_USERNAME].github.io/kilo-nodal-link/`

2. **Update Repository Settings**:
   - Go to your GitHub repository
   - Navigate to Settings → Pages
   - Set source to "Deploy from a branch"
   - Select "gh-pages" branch

3. **Custom Domain (Optional)**:
   - Create a `CNAME` file in the `public` folder
   - Add your custom domain

### Environment Variables

No environment variables are required for this project.

## 🏗️ Project Structure

```
kilo-nodal-link/
├── public/
│   ├── favicon.svg          # Custom favicon
│   ├── favicon.ico          # Fallback favicon
│   └── vite.svg            # Vite default favicon
├── src/
│   ├── components/
│   │   ├── Navigation.tsx   # Main navigation
│   │   ├── SearchBar.tsx    # Search functionality
│   │   └── TableOfContents.tsx # TOC component
│   ├── pages/
│   │   ├── Home.tsx         # Homepage
│   │   ├── About.tsx        # About page
│   │   ├── Blog.tsx         # Blog page
│   │   └── Contact.tsx      # Contact page
│   ├── i18n/
│   │   └── locales/         # Translation files
│   ├── App.tsx              # Main app component
│   ├── App.css              # Global styles
│   └── main.tsx            # App entry point
├── index.html               # HTML template
├── package.json
└── vite.config.ts          # Vite configuration
```

## 🎨 Customization

### Colors
The primary color scheme is defined in `src/App.css`:
- Primary: `#3498db` (Blue)
- Secondary: `#2c3e50` (Dark Blue)
- Accent: `#27ae60` (Green)

### Content
All text content is managed through i18n files in `src/i18n/locales/`:
- `en.json` - English translations
- `zh.json` - Chinese translations
- `fr.json` - French translations

### Logo
Custom logo is located at `public/favicon.svg`. The logo features:
- Neural network design representing AI/ML
- "CE" text for Context Engineering
- Gradient colors matching the brand

## 🚀 Deployment

The project is configured for automatic deployment to GitHub Pages:

```bash
npm run deploy
```

This command will:
1. Build the project for production
2. Deploy to the `gh-pages` branch
3. Make the site available at `https://[YOUR_USERNAME].github.io/kilo-nodal-link/`

## 📱 Features Overview

### Core Pages
- **Home**: Comprehensive introduction to context engineering
- **About**: Company mission, vision, and services
- **Blog**: Technical articles and insights
- **Contact**: Contact form and information

### Advanced Features
- **Smart Search**: Search across all content
- **Table of Contents**: Auto-scrolling navigation
- **Multi-language**: Full i18n support
- **Responsive**: Works on all devices
- **SEO Ready**: Complete meta tags and structured data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support, please use the GitHub Issues page or contact us through the website's contact form.

---

**Context Engineering** - Transforming AI development from mysterious alchemy to rigorous engineering through systematic context management.
