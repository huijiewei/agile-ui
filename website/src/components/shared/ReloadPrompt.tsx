import { Alert, AlertDescription, Animation, Button, Portal } from '@agile-ui/react';

import { useRegisterSW } from 'virtual:pwa-register/react';

export const ReloadPrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
  });

  const handleReload = async () => {
    await updateServiceWorker(true);
  };

  const handleClose = () => {
    setNeedRefresh(false);
  };

  return (
    <Portal>
      <Animation show={needRefresh} className={'fixed z-50 right-5 bottom-5 shadow-md'}>
        <Alert className={'flex-col items-start p-4 gap-3'} variant={'outline'} color={'gray'}>
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
      </Animation>
    </Portal>
  );
};
