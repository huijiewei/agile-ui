import { AxeResults, configure, ImpactValue, Result, run, RunOptions, Spec } from 'axe-core';
import { matcherHint, mount, printReceived } from './utils';
import { merge } from 'lodash-es';
import chalk from 'chalk';

export type AxeConfigureOptions = RunOptions & { globalOptions?: Spec };

export const configureAxe = (options: AxeConfigureOptions = {}) => {
  const { globalOptions = {}, ...runnerOptions } = options;

  configure(globalOptions);

  return (html: string | HTMLElement, additionalOptions = {}) => {
    const [element, restore] = mount(html);
    const options = merge({}, runnerOptions, additionalOptions);

    return new Promise((resolve) => {
      run(element, options, (err, results) => {
        restore();

        if (err) {
          throw err;
        }

        resolve(results);
      });
    });
  };
};

export const axe = configureAxe();

const filterViolations = (violations: Result[], impactLevels: ImpactValue[]) => {
  if (impactLevels && impactLevels.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return violations.filter((v) => impactLevels.includes(v.impact!));
  }

  return violations;
};

export const toHaveNoViolations = {
  toHaveNoViolations(results: AxeResults) {
    if (typeof results.violations === 'undefined') {
      throw new Error('No violations found in aXe results object');
    }

    const violations = filterViolations(
      results.violations,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      results.toolOptions ? (results as any).toolOptions.impactLevels : []
    );

    const reporter = (violations: Result[]) => {
      if (violations.length === 0) {
        return [];
      }

      const lineBreak = '\n\n';
      const horizontalLine = '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500';

      return violations
        .map((violation) => {
          return violation.nodes
            .map((node) => {
              const selector = node.target.join(', ');
              const expectedText = `Expected the HTML found at $('${selector}') to have no violations:` + lineBreak;
              return (
                expectedText +
                chalk.grey(node.html) +
                lineBreak +
                `Received:` +
                lineBreak +
                printReceived(`${violation.help} (${violation.id})`) +
                lineBreak +
                chalk.yellow(node.failureSummary) +
                lineBreak +
                (violation.helpUrl
                  ? `You can find more information on this issue here: \n${chalk.blue(violation.helpUrl)}`
                  : '')
              );
            })
            .join(lineBreak);
        })
        .join(lineBreak + horizontalLine + lineBreak);
    };

    const formattedViolations = reporter(violations);
    const pass = formattedViolations.length === 0;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const message: () => string = () => {
      if (pass) {
        return;
      }
      return matcherHint('.toHaveNoViolations') + '\n\n' + `${formattedViolations}`;
    };

    return { actual: violations, message, pass };
  },
};
