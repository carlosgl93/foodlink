import { useRegisterSW } from 'virtual:pwa-register/react';
function SW() {
  const {
    //eslint-disable-next-line
    offlineReady: [_offlineReady, _setOfflineReady],
    //eslint-disable-next-line
    needRefresh: [_needRefresh, _setNeedRefresh],
  } = useRegisterSW();

  return null;
}

export default SW;
