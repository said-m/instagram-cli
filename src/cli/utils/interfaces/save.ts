import { InputInterface } from 'iods';
import { PostInterface } from '../../../lib/utils/interfaces';

export type SaveInputInterface = InputInterface<
  PostInterface,
  SaveSettingsInterface
>;

export interface SaveSettingsInterface {
  fileName: string;
  dirPath: string;
}
