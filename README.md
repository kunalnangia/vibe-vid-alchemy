# Video Vibes Craft

A modern video creation and management platform built with React, TypeScript, and Vite.

## Features

- 🔐 **Authentication**: Secure user authentication and authorization
- 🎥 **Video Creation**: AI-powered video creation tools
- 📋 **Project Management**: Organize and manage video projects
- 🎨 **Templates**: Pre-built templates for quick video creation
- 🤝 **Collaboration**: Team collaboration features
- 📊 **PLM Dashboard**: Product Lifecycle Management
- ⚙️ **Settings**: Customizable user preferences

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: TanStack Query
- **Routing**: React Router v6
- **Backend**: Supabase
- **Testing**: Vitest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd video-vibes-craft
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Auth, etc.)
├── hooks/          # Custom React hooks
├── integrations/   # Third-party integrations
├── lib/           # Utility functions
├── pages/         # Main application pages
├── services/      # API and business logic
└── test/          # Test files
```

## Testing

The project uses Vitest and React Testing Library for testing. To run tests:

```bash
# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Error Handling

The application implements comprehensive error handling through:

- Global error boundaries
- API error handling
- Form validation
- User feedback through toast notifications

## Performance Optimization

The application includes several performance optimizations:

- Code splitting
- Lazy loading of routes
- Memoization of components
- Optimized image loading
- Caching with React Query

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@videovibes.com or join our [Discord community](https://discord.gg/videovibes).
