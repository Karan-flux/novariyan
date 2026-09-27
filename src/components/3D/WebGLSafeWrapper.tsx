import React, {
  Component,
  ErrorInfo,
  ReactNode,
  useEffect,
  useState,
} from 'react';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  public componentDidCatch(
    error: Error,
    errorInfo: ErrorInfo,
  ): void {
    if (import.meta.env.DEV) {
      console.warn(
        '3D WebGL fallback activated:',
        error,
        errorInfo,
      );
    }
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const updatePreference = () => {
      setReduced(mediaQuery.matches);
    };

    updatePreference();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener(
        'change',
        updatePreference,
      );

      return () => {
        mediaQuery.removeEventListener(
          'change',
          updatePreference,
        );
      };
    }

    mediaQuery.addListener(updatePreference);

    return () => {
      mediaQuery.removeListener(updatePreference);
    };
  }, []);

  return reduced;
}

export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');

    const webgl2 = canvas.getContext('webgl2');

    if (webgl2) {
      return true;
    }

    const webgl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');

    return Boolean(webgl);
  } catch {
    return false;
  }
}

interface WebGLSafeWrapperProps {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
}

export const WebGLSafeWrapper: React.FC<
  WebGLSafeWrapperProps
> = ({
  children,
  fallback,
  className = '',
}) => {
  const [supported, setSupported] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);

  // Avoid attempting to mount Three.js until the browser
  // capability check has completed.
  if (supported === null) {
    return (
      <div
        className={className}
        aria-hidden="true"
      >
        <div className="w-full h-full" />
      </div>
    );
  }

  if (!supported) {
    return (
      <div className={className}>
        {fallback}
      </div>
    );
  }

  return (
    <div className={className}>
      <ThreeErrorBoundary fallback={fallback}>
        {children}
      </ThreeErrorBoundary>
    </div>
  );
};
