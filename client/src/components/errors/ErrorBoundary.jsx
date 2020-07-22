import React from "react";

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error) {
    // handling exception
    return { hasError: true }
  }

  componentDidCatch(err, info) {
    /*
    * err: content of the error
    * info: component which throws the error
    */
    console.log(err);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div> // show this page when error occurs
    }

    return this.props.children;
  }
}

export default React.memo(ErrorBoundary);