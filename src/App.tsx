import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Container from "./components/Container";
import Text from "./components/Text";
import Loader from "./components/Loader";
import {
  CircuitLoader,
  DataStreamLoader,
  HolographicLoader,
  ProgressLoader,
} from "./components/SpecializedLoaders";
import {
  GlitchText,
  TypewriterText,
  MatrixText,
  ScanlineText,
} from "./components/AnimatedText";
import Input from "./components/Input";
import {
  CodeInput,
  TerminalInput,
  ScannerInput,
} from "./components/SpecializedInputs";
import Skeleton from "./components/Skeleton";
import {
  DataStreamSkeleton,
  CircuitSkeleton,
  HologramSkeleton,
  GlitchSkeleton,
} from "./components/SpecializedSkeletons";
import Switch from "./components/Switch";
import {
  PowerSwitch,
  SecuritySwitch,
  HologramSwitch,
} from "./components/SpecializedSwitches";
import Checkbox from "./components/Checkbox";
import {
  DataCheckbox,
  CircuitCheckbox,
  HologramCheckbox,
} from "./components/SpecializedCheckboxes";
import Popover from "./components/Popover";
import {
  InfoPopover,
  AlertPopover,
  HologramPopover,
  DataStreamPopover,
  TerminalPopover,
} from "./components/SpecializedPopovers";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/Tabs";
import {
  HolographicTabs,
  DataTabs,
  TerminalTabs,
  CircuitTabs,
} from "./components/SpecializedTabs";
import { useModal } from "./hooks/useModal";

