import { Alert, AlertDescription, Button, Motion, Portal } from '@agile-ui/react';

import { useRegisterSW } from 'virtual:pwa-register/react';
import { AnimatePresence } from 'framer-motion';

export const ReloadPrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const handleReload = async () => {
    await updateServiceWorker(true);
  };

  const handleClose = () => {
    setNeedRefresh(false);
  };

  return (
    <Portal>
      <AnimatePresence>
        {needRefresh && (
          <Motion className={'fixed right-5 bottom-5 z-50 shadow-md'}>
            <Alert className={'flex-col items-start gap-3 p-4'} variant={'outline'} color={'gray'}>
              <AlertDescription className={'text-lg'}>新内容可用，单击重新加载按钮进行更新。</AlertDescription>
              <div className={'flex gap-2'}>
                <Button onClick={handleReload} size={'sm'}>
                  重新加载
                </Button>
                <Button size={'sm'} onClick={handleClose} variant={'outline'} color={'gray'}>
                  关闭
                </Button>
              </div>
            </Alert>
          </Motion>
        )}
      </AnimatePresence>
    </Portal>
  );
};
