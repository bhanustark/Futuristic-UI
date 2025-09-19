# Using Futuristic UI

Demo: [Futuristic UI](https://futuristicui.com)

## Installation

### Option 1: From npm (after publishing)
```bash
npm install futuristic-ui
```

### Option 2: From local build
```bash
# Build the library
npm run build:lib

# In your target project, install from local path
npm install file:../path/to/futuristic-ui
```

### Option 3: Using npm link (for development)
```bash
# In futuristic-ui directory
npm link

# In your target project
npm link futuristic-ui
```

## Usage

### Basic Components
```jsx
import { Button, Input, Modal } from 'futuristic-ui';
import 'futuristic-ui/style.css'; // Import styles

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Input placeholder="Enter text" />
    </div>
  );
}
```

### Specialized Components
```jsx
import { 
  CircuitLoader, 
  HologramCheckbox, 
  DataStreamSkeleton,
  GlitchText 
} from 'futuristic-ui';

function FuturisticApp() {
  return (
    <div>
      <GlitchText>Futuristic Title</GlitchText>
      <CircuitLoader />
      <HologramCheckbox>Enable AI</HologramCheckbox>
      <DataStreamSkeleton />
    </div>
  );
}
```

### Hooks
```jsx
import { useModal } from 'futuristic-ui';

function MyComponent() {
  const { isOpen, openModal, closeModal } = useModal();
  
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {/* Modal content */}
    </div>
  );
}
```

## Available Scripts

- `npm run build` - Build for production (app mode)
- `npm run build:lib` - Build as library for publishing
- `npm run dev` - Start development server
- `npm run preview` - Preview production build

## Package Structure

- **ES Module**: `dist/futuristic-ui.es.js`
- **UMD**: `dist/futuristic-ui.umd.js`
- **Types**: `dist/index.d.ts`
- **Styles**: `dist/style.css`