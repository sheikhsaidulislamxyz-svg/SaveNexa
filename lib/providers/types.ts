import { MediaResult, MediaErrorResult } from '../types';

export interface MediaProvider {
  id: string;
  name: string;
  match(url: URL): boolean;
  analyze(url: URL, signal: AbortSignal): Promise<MediaResult | MediaErrorResult>;
}
