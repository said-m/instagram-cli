import { Writable } from 'stream';

export type GetMediaOutputInterface = Array<
Promise<GetMediaItemInterface | undefined>
> | undefined;

export interface GetMediaItemInterface {
stream: Writable;
extension: string;
}
