import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getMatchRoutes } from './routes';

export const AppHelmet = () => {
  const location = useLocation();
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const title = getMatchRoutes(location)
      .map((match) => {
        return match.title || '';
      })
      .filter((title) => title != '')
      .join(' - ');

    setTitle(title);
  }, [location]);

  return (
    <>
      <Helmet title={title} defaultTitle={'Agile UI'} titleTemplate={'%s - Agile UI'} />
      <Helmet titleTemplate={`%s - ${title} - Agile UI`} />
    </>
  );
};
