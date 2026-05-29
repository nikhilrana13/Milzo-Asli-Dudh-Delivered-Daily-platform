import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "Application Error:",
      error,
      errorInfo
    );
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
          <div className="w-full max-w-md rounded-[32px] border border-red-100 bg-white p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

            {/* Icon */}
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <span className="text-4xl">
                ⚠️
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold text-[#0f172a]">
              Something went wrong
            </h1>

            {/* Description */}
            <p className="mt-3 text-sm text-gray-500">
              An unexpected error occurred while
              loading this page.
            </p>

            {/* Error Message */}
            {process.env.NODE_ENV ===
              "development" && (
              <div className="mt-5 rounded-xl bg-gray-50 p-3 text-left text-xs text-red-600">
                {this.state.error?.message}
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full rounded-2xl bg-[#047857] py-3 font-semibold text-white transition hover:bg-[#065f46]"
              >
                Reload Page
              </button>

              <button
                onClick={() =>
                  window.history.back()
                }
                className="w-full rounded-2xl border border-gray-200 py-3 font-semibold text-gray-700"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;