function App() {
  const [count, setCount] = useState(0);

  // Modal hooks for different variants
  const primaryModal = useModal();
  const secondaryModal = useModal();
  const dangerModal = useModal();
  const confirmModal = useModal();

  const handleConfirmAction = () => {
    alert("Action confirmed!");
    confirmModal.close();
  };

  return (
    <div className="min-h-screen bg-black p-8 flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-mono font-bold text-cyan-400 mb-8 tracking-wider uppercase">
        Futuristic UI
      </h1>

      <div className="flex flex-col gap-8 items-center max-w-6xl w-full">
        {/* Text Components Section */}
        <div className="w-full">
          <h2 className="text-2xl font-mono text-white tracking-wide text-center mb-6">
            Text Components
          </h2>

          <Container
            size="full"
            variant="primary"
            title="Basic Text Variants"
            padding="lg"
            glow
            className="mb-6 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Text variant="display" color="primary" glow>
                  NEURAL INTERFACE
                </Text>
                <Text variant="heading" color="secondary">
                  System Status: Online
                </Text>
                <Text variant="subheading" color="success">
                  All systems operational
                </Text>
                <Text variant="body" color="white">
                  The quantum processing unit is functioning at optimal
                  capacity.
                </Text>
                <Text variant="caption" color="neutral">
                  Last updated: 2025.09.17 14:32:15 UTC
                </Text>
              </div>

              <div className="space-y-4">
                <Text variant="code" color="primary">
                  npm install future-ui
                </Text>
                <Text variant="terminal" color="success">
                  $ system.initialize() → SUCCESS
                </Text>
                <Text variant="body" color="warning" weight="bold" uppercase>
                  Warning: High energy detected
                </Text>
                <Text variant="body" color="danger" animated glow>
                  Critical alert status
                </Text>
              </div>
            </div>
          </Container>

          <Container
            size="full"
            variant="secondary"
            title="Animated Text Effects"
            padding="lg"
            scanlines
            className="mb-6 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Text variant="caption" color="secondary" className="mb-2">
                    Glitch Text Effect
                  </Text>
                  <GlitchText
                    intensity="medium"
                    speed="medium"
                    color="primary"
                    size="lg"
                  >
                    CORRUPTED DATA
                  </GlitchText>
                </div>

                <div>
                  <Text variant="caption" color="secondary" className="mb-2">
                    Matrix Text Effect
                  </Text>
                  <MatrixText
                    color="green"
                    speed="medium"
                    density="medium"
                    size="md"
                  >
                    THE MATRIX HAS YOU
                  </MatrixText>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Text variant="caption" color="secondary" className="mb-2">
                    Typewriter Effect
                  </Text>
                  <TypewriterText
                    speed={80}
                    delay={500}
                    repeat
                    color="primary"
                    size="lg"
                  >
                    Initializing neural link...
                  </TypewriterText>
                </div>

                <div>
                  <Text variant="caption" color="secondary" className="mb-2">
                    Scanline Text Effect
                  </Text>
                  <ScanlineText color="primary" speed="medium" size="lg">
                    SCANNING COMPLETE
                  </ScanlineText>
                </div>
              </div>
            </div>
          </Container>

          <Container
            size="full"
            variant="danger"
            title="Terminal Interface"
            padding="lg"
            animated
            className="mb-6"
          >
            <div className="space-y-3 bg-black p-4 rounded border border-red-400/30">
              <div className="flex items-center gap-2">
                <span className="text-red-400 font-mono">
                  root@cybersystem:~$
                </span>
                <TypewriterText speed={50} color="white" showCursor>
                  access mainframe.exe
                </TypewriterText>
              </div>

              <div className="pl-4">
                <GlitchText
                  intensity="low"
                  speed="fast"
                  color="danger"
                  size="sm"
                >
                  ACCESS DENIED - SECURITY BREACH DETECTED
                </GlitchText>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-green-400 font-mono">
                  guest@system:~$
                </span>
                <Text variant="terminal" color="success" size="sm">
                  Connection established
                </Text>
              </div>

              <div className="pl-4">
                <MatrixText color="cyan" speed="fast" density="high" size="sm">
                  DOWNLOADING CLASSIFIED FILES...
                </MatrixText>
              </div>
            </div>
          </Container>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Container variant="primary" size="sm" padding="none" glow>
              <div className="text-center space-y-2">
                <GlitchText
                  intensity="high"
                  speed="fast"
                  color="primary"
                  size="xl"
                >
                  42
                </GlitchText>
                <Text variant="caption" color="primary">
                  Active Processes
                </Text>
              </div>
            </Container>

            <Container variant="secondary" size="sm" padding="none" animated>
              <div className="text-center space-y-2">
                <ScanlineText color="secondary" size="xl">
                  99.7%
                </ScanlineText>
                <Text variant="caption" color="secondary">
                  System Efficiency
                </Text>
              </div>
            </Container>

            <Container variant="danger" size="sm" padding="none" scanlines>
              <div className="text-center space-y-2">
                <TypewriterText speed={200} repeat color="danger" size="xl">
                  ALERT
                </TypewriterText>
                <Text variant="caption" color="danger">
                  Threat Level
                </Text>
              </div>
            </Container>
          </div>
        </div>

        {/* Loader Components Section */}
        <div className="w-full">
          <h2 className="text-2xl font-mono text-white tracking-wide text-center mb-6">
            Loader Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Container
              variant="primary"
              title="Basic Loaders"
              padding="lg"
              glow
              className="mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <Text variant="caption" color="primary" className="mb-3">
                    Spinner Loader
                  </Text>
                  <Loader
                    variant="spinner"
                    size="lg"
                    color="primary"
                    text="Loading..."
                    showText
                  />
                </div>

                <div className="text-center space-y-4">
                  <Text variant="caption" color="secondary" className="mb-3">
                    Pulse Loader
                  </Text>
                  <Loader
                    variant="pulse"
                    size="lg"
                    color="secondary"
                    text="Processing..."
                    showText
                  />
                </div>

                <div className="text-center space-y-4">
                  <Text variant="caption" color="success" className="mb-3">
                    Dots Loader
                  </Text>
                  <Loader
                    variant="dots"
                    size="lg"
                    color="success"
                    text="Analyzing..."
                    showText
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="text-center space-y-4">
                  <Text variant="caption" color="danger" className="mb-3">
                    Scanner Loader
                  </Text>
                  <Loader
                    variant="scanner"
                    size="lg"
                    color="danger"
                    text="Scanning..."
                    showText
                  />
                </div>

                <div className="text-center space-y-4">
                  <Text variant="caption" color="warning" className="mb-3">
                    Orbit Loader
                  </Text>
                  <Loader
                    variant="orbit"
                    size="lg"
                    color="warning"
                    text="Connecting..."
                    showText
                  />
                </div>

                <div className="text-center space-y-4">
                  <Text variant="caption" color="primary" className="mb-3">
                    Quantum Loader
                  </Text>
                  <Loader
                    variant="quantum"
                    size="lg"
                    color="primary"
                    text="Quantum sync..."
                    showText
                  />
                </div>
              </div>
            </Container>

            <Container
              variant="secondary"
              title="Advanced Loaders"
              padding="lg"
              animated
              className="mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center space-y-4">
                  <Text variant="caption" color="secondary" className="mb-3">
                    Circuit Loader
                  </Text>
                  <CircuitLoader
                    size="lg"
                    color="primary"
                    speed="medium"
                    text="Neural network active"
                  />
                </div>

                <div className="text-center space-y-4">
                  <Text variant="caption" color="secondary" className="mb-3">
                    Holographic Loader
                  </Text>
                  <HolographicLoader
                    size="lg"
                    color="secondary"
                    text="Projecting interface"
                  />
                </div>
              </div>
            </Container>

            <Container
              variant="danger"
              title="Data Stream & Progress"
              padding="lg"
              scanlines
              className="mb-6"
            >
              <div className="space-y-8">
                <div className="text-center">
                  <Text variant="caption" color="danger" className="mb-4">
                    Data Stream Loader
                  </Text>
                  <DataStreamLoader
                    size="md"
                    color="success"
                    lines={6}
                    text="Downloading classified files..."
                  />
                </div>

                <div className="space-y-4">
                  <Text variant="caption" color="danger" className="mb-3">
                    Progress Loaders
                  </Text>
                  <div className="space-y-4">
                    <ProgressLoader
                      progress={25}
                      size="md"
                      color="primary"
                      text="System initialization"
                      showPercentage
                    />
                    <ProgressLoader
                      progress={67}
                      size="md"
                      color="secondary"
                      text="Neural network training"
                      showPercentage
                    />
                    <ProgressLoader
                      progress={94}
                      size="md"
                      color="success"
                      text="Data synchronization"
                      showPercentage
                    />
                  </div>
                </div>
              </div>
            </Container>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Container variant="primary" size="sm" padding="md" glass>
              <div className="text-center space-y-3">
                <Loader variant="spinner" size="md" color="primary" />
                <Text variant="caption" color="primary">
                  CPU Usage
                </Text>
              </div>
            </Container>

            <Container variant="secondary" size="sm" padding="md" glow>
              <div className="text-center space-y-3">
                <CircuitLoader size="sm" color="secondary" speed="fast" />
                <Text variant="caption" color="secondary">
                  Neural Net
                </Text>
              </div>
            </Container>

            <Container variant="danger" size="sm" padding="md" animated>
              <div className="text-center space-y-3">
                <Loader variant="pulse" size="md" color="danger" />
                <Text variant="caption" color="danger">
                  Threat Scan
                </Text>
              </div>
            </Container>

            <Container variant="neutral" size="sm" padding="md" cornerAccents>
              <div className="text-center space-y-3">
                <HolographicLoader size="sm" color="success" />
                <Text variant="caption" color="success">
                  Projection
                </Text>
              </div>
            </Container>
          </div>
        </div>

        {/* Container Section */}
        <div className="w-full">
          <h2 className="text-2xl font-mono text-white tracking-wide text-center mb-6">
            Containers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Container
              variant="primary"
              title="System Overview"
              subtitle="Real-time monitoring"
              glow
              animated
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-300 font-mono text-sm">
                    CPU Usage
                  </span>
                  <span className="text-cyan-400 font-mono font-bold">73%</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-[73%] animate-pulse" />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-cyan-300 font-mono text-sm">
                    Memory
                  </span>
                  <span className="text-cyan-400 font-mono font-bold">
                    6.2GB
                  </span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-[45%] animate-pulse" />
                </div>
              </div>
            </Container>

            <Container
              variant="secondary"
              title="Neural Network"
              subtitle="AI Processing Status"
              glow
              scanlines
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-purple-300 font-mono text-sm">
                    Deep Learning Active
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <span className="text-pink-300 font-mono text-sm">
                    Pattern Recognition
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                  <span className="text-purple-300 font-mono text-sm">
                    Data Classification
                  </span>
                </div>

                <div className="mt-4 p-3 border border-purple-400/30 bg-purple-900/20">
                  <div className="text-purple-400 font-mono text-xs">
                    Training Accuracy: 94.7%
                  </div>
                </div>
              </div>
            </Container>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Container variant="danger" size="sm" title="Alert" glow>
              <div className="text-center">
                <div className="text-red-400 font-mono font-bold text-xl">
                  3
                </div>
                <div className="text-red-300 font-mono text-xs">
                  Active Threats
                </div>
              </div>
            </Container>

            <Container variant="primary" size="sm" title="Bandwidth" animated>
              <div className="text-center">
                <div className="text-cyan-400 font-mono font-bold text-xl">
                  847 MB/s
                </div>
                <div className="text-cyan-300 font-mono text-xs">
                  Network Speed
                </div>
              </div>
            </Container>

            <Container variant="neutral" size="sm" title="Storage" glass>
              <div className="text-center">
                <div className="text-gray-400 font-mono font-bold text-xl">
                  2.4 TB
                </div>
                <div className="text-gray-300 font-mono text-xs">
                  Available Space
                </div>
              </div>
            </Container>
          </div>

          <Container
            variant="primary"
            size="full"
            title="Command Center"
            subtitle="Mission Control Interface"
            padding="lg"
            animated
            glow
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="text-cyan-400 font-mono font-bold tracking-wide">
                  Navigation
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-300 font-mono">Latitude</span>
                    <span className="text-cyan-400 font-mono">40.7128° N</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-300 font-mono">Longitude</span>
                    <span className="text-cyan-400 font-mono">74.0060° W</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-300 font-mono">Altitude</span>
                    <span className="text-cyan-400 font-mono">10 m</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-cyan-400 font-mono font-bold tracking-wide">
                  Communications
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 font-mono text-sm">
                      Ground Control
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 font-mono text-sm">
                      Satellite Link
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    <span className="text-yellow-400 font-mono text-sm">
                      Emergency Beacon
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-cyan-400 font-mono font-bold tracking-wide">
                  Diagnostics
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-300 font-mono">Power Level</span>
                    <span className="text-green-400 font-mono">100%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-300 font-mono">Fuel Status</span>
                    <span className="text-yellow-400 font-mono">87%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-300 font-mono">
                      Hull Integrity
                    </span>
                    <span className="text-green-400 font-mono">Nominal</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Button Section */}
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-mono text-white tracking-wide">
            Buttons
          </h2>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setCount((count) => count + 1)}
          >
            ⚡ Count is {count}
          </Button>

          <div className="flex gap-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => console.log("Primary clicked")}
            >
              Primary
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={() => console.log("Secondary clicked")}
            >
              Secondary
            </Button>

            <Button
              variant="danger"
              size="md"
              onClick={() => console.log("Danger clicked")}
            >
              Danger
            </Button>
          </div>
        </div>

        {/* Input Components Section */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-mono text-white tracking-wide text-center mb-8">
            Input Components
          </h2>

          {/* Basic Input variants */}
          <Container variant="primary" size="full" padding="lg" glass>
            <div className="space-y-6">
              <Text variant="heading" color="primary" className="mb-4">
                Basic Inputs
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Text variant="body" color="primary">
                    Primary Input
                  </Text>
                  <Input
                    placeholder="Enter primary data..."
                    variant="primary"
                    label="System Access"
                  />
                </div>

                <div className="space-y-2">
                  <Text variant="body" color="secondary">
                    Secondary Input
                  </Text>
                  <Input
                    placeholder="Enter secondary data..."
                    variant="secondary"
                    label="User Credentials"
                  />
                </div>

                <div className="space-y-2">
                  <Text variant="body" color="success">
                    Success State
                  </Text>
                  <Input
                    placeholder="Validation successful"
                    variant="success"
                    success="Data verified successfully"
                    label="Validation Result"
                    value="DATA_VERIFIED_OK"
                  />
                </div>

                <div className="space-y-2">
                  <Text variant="body" color="danger">
                    Error State
                  </Text>
                  <Input
                    placeholder="Please correct the error"
                    variant="danger"
                    error="Invalid input format detected"
                    label="Error Status"
                    helperText="Please enter valid data"
                  />
                </div>
              </div>

              {/* Input with character count */}
              <div className="space-y-2">
                <Text variant="body" color="neutral">
                  Input with Character Limit
                </Text>
                <Input
                  placeholder="Enter message (max 100 characters)..."
                  variant="neutral"
                  label="Message Buffer"
                  maxLength={100}
                  showCharacterCount
                />
              </div>
            </div>
          </Container>

          {/* Specialized Inputs */}
          <Container variant="secondary" size="full" padding="lg" animated>
            <div className="space-y-6">
              <Text variant="heading" color="secondary" className="mb-4">
                Specialized Inputs
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Code Input */}
                <div className="space-y-4">
                  <Text variant="subheading" color="primary">
                    Access Code
                  </Text>
                  <CodeInput
                    placeholder="Enter code"
                    variant="primary"
                    maxLength={8}
                  />
                  <Text
                    variant="caption"
                    color="neutral"
                    className="text-center"
                  >
                    HEX format only
                  </Text>
                </div>

                {/* Scanner Input */}
                <div className="space-y-4">
                  <Text variant="subheading" color="secondary">
                    Biometric Scanner
                  </Text>
                  <ScannerInput
                    placeholder="Place finger on scanner"
                    variant="secondary"
                    scanDelay={3000}
                  />
                  <Text
                    variant="caption"
                    color="neutral"
                    className="text-center"
                  >
                    Click to start scan
                  </Text>
                </div>

                {/* Another Code Input variant */}
                <div className="space-y-4">
                  <Text variant="subheading" color="neutral">
                    Security Key
                  </Text>
                  <CodeInput
                    placeholder="KEY"
                    variant="neutral"
                    maxLength={6}
                  />
                  <Text
                    variant="caption"
                    color="neutral"
                    className="text-center"
                  >
                    Authorization required
                  </Text>
                </div>
              </div>
            </div>
          </Container>

          {/* Terminal Input */}
          <Container variant="primary" size="full" padding="lg" cornerAccents>
            <div className="space-y-4">
              <Text variant="heading" color="primary" className="mb-4">
                Terminal Interface
              </Text>
              <TerminalInput
                prompt="user@system:~$"
                history={[
                  "ls -la",
                  "cd documents",
                  "nano file.txt",
                  "git status",
                ]}
                onSubmit={(command) => console.log("Executed:", command)}
              />
              <Text variant="caption" color="primary" className="mt-2">
                Use ↑↓ arrows to navigate command history
              </Text>
            </div>
          </Container>
        </div>

        {/* Skeleton Components Section */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-mono text-white tracking-wide text-center mb-8">
            Skeleton Components
          </h2>

          {/* Basic Skeleton variants */}
          <Container variant="primary" size="full" padding="lg" glow>
            <div className="space-y-6">
              <Text variant="heading" color="primary" className="mb-4">
                Basic Skeletons
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Text Skeletons */}
                <div className="space-y-4">
                  <Text variant="subheading" color="primary">
                    Text Loading
                  </Text>
                  <div className="space-y-3">
                    <Skeleton
                      variant="text"
                      theme="primary"
                      animation="pulse"
                      lines={3}
                      glow
                    />
                    <Skeleton
                      variant="text"
                      theme="secondary"
                      animation="wave"
                      lines={2}
                      corners
                    />
                    <Skeleton
                      variant="text"
                      theme="neutral"
                      animation="dataStream"
                      lines={4}
                    />
                  </div>
                </div>

                {/* Avatar & Button Skeletons */}
                <div className="space-y-4">
                  <Text variant="subheading" color="secondary">
                    Elements
                  </Text>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton
                        variant="avatar"
                        theme="primary"
                        size="md"
                        glow
                      />
                      <div className="flex-1 space-y-2">
                        <Skeleton
                          variant="text"
                          theme="primary"
                          animation="pulse"
                          width="80%"
                        />
                        <Skeleton
                          variant="text"
                          theme="neutral"
                          animation="pulse"
                          width="60%"
                        />
                      </div>
                    </div>
                    <Skeleton
                      variant="button"
                      theme="secondary"
                      size="lg"
                      animation="wave"
                      corners
                    />
                    <Skeleton
                      variant="rectangle"
                      theme="danger"
                      height="40px"
                      animation="circuit"
                      glow
                    />
                  </div>
                </div>

                {/* Card Skeletons */}
                <div className="space-y-4">
                  <Text variant="subheading" color="neutral">
                    Cards & Images
                  </Text>
                  <div className="space-y-3">
                    <Skeleton
                      variant="image"
                      theme="primary"
                      height="100px"
                      animation="dataStream"
                      corners
                    />
                    <Skeleton
                      variant="card"
                      theme="secondary"
                      height="120px"
                      animation="pulse"
                      glow
                    />
                    <Skeleton
                      variant="circle"
                      theme="neutral"
                      width="60px"
                      height="60px"
                      animation="wave"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Specialized Skeleton variants */}
          <Container variant="secondary" size="full" padding="lg" animated>
            <div className="space-y-6">
              <Text variant="heading" color="secondary" className="mb-4">
                Specialized Skeletons
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Data Stream Skeleton */}
                <div className="space-y-4">
                  <Text variant="subheading" color="primary">
                    Data Stream Loading
                  </Text>
                  <div className="space-y-3">
                    <DataStreamSkeleton
                      theme="primary"
                      height="60px"
                      speed="fast"
                      density="high"
                    />
                    <DataStreamSkeleton
                      theme="secondary"
                      height="40px"
                      speed="normal"
                      density="medium"
                    />
                    <DataStreamSkeleton
                      theme="danger"
                      height="50px"
                      speed="slow"
                      density="low"
                    />
                  </div>
                </div>

                {/* Circuit Skeleton */}
                <div className="space-y-4">
                  <Text variant="subheading" color="secondary">
                    Circuit Loading
                  </Text>
                  <div className="space-y-3">
                    <CircuitSkeleton
                      theme="secondary"
                      height="80px"
                      nodes={12}
                      animated={true}
                    />
                    <CircuitSkeleton
                      theme="primary"
                      height="60px"
                      nodes={8}
                      animated={true}
                    />
                    <CircuitSkeleton
                      theme="neutral"
                      height="50px"
                      nodes={6}
                      animated={false}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Hologram Skeleton */}
                <div className="space-y-4">
                  <Text variant="subheading" color="danger">
                    Hologram Projection
                  </Text>
                  <div className="space-y-3">
                    <HologramSkeleton
                      theme="primary"
                      height="100px"
                      lines={8}
                      flicker={true}
                    />
                    <HologramSkeleton
                      theme="secondary"
                      height="80px"
                      lines={5}
                      flicker={false}
                    />
                  </div>
                </div>

                {/* Glitch Skeleton */}
                <div className="space-y-4">
                  <Text variant="subheading" color="warning">
                    System Error
                  </Text>
                  <div className="space-y-3">
                    <GlitchSkeleton
                      theme="danger"
                      height="60px"
                      intensity="high"
                    />
                    <GlitchSkeleton
                      theme="primary"
                      height="50px"
                      intensity="medium"
                    />
                    <GlitchSkeleton
                      theme="neutral"
                      height="40px"
                      intensity="low"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Skeleton Use Cases */}
          <Container variant="neutral" size="full" padding="lg" cornerAccents>
            <div className="space-y-6">
              <Text variant="heading" color="neutral" className="mb-4">
                Loading States Demo
              </Text>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Card Loading */}
                <div className="space-y-4">
                  <Text variant="subheading" color="primary">
                    User Profile Loading
                  </Text>
                  <div className="p-4 bg-black/30 rounded-lg border border-gray-700/50">
                    <div className="flex items-start gap-4">
                      <Skeleton
                        variant="avatar"
                        theme="primary"
                        size="lg"
                        glow
                      />
                      <div className="flex-1 space-y-3">
                        <Skeleton
                          variant="text"
                          theme="primary"
                          animation="wave"
                          width="70%"
                          height="20px"
                        />
                        <Skeleton
                          variant="text"
                          theme="neutral"
                          animation="pulse"
                          width="50%"
                        />
                        <div className="flex gap-2">
                          <Skeleton
                            variant="button"
                            theme="primary"
                            size="sm"
                            width="80px"
                          />
                          <Skeleton
                            variant="button"
                            theme="secondary"
                            size="sm"
                            width="80px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Table Loading */}
                <div className="space-y-4">
                  <Text variant="subheading" color="secondary">
                    Data Table Loading
                  </Text>
                  <div className="p-4 bg-black/30 rounded-lg border border-gray-700/50">
                    <div className="space-y-3">
                      <div className="grid grid-cols-4 gap-3">
                        <Skeleton
                          variant="text"
                          theme="secondary"
                          animation="pulse"
                          height="16px"
                        />
                        <Skeleton
                          variant="text"
                          theme="secondary"
                          animation="pulse"
                          height="16px"
                        />
                        <Skeleton
                          variant="text"
                          theme="secondary"
                          animation="pulse"
                          height="16px"
                        />
                        <Skeleton
                          variant="text"
                          theme="secondary"
                          animation="pulse"
                          height="16px"
                        />
                      </div>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-4 gap-3">
                          <Skeleton
                            variant="text"
                            theme="neutral"
                            animation="wave"
                            height="12px"
                          />
                          <Skeleton
                            variant="text"
                            theme="neutral"
                            animation="wave"
                            height="12px"
                          />
                          <Skeleton
                            variant="text"
                            theme="neutral"
                            animation="wave"
                            height="12px"
                          />
                          <Skeleton
                            variant="text"
                            theme="neutral"
                            animation="wave"
                            height="12px"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Switch Components Section */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-mono text-white tracking-wide text-center mb-8">
            Switch Components
          </h2>

          {/* Basic Switch variants */}
          <Container variant="primary" size="full" padding="lg" glow>
            <div className="space-y-6">
              <Text variant="heading" color="primary" className="mb-4">
                Basic Switches
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Standard switches */}
                <div className="space-y-4">
                  <Text variant="subheading" color="primary">
                    Standard Variants
                  </Text>
                  <div className="space-y-4">
                    <Switch
                      variant="primary"
                      label="Primary System"
                      defaultChecked={true}
                      glow
                      animated
                    />
                    <Switch
                      variant="secondary"
                      label="Secondary Backup"
                      powerIndicator
                      corners
                    />
                    <Switch
                      variant="danger"
                      label="Emergency Protocol"
                      glow
                      animated
                    />
                  </div>
                </div>

                {/* Different sizes */}
                <div className="space-y-4">
                  <Text variant="subheading" color="secondary">
                    Size Variants
                  </Text>
                  <div className="space-y-4">
                    <Switch
                      size="sm"
                      variant="success"
                      label="Small Control"
                      labelPosition="left"
                      defaultChecked={true}
                    />
                    <Switch
                      size="md"
                      variant="warning"
                      label="Medium Control"
                      powerIndicator
                    />
                    <Switch
                      size="lg"
                      variant="neutral"
                      label="Large Control"
                      glow
                      corners
                    />
                  </div>
                </div>

                {/* Special features */}
                <div className="space-y-4">
                  <Text variant="subheading" color="neutral">
                    Special Features
                  </Text>
                  <div className="space-y-4">
                    <Switch
                      variant="primary"
                      label="Power Indicator"
                      powerIndicator
                      glow
                      defaultChecked={true}
                    />
                    <Switch
                      variant="secondary"
                      label="Corner Accents"
                      corners
                      animated
                    />
                    <Switch
                      variant="danger"
                      label="Disabled State"
                      disabled
                      defaultChecked={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Specialized Switch variants */}
          <Container variant="secondary" size="full" padding="lg" animated>
            <div className="space-y-6">
              <Text variant="heading" color="secondary" className="mb-4">
                Specialized Switches
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Power Switches */}
                <div className="space-y-6">
                  <Text variant="subheading" color="primary">
                    Power Systems
                  </Text>
                  <div className="space-y-6">
                    <PowerSwitch
                      variant="primary"
                      label="Main Power Core"
                      powerLevel={85}
                      defaultChecked={true}
                    />
                    <PowerSwitch
                      variant="secondary"
                      label="Backup Generator"
                      powerLevel={60}
                      size="md"
                    />
                    <PowerSwitch
                      variant="danger"
                      label="Emergency Core"
                      powerLevel={95}
                      criticalMode={true}
                    />
                  </div>
                </div>

                {/* Security Switches */}
                <div className="space-y-6">
                  <Text variant="subheading" color="secondary">
                    Security Systems
                  </Text>
                  <div className="space-y-6">
                    <SecuritySwitch
                      variant="primary"
                      label="Access Control"
                      securityLevel="high"
                      defaultChecked={true}
                      scanAnimation={true}
                    />
                    <SecuritySwitch
                      variant="secondary"
                      label="Biometric Scanner"
                      securityLevel="critical"
                      size="md"
                    />
                    <SecuritySwitch
                      variant="danger"
                      label="Lockdown Protocol"
                      securityLevel="medium"
                      scanAnimation={false}
                    />
                  </div>
                </div>

                {/* Hologram Switches */}
                <div className="space-y-6">
                  <Text variant="subheading" color="neutral">
                    Hologram Systems
                  </Text>
                  <div className="space-y-6">
                    <HologramSwitch
                      variant="primary"
                      label="Holographic Display"
                      projectionLines={6}
                      defaultChecked={true}
                      flicker={true}
                    />
                    <HologramSwitch
                      variant="secondary"
                      label="3D Projection"
                      projectionLines={4}
                      size="md"
                      flicker={false}
                    />
                    <HologramSwitch
                      variant="neutral"
                      label="Interface Overlay"
                      projectionLines={8}
                      flicker={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Switch Control Panel Demo */}
          <Container variant="neutral" size="full" padding="lg" cornerAccents>
            <div className="space-y-6">
              <Text variant="heading" color="neutral" className="mb-4">
                Control Panel Demo
              </Text>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* System Controls */}
                <div className="space-y-4">
                  <Text variant="subheading" color="primary">
                    System Controls
                  </Text>
                  <div className="p-6 bg-black/30 rounded-lg border border-gray-700/50">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono text-gray-300">
                          Main Power
                        </span>
                        <PowerSwitch
                          variant="primary"
                          powerLevel={90}
                          size="sm"
                          defaultChecked={true}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono text-gray-300">
                          Life Support
                        </span>
                        <Switch
                          variant="success"
                          size="sm"
                          glow
                          defaultChecked={true}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono text-gray-300">
                          Navigation
                        </span>
                        <Switch
                          variant="primary"
                          size="sm"
                          powerIndicator
                          defaultChecked={true}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono text-gray-300">
                          Communications
                        </span>
                        <Switch variant="secondary" size="sm" animated />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Panel */}
                <div className="space-y-4">
                  <Text variant="subheading" color="secondary">
                    Security Panel
                  </Text>
                  <div className="p-6 bg-black/30 rounded-lg border border-gray-700/50">
                    <div className="space-y-6">
                      <SecuritySwitch
                        variant="danger"
                        label="Perimeter Defense"
                        securityLevel="critical"
                        size="sm"
                        defaultChecked={true}
                      />
                      <SecuritySwitch
                        variant="primary"
                        label="Access Scanner"
                        securityLevel="high"
                        size="sm"
                        scanAnimation={true}
                      />
                      <HologramSwitch
                        variant="secondary"
                        label="Tactical Display"
                        projectionLines={5}
                        size="sm"
                        defaultChecked={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Checkbox Components Section */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-mono text-white tracking-wide text-center mb-8">
            Checkbox Components
          </h2>

          {/* Basic Checkbox variants */}
          <Container variant="primary" size="full" padding="lg" glow>
            <div className="space-y-6">
              <Text variant="heading" color="primary" className="mb-4">
                Basic Checkboxes
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Standard checkboxes */}
                <div className="space-y-4">
                  <Text variant="subheading" color="primary">
                    Standard Variants
                  </Text>
                  <div className="space-y-3">
                    <Checkbox
                      variant="primary"
                      label="Primary System"
                      defaultChecked={true}
                      glow
                      animated
                    />
                    <Checkbox
                      variant="secondary"
                      label="Secondary Backup"
                      corners
                      scanlines
                    />
                    <Checkbox
                      variant="success"
                      label="System Online"
                      glow
                      defaultChecked={true}
                    />
                    <Checkbox
                      variant="danger"
                      label="Emergency Protocol"
                      checkStyle="cross"
                    />
                  </div>
                </div>

                {/* Different check styles */}
                <div className="space-y-4">
                  <Text variant="subheading" color="secondary">
                    Check Styles
                  </Text>
                  <div className="space-y-3">
                    <Checkbox
                      variant="primary"
                      label="Standard Check"
                      checkStyle="check"
                      defaultChecked={true}
                    />
                    <Checkbox
                      variant="warning"
                      label="Cross Mark"
                      checkStyle="cross"
                      defaultChecked={true}
                    />
                    <Checkbox
                      variant="neutral"
                      label="Dot Indicator"
                      checkStyle="dot"
                      defaultChecked={true}
                    />
                    <Checkbox
                      variant="secondary"
                      label="Square Fill"
                      checkStyle="square"
                      defaultChecked={true}
                    />
                  </div>
                </div>

                {/* Special states */}
                <div className="space-y-4">
                  <Text variant="subheading" color="neutral">
                    Special States
                  </Text>
                  <div className="space-y-3">
                    <Checkbox
                      variant="primary"
                      label="Indeterminate"
                      indeterminate={true}
                      glow
                    />
                    <Checkbox
                      variant="success"
                      label="With Scanlines"
                      scanlines
                      corners
                      defaultChecked={true}
                    />
                    <Checkbox
                      variant="danger"
                      label="Disabled State"
                      disabled
                      defaultChecked={true}
                    />
                    <Checkbox
                      variant="secondary"
                      label="Left Label"
                      labelPosition="left"
                      size="lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Specialized Checkbox variants */}
          <Container variant="secondary" size="full" padding="lg" animated>
            <div className="space-y-6">
              <Text variant="heading" color="secondary" className="mb-4">
                Specialized Checkboxes
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Data Checkboxes */}
                <div className="space-y-6">
                  <Text variant="subheading" color="primary">
                    Data Transfer
                  </Text>
                  <div className="space-y-6">
                    <DataCheckbox
                      variant="primary"
                      label="Download Complete"
                      downloadProgress={95}
                      defaultChecked={true}
                      dataStream={true}
                    />
                    <DataCheckbox
                      variant="secondary"
                      label="File Processing"
                      downloadProgress={67}
                      dataStream={true}
                    />
                    <DataCheckbox
                      variant="danger"
                      label="Error Recovery"
                      downloadProgress={45}
                      dataStream={false}
                      defaultChecked={true}
                    />
                  </div>
                </div>

                {/* Circuit Checkboxes */}
                <div className="space-y-6">
                  <Text variant="subheading" color="secondary">
                    Circuit Systems
                  </Text>
                  <div className="space-y-6">
                    <CircuitCheckbox
                      variant="primary"
                      label="Main Circuit"
                      nodes={8}
                      defaultChecked={true}
                      circuitAnimation={true}
                    />
                    <CircuitCheckbox
                      variant="success"
                      label="Power Grid"
                      nodes={6}
                      circuitAnimation={true}
                    />
                    <CircuitCheckbox
                      variant="secondary"
                      label="Neural Network"
                      nodes={10}
                      circuitAnimation={false}
                      defaultChecked={true}
                    />
                  </div>
                </div>

                {/* Hologram Checkboxes */}
                <div className="space-y-6">
                  <Text variant="subheading" color="neutral">
                    Hologram Display
                  </Text>
                  <div className="space-y-6">
                    <HologramCheckbox
                      variant="primary"
                      label="Primary Display"
                      projectionEffect={true}
                      defaultChecked={true}
                      flicker={true}
                    />
                    <HologramCheckbox
                      variant="secondary"
                      label="3D Interface"
                      projectionEffect={true}
                      flicker={false}
                    />
                    <HologramCheckbox
                      variant="neutral"
                      label="AR Overlay"
                      projectionEffect={false}
                      flicker={true}
                      defaultChecked={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Checkbox Form Demo */}
          <Container variant="neutral" size="full" padding="lg" cornerAccents>
            <div className="space-y-6">
              <Text variant="heading" color="neutral" className="mb-4">
                System Configuration
              </Text>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* System Settings */}
                <div className="space-y-4">
                  <Text variant="subheading" color="primary">
                    Core Systems
                  </Text>
                  <div className="p-6 bg-black/30 rounded-lg border border-gray-700/50">
                    <div className="space-y-4">
                      <Checkbox
                        variant="success"
                        label="Life Support Systems"
                        size="sm"
                        glow
                        defaultChecked={true}
                      />
                      <Checkbox
                        variant="primary"
                        label="Navigation Controls"
                        size="sm"
                        scanlines
                        corners
                        defaultChecked={true}
                      />
                      <Checkbox
                        variant="warning"
                        label="Emergency Protocols"
                        size="sm"
                        checkStyle="cross"
                      />
                      <Checkbox
                        variant="secondary"
                        label="Communication Array"
                        size="sm"
                        animated
                      />
                      <Checkbox
                        variant="neutral"
                        label="Backup Systems"
                        size="sm"
                        indeterminate={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Features */}
                <div className="space-y-4">
                  <Text variant="subheading" color="secondary">
                    Advanced Features
                  </Text>
                  <div className="p-6 bg-black/30 rounded-lg border border-gray-700/50">
                    <div className="space-y-6">
                      <DataCheckbox
                        variant="primary"
                        label="Data Sync"
                        downloadProgress={88}
                        size="sm"
                        defaultChecked={true}
                      />
                      <CircuitCheckbox
                        variant="success"
                        label="Neural Interface"
                        nodes={6}
                        size="sm"
                        circuitAnimation={true}
                        defaultChecked={true}
                      />
                      <HologramCheckbox
                        variant="secondary"
                        label="Holographic UI"
                        size="sm"
                        projectionEffect={true}
                        flicker={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-selection demo */}
              <div className="space-y-4">
                <Text variant="subheading" color="warning">
                  Mission Parameters
                </Text>
                <div className="p-6 bg-black/30 rounded-lg border border-gray-700/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Checkbox
                      variant="primary"
                      label="Stealth Mode"
                      size="sm"
                      glow
                    />
                    <Checkbox
                      variant="success"
                      label="Auto-Navigation"
                      size="sm"
                      defaultChecked={true}
                    />
                    <Checkbox
                      variant="warning"
                      label="Combat Ready"
                      size="sm"
                      checkStyle="cross"
                    />
                    <Checkbox
                      variant="secondary"
                      label="Shield Systems"
                      size="sm"
                      corners
                    />
                    <Checkbox
                      variant="danger"
                      label="Self-Destruct"
                      size="sm"
                      scanlines
                    />
                    <Checkbox
                      variant="neutral"
                      label="Data Recording"
                      size="sm"
                      indeterminate={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Popover Components Section */}
        <div className="space-y-8">
          <Container
            variant="primary"
            size="xl"
            padding="lg"
            cornerAccents
            glow
          >
            <Text variant="display" color="primary" className="mb-8">
              Popover Components
            </Text>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Basic Popovers */}
              <div className="space-y-6">
                <Text variant="heading" color="primary" className="mb-4">
                  Basic Popovers
                </Text>

                <div className="space-y-4">
                  <Popover
                    content={
                      <div className="text-sm text-gray-300">
                        This is a basic popover with futuristic styling
                      </div>
                    }
                    placement="top"
                    variant="primary"
                  >
                    <Button variant="primary" size="sm">
                      Hover Me (Top)
                    </Button>
                  </Popover>

                  <Popover
                    content={
                      <div className="text-sm text-gray-300">
                        Click trigger popover with corners and glow effects
                      </div>
                    }
                    trigger="click"
                    placement="right"
                    variant="secondary"
                    corners
                    glow
                  >
                    <Button variant="secondary" size="sm">
                      Click Me (Right)
                    </Button>
                  </Popover>

                  <Popover
                    content={
                      <div className="text-sm text-gray-300">
                        Focus-triggered popover for accessibility
                      </div>
                    }
                    trigger="focus"
                    placement="bottom"
                    variant="success"
                  >
                    <input
                      type="text"
                      placeholder="Focus me"
                      className="px-3 py-2 bg-black/50 border border-green-400/30 rounded text-white text-sm"
                    />
                  </Popover>
                </div>
              </div>

              {/* Info Popovers */}
              <div className="space-y-6">
                <Text variant="heading" color="primary" className="mb-4">
                  Info Popovers
                </Text>

                <div className="space-y-4">
                  <InfoPopover
                    title="System Information"
                    info={[
                      "CPU: 98% operational",
                      "Memory: 12.5GB available",
                      "Network: Secure connection",
                      "Status: All systems green",
                    ]}
                    placement="top"
                  >
                    <Button variant="primary" size="sm">
                      System Status
                    </Button>
                  </InfoPopover>

                  <InfoPopover
                    title="Data Analysis"
                    info="Real-time processing of quantum data streams with advanced encryption protocols"
                    placement="right"
                    trigger="click"
                  >
                    <Button variant="secondary" size="sm">
                      Data Info
                    </Button>
                  </InfoPopover>
                </div>
              </div>

              {/* Alert Popovers */}
              <div className="space-y-6">
                <Text variant="heading" color="primary" className="mb-4">
                  Alert Popovers
                </Text>

                <div className="space-y-4">
                  <AlertPopover
                    type="warning"
                    title="System Warning"
                    message="Temperature levels approaching critical threshold. Consider reducing system load."
                    placement="top"
                    trigger="click"
                    actions={
                      <Button variant="secondary" size="sm">
                        Acknowledged
                      </Button>
                    }
                  >
                    <Button variant="secondary" size="sm">
                      ⚠️ Warning
                    </Button>
                  </AlertPopover>

                  <AlertPopover
                    type="danger"
                    title="Critical Alert"
                    message="Unauthorized access detected in sector 7. Immediate response required."
                    placement="right"
                    trigger="click"
                    actions={
                      <>
                        <Button variant="secondary" size="sm">
                          Dismiss
                        </Button>
                        <Button variant="danger" size="sm">
                          Take Action
                        </Button>
                      </>
                    }
                  >
                    <Button variant="danger" size="sm">
                      🚨 Critical
                    </Button>
                  </AlertPopover>

                  <AlertPopover
                    type="success"
                    title="Mission Complete"
                    message="All objectives have been successfully completed. Data secured."
                    placement="bottom"
                    trigger="click"
                  >
                    <Button variant="primary" size="sm">
                      ✓ Success
                    </Button>
                  </AlertPopover>
                </div>
              </div>

              {/* Data Stream Popovers */}
              <div className="space-y-6">
                <Text variant="heading" color="primary" className="mb-4">
                  Data Stream
                </Text>

                <div className="space-y-4">
                  <DataStreamPopover
                    title="Network Metrics"
                    data={[
                      {
                        label: "Bandwidth",
                        value: "1.2 GB/s",
                        status: "online",
                      },
                      { label: "Latency", value: "12ms", status: "online" },
                      {
                        label: "Packet Loss",
                        value: "0.01%",
                        status: "warning",
                      },
                      { label: "Uptime", value: "99.9%", status: "online" },
                    ]}
                    streaming={true}
                    placement="right"
                    trigger="click"
                  >
                    <Button variant="primary" size="sm">
                      📊 Network
                    </Button>
                  </DataStreamPopover>

                  <DataStreamPopover
                    title="Power Systems"
                    data={[
                      { label: "Core Power", value: "89%", status: "online" },
                      { label: "Backup", value: "100%", status: "online" },
                      { label: "Solar Array", value: "45%", status: "warning" },
                    ]}
                    streaming={false}
                    placement="top"
                    trigger="hover"
                  >
                    <Button variant="secondary" size="sm">
                      ⚡ Power
                    </Button>
                  </DataStreamPopover>
                </div>
              </div>

              {/* Terminal Popovers */}
              <div className="space-y-6">
                <Text variant="heading" color="primary" className="mb-4">
                  Terminal Interface
                </Text>

                <div className="space-y-4">
                  <TerminalPopover
                    commands={[
                      "$ system --status",
                      "$ scan --deep --recursive /data",
                      "$ encrypt --quantum --level=max",
                      "$ deploy --target=remote --secure",
                    ]}
                    placement="top"
                    trigger="click"
                  >
                    <Button variant="primary" size="sm">
                      💻 Terminal
                    </Button>
                  </TerminalPopover>

                  <TerminalPopover
                    commands={[
                      "$ connect --secure --endpoint=alpha-7",
                      "$ transfer --encrypted --verify",
                      "$ logout --session=all",
                    ]}
                    prompt="admin@quantum:"
                    placement="right"
                    trigger="hover"
                  >
                    <Button variant="secondary" size="sm">
                      🔒 Admin
                    </Button>
                  </TerminalPopover>
                </div>
              </div>

              {/* Hologram Popovers */}
              <div className="space-y-6">
                <Text variant="heading" color="primary" className="mb-4">
                  Holographic
                </Text>

                <div className="space-y-4">
                  <HologramPopover
                    content={
                      <div className="text-sm text-cyan-300">
                        <div className="mb-2 text-cyan-400 font-semibold">
                          ◈ HOLOGRAPHIC DISPLAY ◈
                        </div>
                        <p>3D projection system online</p>
                        <p>Quantum resolution: MAXIMUM</p>
                        <p>Interference: MINIMAL</p>
                      </div>
                    }
                    glitchEffect={true}
                    scanlines={true}
                    placement="top"
                    trigger="click"
                  >
                    <Button variant="primary" size="sm">
                      🌀 Hologram
                    </Button>
                  </HologramPopover>

                  <HologramPopover
                    content={
                      <div className="text-sm text-cyan-300">
                        <div className="mb-2 text-cyan-400 font-semibold">
                          ◈ STABLE PROJECTION ◈
                        </div>
                        <p>Low-power holographic display</p>
                        <p>Suitable for extended operations</p>
                      </div>
                    }
                    glitchEffect={false}
                    scanlines={false}
                    placement="right"
                    trigger="hover"
                  >
                    <Button variant="secondary" size="sm">
                      ◇ Stable
                    </Button>
                  </HologramPopover>
                </div>
              </div>
            </div>
          </Container>

          {/* Popover Positioning Demo */}
          <Container variant="secondary" size="lg" padding="lg" cornerAccents>
            <Text variant="heading" color="secondary" className="mb-6">
              Positioning Showcase
            </Text>

            <div className="relative bg-black/20 rounded-lg p-16 border border-gray-700/50">
              <div className="grid grid-cols-3 gap-8 h-64">
                {/* Top row */}
                <Popover
                  content="Top-Start"
                  placement="top-start"
                  variant="primary"
                >
                  <Button variant="primary" size="sm">
                    Top-Start
                  </Button>
                </Popover>
                <Popover content="Top Center" placement="top" variant="primary">
                  <Button variant="primary" size="sm">
                    Top
                  </Button>
                </Popover>
                <Popover
                  content="Top-End"
                  placement="top-end"
                  variant="primary"
                >
                  <Button variant="primary" size="sm">
                    Top-End
                  </Button>
                </Popover>

                {/* Middle row */}
                <Popover
                  content="Left Side"
                  placement="left"
                  variant="secondary"
                >
                  <Button variant="secondary" size="sm">
                    Left
                  </Button>
                </Popover>
                <div className="flex items-center justify-center">
                  <Text variant="body" color="neutral" className="opacity-50">
                    Center
                  </Text>
                </div>
                <Popover
                  content="Right Side"
                  placement="right"
                  variant="secondary"
                >
                  <Button variant="secondary" size="sm">
                    Right
                  </Button>
                </Popover>

                {/* Bottom row */}
                <Popover
                  content="Bottom-Start"
                  placement="bottom-start"
                  variant="success"
                >
                  <Button variant="primary" size="sm">
                    Bottom-Start
                  </Button>
                </Popover>
                <Popover
                  content="Bottom Center"
                  placement="bottom"
                  variant="success"
                >
                  <Button variant="primary" size="sm">
                    Bottom
                  </Button>
                </Popover>
                <Popover
                  content="Bottom-End"
                  placement="bottom-end"
                  variant="success"
                >
                  <Button variant="primary" size="sm">
                    Bottom-End
                  </Button>
                </Popover>
              </div>
            </div>
          </Container>
        </div>

        {/* Tabs Components Section */}
        <div className="space-y-8">
          <Container
            variant="primary"
            size="full"
            padding="lg"
            cornerAccents
            glow
          >
            <Text variant="display" color="primary" className="mb-8">
              Tabs Components
            </Text>

            <div className="space-y-12">
              {/* Basic Tabs */}
              <div className="space-y-6">
                <Text variant="heading" color="primary" className="mb-4">
                  Basic Tabs
                </Text>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Horizontal Tabs */}
                  <div className="space-y-4">
                    <Text variant="subheading" color="secondary">
                      Horizontal Layout
                    </Text>
                    <Tabs
                      defaultValue="overview"
                      variant="primary"
                      glow
                      animated
                      corners
                    >
                      <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="mt-4">
                        <Container variant="neutral" padding="md">
                          <Text variant="body" color="white">
                            System overview dashboard with real-time monitoring
                            capabilities. Track all core metrics and system
                            performance indicators.
                          </Text>
                        </Container>
                      </TabsContent>

                      <TabsContent value="analytics" className="mt-4">
                        <Container variant="secondary" padding="md">
                          <Text variant="body" color="white">
                            Advanced analytics engine with predictive modeling
                            and machine learning algorithms for data analysis.
                          </Text>
                        </Container>
                      </TabsContent>

                      <TabsContent value="reports" className="mt-4">
                        <Container variant="secondary" padding="md">
                          <Text variant="body" color="white">
                            Comprehensive reporting suite with automated
                            generation and customizable templates for all data
                            insights.
                          </Text>
                        </Container>
                      </TabsContent>

                      <TabsContent value="settings" className="mt-4">
                        <Container variant="danger" padding="md">
                          <Text variant="body" color="white">
                            System configuration panel with advanced security
                            settings and administrative controls for power
                            users.
                          </Text>
                        </Container>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Vertical Tabs */}
                  <div className="space-y-4">
                    <Text variant="subheading" color="secondary">
                      Vertical Layout
                    </Text>
                    <Tabs
                      defaultValue="system"
                      variant="secondary"
                      orientation="vertical"
                      glow
                      animated
                    >
                      <div className="flex space-x-4">
                        <TabsList className="flex-col w-48">
                          <TabsTrigger value="system">
                            System Status
                          </TabsTrigger>
                          <TabsTrigger value="network">Network</TabsTrigger>
                          <TabsTrigger value="security">Security</TabsTrigger>
                          <TabsTrigger value="maintenance">
                            Maintenance
                          </TabsTrigger>
                        </TabsList>

                        <div className="flex-1">
                          <TabsContent value="system">
                            <Container variant="primary" padding="md" glass>
                              <div className="space-y-3">
                                <Text variant="subheading" color="primary">
                                  System Status
                                </Text>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      CPU Usage:
                                    </span>
                                    <span className="text-cyan-400 font-mono">
                                      73%
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Memory:
                                    </span>
                                    <span className="text-cyan-400 font-mono">
                                      6.2GB
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Uptime:
                                    </span>
                                    <span className="text-green-400 font-mono">
                                      47d 12h
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Status:
                                    </span>
                                    <span className="text-green-400 font-mono">
                                      Online
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Container>
                          </TabsContent>

                          <TabsContent value="network">
                            <Container
                              variant="secondary"
                              padding="md"
                              animated
                            >
                              <div className="space-y-3">
                                <Text variant="subheading" color="secondary">
                                  Network Status
                                </Text>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-gray-300">
                                      Primary Link: Active
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-gray-300">
                                      Backup Link: Standby
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                    <span className="text-gray-300">
                                      Satellite: Limited
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Container>
                          </TabsContent>

                          <TabsContent value="security">
                            <Container variant="danger" padding="md" scanlines>
                              <div className="space-y-3">
                                <Text variant="subheading" color="danger">
                                  Security Status
                                </Text>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Firewall:
                                    </span>
                                    <span className="text-green-400">
                                      Active
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Intrusion Detection:
                                    </span>
                                    <span className="text-green-400">
                                      Monitoring
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Last Scan:
                                    </span>
                                    <span className="text-cyan-400">
                                      2 min ago
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Threats Blocked:
                                    </span>
                                    <span className="text-red-400">
                                      47 today
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Container>
                          </TabsContent>

                          <TabsContent value="maintenance">
                            <Container
                              variant="neutral"
                              padding="md"
                              cornerAccents
                            >
                              <div className="space-y-3">
                                <Text variant="subheading" color="neutral">
                                  Maintenance
                                </Text>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Next Scheduled:
                                    </span>
                                    <span className="text-yellow-400">
                                      Sun 3:00 AM
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Last Update:
                                    </span>
                                    <span className="text-green-400">
                                      Yesterday
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">
                                      Auto-Updates:
                                    </span>
                                    <span className="text-green-400">
                                      Enabled
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Container>
                          </TabsContent>
                        </div>
                      </div>
                    </Tabs>
                  </div>
                </div>
              </div>

              {/* Specialized Tabs */}
              <div className="space-y-8">
                <Text variant="heading" color="secondary" className="mb-6">
                  Specialized Tabs
                </Text>

                {/* Holographic Tabs */}
                <div className="space-y-4">
                  <Text variant="subheading" color="primary">
                    Holographic Interface
                  </Text>
                  <HolographicTabs
                    defaultValue="projection"
                    glitchEffect={true}
                    projectionLines={true}
                    hologramFlicker={true}
                    tabs={[
                      {
                        value: "projection",
                        label: "3D Projection",
                        content: (
                          <div className="space-y-4">
                            <Text variant="body" color="primary">
                              Holographic display system initialized. Quantum
                              projection matrix active.
                            </Text>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="text-center">
                                <div className="text-cyan-400 font-mono text-lg">
                                  98%
                                </div>
                                <div className="text-cyan-300">
                                  Projection Clarity
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-cyan-400 font-mono text-lg">
                                  47ms
                                </div>
                                <div className="text-cyan-300">
                                  Response Time
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-cyan-400 font-mono text-lg">
                                  12.4kW
                                </div>
                                <div className="text-cyan-300">Power Draw</div>
                              </div>
                            </div>
                          </div>
                        ),
                      },
                      {
                        value: "interface",
                        label: "AR Interface",
                        content: (
                          <div className="space-y-4">
                            <Text variant="body" color="primary">
                              Augmented reality overlay system online. Neural
                              interface synchronized.
                            </Text>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                <span className="text-gray-300">
                                  Eye tracking: Calibrated
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                <span className="text-gray-300">
                                  Gesture recognition: Active
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                <span className="text-gray-300">
                                  Neural feedback: Connected
                                </span>
                              </div>
                            </div>
                          </div>
                        ),
                      },
                      {
                        value: "quantum",
                        label: "Quantum Field",
                        content: (
                          <div className="space-y-4">
                            <Text variant="body" color="primary">
                              Quantum field manipulation enabled. Reality
                              distortion parameters nominal.
                            </Text>
                            <div className="bg-black/50 p-4 rounded border border-cyan-500/30 font-mono text-xs">
                              <div className="text-cyan-400 mb-2">
                                QUANTUM_FIELD_STATUS:
                              </div>
                              <div className="space-y-1 text-cyan-300">
                                <div>└─ Coherence: 94.7%</div>
                                <div>└─ Entanglement: Stable</div>
                                <div>└─ Superposition: Controlled</div>
                                <div>└─ Decoherence Rate: 0.003μs⁻¹</div>
                              </div>
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>

                {/* Data Tabs */}
                <div className="space-y-4">
                  <Text variant="subheading" color="secondary">
                    Data Streaming Interface
                  </Text>
                  <DataTabs
                    defaultValue="realtime"
                    showDataStream={true}
                    realtimeUpdates={true}
                    tabs={[
                      {
                        value: "realtime",
                        label: "Real-time",
                        dataPoints: 1247,
                        status: "active",
                        content: (
                          <div className="space-y-4">
                            <Text variant="body" color="white">
                              Live data stream from multiple sensors and
                              monitoring systems.
                            </Text>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-black/50 p-3 rounded border border-purple-500/30">
                                <div className="text-purple-400 text-sm mb-2">
                                  Incoming Data Rate
                                </div>
                                <div className="text-purple-300 font-mono text-lg">
                                  847.2 KB/s
                                </div>
                              </div>
                              <div className="bg-black/50 p-3 rounded border border-purple-500/30">
                                <div className="text-purple-400 text-sm mb-2">
                                  Active Connections
                                </div>
                                <div className="text-purple-300 font-mono text-lg">
                                  23
                                </div>
                              </div>
                            </div>
                          </div>
                        ),
                      },
                      {
                        value: "historical",
                        label: "Historical",
                        dataPoints: 89431,
                        status: "success",
                        content: (
                          <div className="space-y-4">
                            <Text variant="body" color="white">
                              Historical data analysis with trend prediction and
                              pattern recognition.
                            </Text>
                            <div className="bg-black/50 p-4 rounded border border-purple-500/30">
                              <div className="text-purple-400 text-sm mb-3">
                                Data Range
                              </div>
                              <div className="grid grid-cols-3 gap-3 text-xs">
                                <div>
                                  <div className="text-purple-300">
                                    Last 24h
                                  </div>
                                  <div className="text-purple-400 font-mono">
                                    2.1M records
                                  </div>
                                </div>
                                <div>
                                  <div className="text-purple-300">Last 7d</div>
                                  <div className="text-purple-400 font-mono">
                                    14.7M records
                                  </div>
                                </div>
                                <div>
                                  <div className="text-purple-300">
                                    Last 30d
                                  </div>
                                  <div className="text-purple-400 font-mono">
                                    89.4M records
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ),
                      },
                      {
                        value: "analytics",
                        label: "Analytics",
                        dataPoints: 5623,
                        status: "loading",
                        content: (
                          <div className="space-y-4">
                            <Text variant="body" color="white">
                              Advanced analytics processing with AI-powered
                              insights and predictions.
                            </Text>
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-300">
                                  Model Training:
                                </span>
                                <span className="text-yellow-400 animate-pulse">
                                  In Progress
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-300">
                                  Accuracy Score:
                                </span>
                                <span className="text-green-400">94.7%</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-300">
                                  Predictions:
                                </span>
                                <span className="text-purple-400">
                                  5,623 generated
                                </span>
                              </div>
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>

                {/* Terminal Tabs */}
                <div className="space-y-4">
                  <Text variant="subheading" color="success">
                    Terminal Interface
                  </Text>
                  <TerminalTabs
                    defaultValue="main"
                    showPrompt={true}
                    terminalTheme="green"
                    tabs={[
                      {
                        value: "main",
                        label: "main.sys",
                        prompt: "root@quantum:~$",
                        status: "connected",
                        content: (
                          <div className="space-y-2">
                            <div className="text-green-300">
                              <span className="text-green-400">
                                root@quantum:~$
                              </span>{" "}
                              system --status
                            </div>
                            <div className="text-green-300 ml-4">
                              System Status: ████████████████████ 100% [ONLINE]
                            </div>
                            <div className="text-green-300 ml-4">
                              All subsystems operational. No errors detected.
                            </div>
                            <div className="text-green-300">
                              <span className="text-green-400">
                                root@quantum:~$
                              </span>{" "}
                              ps aux | grep neural
                            </div>
                            <div className="text-green-300 ml-4">
                              neural 1247 0.8 12.3 2847392 128456 ? Ssl 14:23
                              0:47 /usr/bin/neural-net
                            </div>
                          </div>
                        ),
                      },
                      {
                        value: "monitoring",
                        label: "monitor.sys",
                        prompt: "monitor$",
                        status: "connected",
                        content: (
                          <div className="space-y-2">
                            <div className="text-green-300">
                              <span className="text-green-400">monitor$</span>{" "}
                              tail -f /var/log/system.log
                            </div>
                            <div className="text-green-300 ml-2 text-xs space-y-1">
                              <div>
                                [14:45:23] INFO: Neural network sync complete
                              </div>
                              <div>
                                [14:45:24] INFO: Quantum coherence at 98.7%
                              </div>
                              <div>
                                [14:45:25] WARN: Memory usage approaching 85%
                              </div>
                              <div>[14:45:26] INFO: Auto-scaling initiated</div>
                              <div>
                                [14:45:27] INFO: Additional resources allocated
                              </div>
                              <div className="animate-pulse">
                                [14:45:28] INFO: System optimization complete
                              </div>
                            </div>
                          </div>
                        ),
                      },
                      {
                        value: "debug",
                        label: "debug.sys",
                        prompt: "debug>>",
                        status: "error",
                        content: (
                          <div className="space-y-2">
                            <div className="text-red-400">
                              <span className="text-red-500">
                                debug&gt;&gt;
                              </span>{" "}
                              analyze --deep --sector=7
                            </div>
                            <div className="text-red-400 ml-4 text-xs">
                              ERROR: Access denied - Insufficient clearance
                              level
                            </div>
                            <div className="text-red-400 ml-4 text-xs">
                              Required: LEVEL_9_QUANTUM | Current:
                              LEVEL_7_STANDARD
                            </div>
                            <div className="text-yellow-400">
                              <span className="text-red-500">
                                debug&gt;&gt;
                              </span>{" "}
                              permissions --request --escalate
                            </div>
                            <div className="text-yellow-400 ml-4 text-xs">
                              Request submitted. Awaiting authorization...
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>

                {/* Circuit Tabs */}
                <div className="space-y-4">
                  <Text variant="subheading" color="neutral">
                    Circuit Control Interface
                  </Text>
                  <CircuitTabs
                    defaultValue="power"
                    showCircuits={true}
                    animateCircuits={true}
                    tabs={[
                      {
                        value: "power",
                        label: "Power Grid",
                        circuitActive: true,
                        powerLevel: 89,
                        content: (
                          <div className="space-y-4">
                            <Text variant="body" color="white">
                              Primary power distribution network monitoring and
                              control.
                            </Text>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="text-cyan-400 text-sm">
                                  Main Power
                                </div>
                                <div className="bg-cyan-500/20 rounded-full h-2">
                                  <div
                                    className="bg-cyan-400 h-2 rounded-full"
                                    style={{ width: "89%" }}
                                  />
                                </div>
                                <div className="text-cyan-300 text-xs">
                                  89% - Nominal
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="text-cyan-400 text-sm">
                                  Backup Systems
                                </div>
                                <div className="bg-cyan-500/20 rounded-full h-2">
                                  <div
                                    className="bg-cyan-400 h-2 rounded-full"
                                    style={{ width: "100%" }}
                                  />
                                </div>
                                <div className="text-cyan-300 text-xs">
                                  100% - Ready
                                </div>
                              </div>
                            </div>
                          </div>
                        ),
                      },
                      {
                        value: "networking",
                        label: "Network Hub",
                        circuitActive: true,
                        powerLevel: 94,
                        content: (
                          <div className="space-y-4">
                            <Text variant="body" color="white">
                              Network infrastructure and data routing control
                              systems.
                            </Text>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-300">
                                  Active Connections:
                                </span>
                                <span className="text-cyan-400 font-mono">
                                  247
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-300">
                                  Data Throughput:
                                </span>
                                <span className="text-cyan-400 font-mono">
                                  1.2 GB/s
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-300">
                                  Network Latency:
                                </span>
                                <span className="text-green-400 font-mono">
                                  12ms
                                </span>
                              </div>
                            </div>
                          </div>
                        ),
                      },
                      {
                        value: "processing",
                        label: "CPU Matrix",
                        circuitActive: false,
                        powerLevel: 67,
                        content: (
                          <div className="space-y-4">
                            <Text variant="body" color="white">
                              Central processing unit cluster management and
                              load balancing.
                            </Text>
                            <div className="bg-black/50 p-4 rounded border border-cyan-500/30">
                              <div className="text-yellow-400 text-sm mb-2 flex items-center">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />
                                Maintenance Mode Active
                              </div>
                              <div className="text-gray-300 text-xs">
                                CPU cluster undergoing routine optimization.
                                Estimated completion: 5 minutes.
                              </div>
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>

              {/* Hover vs Click Activator Demo */}
              <div className="space-y-6">
                <Text variant="heading" color="warning" className="mb-4">
                  Activation Methods
                </Text>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Text variant="subheading" color="warning">
                      Click Activation
                    </Text>
                    <Tabs
                      defaultValue="tab1"
                      variant="warning"
                      activator="click"
                      glow
                    >
                      <TabsList>
                        <TabsTrigger value="tab1">Click Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Click Tab 2</TabsTrigger>
                        <TabsTrigger value="tab3">Click Tab 3</TabsTrigger>
                      </TabsList>

                      <TabsContent value="tab1" className="mt-4">
                        <Container variant="secondary" padding="md">
                          <Text variant="body" color="white">
                            This tab requires clicking to activate. More precise
                            control for important actions.
                          </Text>
                        </Container>
                      </TabsContent>

                      <TabsContent value="tab2" className="mt-4">
                        <Container variant="secondary" padding="md">
                          <Text variant="body" color="white">
                            Click activation prevents accidental tab switches
                            during navigation.
                          </Text>
                        </Container>
                      </TabsContent>

                      <TabsContent value="tab3" className="mt-4">
                        <Container variant="secondary" padding="md">
                          <Text variant="body" color="white">
                            Perfect for forms, settings panels, and critical
                            system controls.
                          </Text>
                        </Container>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="space-y-4">
                    <Text variant="subheading" color="success">
                      Hover Activation
                    </Text>
                    <Tabs
                      defaultValue="hover1"
                      variant="success"
                      activator="hover"
                      glow
                    >
                      <TabsList>
                        <TabsTrigger value="hover1">Hover Tab 1</TabsTrigger>
                        <TabsTrigger value="hover2">Hover Tab 2</TabsTrigger>
                        <TabsTrigger value="hover3">Hover Tab 3</TabsTrigger>
                      </TabsList>

                      <TabsContent value="hover1" className="mt-4">
                        <Container variant="secondary" padding="md">
                          <Text variant="body" color="white">
                            This tab activates on hover. Quick preview without
                            clicking required.
                          </Text>
                        </Container>
                      </TabsContent>

                      <TabsContent value="hover2" className="mt-4">
                        <Container variant="secondary" padding="md">
                          <Text variant="body" color="white">
                            Hover activation provides instant feedback and
                            faster navigation.
                          </Text>
                        </Container>
                      </TabsContent>

                      <TabsContent value="hover3" className="mt-4">
                        <Container variant="secondary" padding="md">
                          <Text variant="body" color="white">
                            Ideal for dashboards, previews, and quick
                            information browsing.
                          </Text>
                        </Container>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Modal Section */}
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-mono text-white tracking-wide">
            Modals
          </h2>

          <div className="flex gap-4 flex-wrap justify-center">
            <Button variant="primary" onClick={primaryModal.open}>
              Open Primary Modal
            </Button>

            <Button variant="secondary" onClick={secondaryModal.open}>
              Open Secondary Modal
            </Button>

            <Button variant="danger" onClick={dangerModal.open}>
              Open Danger Modal
            </Button>

            <Button variant="primary" size="sm" onClick={confirmModal.open}>
              Confirmation Dialog
            </Button>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <Modal
        isOpen={primaryModal.isOpen}
        onClose={primaryModal.close}
        title="System Status"
        variant="primary"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 font-mono">
              All systems operational
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-mono">
              Neural network active
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-400 font-mono">
              Quantum processors online
            </span>
          </div>

          <div className="mt-6 p-4 border border-cyan-400/30 bg-cyan-900/10">
            <p className="text-cyan-100 font-mono text-sm">
              Welcome to the future interface. All systems are running at
              optimal performance. You can monitor system status and manage
              resources from this control panel.
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="primary" size="sm" onClick={primaryModal.close}>
              Acknowledge
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={secondaryModal.isOpen}
        onClose={secondaryModal.close}
        title="Data Analysis"
        variant="secondary"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border border-purple-400/30 bg-purple-900/10 text-center">
              <div className="text-2xl font-mono text-purple-400 font-bold">
                847
              </div>
              <div className="text-purple-300 text-sm">Active Connections</div>
            </div>
            <div className="p-4 border border-pink-400/30 bg-pink-900/10 text-center">
              <div className="text-2xl font-mono text-pink-400 font-bold">
                99.7%
              </div>
              <div className="text-pink-300 text-sm">Efficiency Rate</div>
            </div>
            <div className="p-4 border border-purple-400/30 bg-purple-900/10 text-center">
              <div className="text-2xl font-mono text-purple-400 font-bold">
                2.4TB
              </div>
              <div className="text-purple-300 text-sm">Data Processed</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-mono">
              <span className="text-purple-300">Processing Power</span>
              <span className="text-purple-400">87%</span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-[87%] animate-pulse" />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={secondaryModal.close}
            >
              Close
            </Button>
            <Button variant="secondary" size="sm">
              Export Data
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={dangerModal.isOpen}
        onClose={dangerModal.close}
        title="⚠️ Security Alert"
        variant="danger"
        size="md"
      >
        <div className="space-y-4">
          <div className="p-4 border border-red-400/50 bg-red-900/20">
            <p className="text-red-400 font-mono text-sm font-bold">
              UNAUTHORIZED ACCESS DETECTED
            </p>
            <p className="text-red-300 font-mono text-xs mt-2">
              Multiple failed login attempts from IP: 192.168.1.XXX
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-red-300 font-mono">Threat Level:</span>
              <span className="text-red-400 font-mono font-bold">HIGH</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-red-300 font-mono">Time Detected:</span>
              <span className="text-red-400 font-mono">14:32:15 UTC</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-red-300 font-mono">Actions Required:</span>
              <span className="text-orange-400 font-mono">Immediate</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="danger" size="sm" onClick={dangerModal.close}>
              Dismiss
            </Button>
            <Button variant="danger" size="sm">
              Initiate Lockdown
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.close}
        title="Confirm Action"
        variant="primary"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-300 font-mono text-sm">
            Are you sure you want to proceed with this operation? This action
            cannot be undone.
          </p>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="secondary" size="sm" onClick={confirmModal.close}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmAction}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
