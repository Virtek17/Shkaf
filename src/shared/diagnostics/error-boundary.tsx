import { Component, type ReactNode } from 'react';
import { FailureState } from '../ui/failure-state';
import { logDiagnostic } from './logger';

export class AppErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { logDiagnostic('render-failed', { category: 'render' }); }
  render() {
    if (this.state.failed) return <FailureState title="Не удалось показать экран" message="Попробуйте открыть его заново." onRetry={() => this.setState({ failed: false })} />;
    return this.props.children;
  }
}

