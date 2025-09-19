// Import CSS for the library
import "./index.css";

// Basic components with default exports
export { default as Button } from "./components/Button";
export { default as Checkbox } from "./components/Checkbox";
export { default as Container } from "./components/Container";
export { default as Input } from "./components/Input";
export { default as Loader } from "./components/Loader";
export { default as Modal } from "./components/Modal";
export { default as Popover } from "./components/Popover";
export { default as Skeleton } from "./components/Skeleton";
export { default as Switch } from "./components/Switch";
export { default as Tabs, TabsList, TabsTrigger, TabsContent } from "./components/Tabs";
export { default as Text } from "./components/Text";

// Hooks
export { default as useModal } from "./hooks/useModal";

// AnimatedText component (named export)
export { GlitchText } from "./components/AnimatedText";

// Specialized components (named exports)
export { 
  DataCheckbox, 
  CircuitCheckbox, 
  HologramCheckbox 
} from "./components/SpecializedCheckboxes";

export { 
  CodeInput,
  TerminalInput,
  ScannerInput 
} from "./components/SpecializedInputs";

export { 
  CircuitLoader,
  HolographicLoader,
  DataStreamLoader,
  ProgressLoader 
} from "./components/SpecializedLoaders";

export { 
  InfoPopover,
  AlertPopover,
  HologramPopover,
  DataStreamPopover,
  TerminalPopover 
} from "./components/SpecializedPopovers";

export { 
  DataStreamSkeleton,
  CircuitSkeleton,
  HologramSkeleton,
  GlitchSkeleton 
} from "./components/SpecializedSkeletons";

export { 
  PowerSwitch,
  SecuritySwitch,
  HologramSwitch 
} from "./components/SpecializedSwitches";

export { 
  HolographicTabs,
  DataTabs,
  TerminalTabs,
  CircuitTabs 
} from "./components/SpecializedTabs";
