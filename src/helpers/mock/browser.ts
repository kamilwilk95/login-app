
import { setupWorker } from 'msw';
import { UserMockApi } from './user.api.mock';

export const worker = setupWorker(
    ...UserMockApi.getHandlers()
)