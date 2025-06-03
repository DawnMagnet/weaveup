# WeaveUp

A modern web-based weaving pattern design application built with React and Material-UI. WeaveUp allows users to create, edit, and visualize weaving patterns with an intuitive interface.

## Features

- **Interactive Weaving Canvas**: Visual grid-based pattern editor
- **Pattern Sections**: Support for warp, weft, shaft, treadle, tie-up, and chart sections
- **Color Management**: Easy color selection and management for warp and weft threads
- **Multiple Tie-up Layouts**: Flexible positioning of tie-up sections
- **Internationalization**: Multi-language support (English/Chinese)
- **Responsive Design**: Works on desktop and mobile devices
- **Pattern Export**: Save and share your weaving patterns

## Technology Stack

- **Frontend**: React 18+ with Hooks
- **UI Framework**: Material-UI (MUI)
- **Internationalization**: react-i18next
- **Canvas Rendering**: HTML5 Canvas API
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd weaveup
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Basic Operations

1. **Creating Patterns**: Click on the canvas grid to toggle pattern elements
2. **Color Selection**: Use the color picker to set warp and weft colors
3. **Pattern Settings**: Adjust chart dimensions, shaft count, and treadle count
4. **Layout Options**: Choose tie-up location (right-up, left-up, etc.)

### Canvas Sections

- **Warp Colors**: Top horizontal strip for warp thread colors
- **Weft Colors**: Right vertical strip for weft thread colors
- **Shaft**: Threading pattern for the shafts
- **Treadle**: Treadling sequence
- **Tie-up**: Connection between shafts and treadles
- **Chart**: Main weaving pattern visualization

## Project Structure

```
weaveup/
├── src/
│   ├── components/
│   │   ├── WeaveCanvas.jsx      # Main canvas component
│   │   └── ...
│   ├── locales/                 # Translation files
│   ├── styles/                  # CSS and styling
│   └── utils/                   # Utility functions
├── public/                      # Static assets
├── package.json
└── README.md
```

## Configuration

### Settings

The application supports various configuration options:

- Chart dimensions (width/height)
- Shaft count
- Treadle count
- Tie-up location
- Color schemes

### Internationalization

Language files are located in the `src/locales/` directory. Currently supported languages:

- English (en)
- Chinese (zh)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

### Development Guidelines

- Use React Hooks for state management
- Follow Material-UI design principles
- Maintain responsive design
- Add proper error handling
- Write clear, commented code
- Test on multiple browsers

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

## Roadmap

- [ ] Pattern import/export functionality
- [ ] Advanced color blending options
- [ ] Pattern library and templates
- [ ] Collaborative editing features
- [ ] Mobile app development
- [ ] 3D pattern visualization

---

Happy weaving! 🧵
