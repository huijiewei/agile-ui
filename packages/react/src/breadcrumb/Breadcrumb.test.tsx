import { describe, expect, test } from 'vitest';
import { screen, testA11y, testRender } from '@agile-ui/test-utils';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';

describe('Breadcrumb', () => {
  test('passes a11y test', async () => {
    await testA11y(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem currentPage>
          <BreadcrumbLink>Link 3</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    );
  });

  test('has the proper aria-attributes', () => {
    testRender(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem currentPage>
          <BreadcrumbLink>Link 3</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    );

    screen.getByLabelText('breadcrumb', { selector: 'nav' });

    const currentPageLink = screen.getByText('Link 3');
    expect(currentPageLink).toHaveAttribute('aria-current', 'page');

    expect(screen.getAllByRole('presentation')).toHaveLength(2);
  });

  test('separator can be changed', () => {
    testRender(
      <Breadcrumb separator="-">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getAllByText('-')).toHaveLength(1);
  });

  test('breadcrumb link has its href attribute correctly set', () => {
    testRender(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem currentPage>
          <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    );
    const breadcrumbLink = screen.getByText('Link 1');
    expect(breadcrumbLink.getAttribute('href')).toBe('#');
  });

  test("current page link doesn't have href attribute set", () => {
    testRender(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Link 1</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem currentPage>
          <BreadcrumbLink href="#">Link 2</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    );
    const currentPageLink = screen.getByText('Link 2');
    expect(currentPageLink.getAttribute('href')).toBe(null);
  });
});
