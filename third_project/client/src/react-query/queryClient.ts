import { QueryClient } from '@tanstack/react-query';
// import { createStandaloneToast } from '@chakra-ui/react';
// import { theme } from '../theme';

// const toast = createStandaloneToast({ theme });

/**
 * 에러 핸들러 및 기타 추가할 초기값들을 독립적인 파일로 분리
 */

// function queryErrorHandler(error: unknown): void {
//   // error is type unknown because in js, anything can be an error (e.g. throw(5))
//   const title =
//     error instanceof Error ? error.message : 'error connecting to server';

//   // prevent duplicate toasts
//   toast.closeAll();
//   toast({ title, status: 'error', variant: 'subtle', isClosable: true });
// }

// to satisfy typescript until this file has uncommented contents
export const queryClient = new QueryClient();
