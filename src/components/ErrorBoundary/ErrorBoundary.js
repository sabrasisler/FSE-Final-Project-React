import React, { Component } from 'react';
import { LandingView } from '../../views';
import { GenericError } from '../../components';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <LandingView
          content={
            <div>
              <h3>Oooops! Something went wrong.</h3>
            </div>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
