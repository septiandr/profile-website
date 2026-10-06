"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="w-full min-h-[400px] flex items-center justify-center p-8 bg-[#faf9f6] text-zinc-950 font-sans">
          <div className="max-w-md p-6 bg-white border border-zinc-200 rounded-lg shadow-lg text-center space-y-4">
            <div className="text-3xl">⚠️</div>
            <h2 className="text-xl font-bold font-display uppercase tracking-tight">Something went wrong</h2>
            <p className="text-xs text-zinc-600 font-sans leading-relaxed">
              {this.state.error?.message || "An unexpected error occurred while rendering this section."}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-5 py-2.5 bg-blue-600 text-white rounded font-sans text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
