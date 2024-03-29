import { Component, ReactElement } from 'react';

import type { RunnerOptions, Scope } from '../util/running';
import { generateElement } from '../util/running';

export type RunnerProps = RunnerOptions & {
  onRendered?: (error?: Error) => void;
};

type RunnerState = {
  element: ReactElement | null;
  error: Error | null;
  prevCode: string | null;
  prevScope: Scope | undefined;
};

export class Runner extends Component<RunnerProps, RunnerState> {
  state: RunnerState = {
    element: null,
    error: null,
    prevCode: null,
    prevScope: undefined,
  };

  static getDerivedStateFromProps(props: RunnerProps, state: RunnerState): Partial<RunnerState> | null {
    if (state.prevCode === props.code && state.prevScope === props.scope) {
      return null;
    }

    try {
      return {
        element: generateElement(props),
        error: null,
        prevCode: props.code,
        prevScope: props.scope,
      };
    } catch (error: unknown) {
      return {
        element: null,
        error: error as Error,
        prevCode: props.code,
        prevScope: props.scope,
      };
    }
  }

  static getDerivedStateFromError(error: Error): Partial<RunnerState> {
    return { error };
  }

  componentDidMount() {
    this.props.onRendered?.(this.state.error || undefined);
  }

  shouldComponentUpdate(nextProps: RunnerProps, nextState: RunnerState) {
    return (
      nextProps.code !== this.props.code || nextProps.scope !== this.props.scope || nextState.error !== this.state.error
    );
  }

  componentDidUpdate() {
    this.props.onRendered?.(this.state.error || undefined);
  }

  render() {
    return this.state.error ? null : this.state.element;
  }
}
