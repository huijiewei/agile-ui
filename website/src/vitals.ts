import type { Metric } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

export const sendToVercelAnalytics = (metric: Metric) => {
  const analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

  if (!analyticsId) {
    return;
  }

  const body = {
    dsn: analyticsId,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed:
      'connection' in navigator && navigator.connection && 'effectiveType' in navigator.connection
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          navigator['connection']['effectiveType']
        : '',
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: 'application/x-www-form-urlencoded',
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    }).then(() => {});
};
