import { ProviderExtractor } from './types';
import { InstagramProviderExtractor } from './providers/instagram';
import { TikTokProviderExtractor } from './providers/tiktok';
import { FacebookProviderExtractor } from './providers/facebook';
import { TwitterProviderExtractor } from './providers/twitter';
import { RedditProviderExtractor } from './providers/reddit';
import { PinterestProviderExtractor } from './providers/pinterest';
import { GenericMediaProviderExtractor } from './providers/generic';

const PROVIDERS: ProviderExtractor[] = [
  new TikTokProviderExtractor(),
  new InstagramProviderExtractor(),
  new FacebookProviderExtractor(),
  new TwitterProviderExtractor(),
  new RedditProviderExtractor(),
  new PinterestProviderExtractor(),
  new GenericMediaProviderExtractor(),
];

export function findExtractorForUrl(url: URL): ProviderExtractor | null {
  for (const provider of PROVIDERS) {
    if (provider.canHandle(url)) {
      return provider;
    }
  }
  return null;
}

export function getAllSupportedProviders(): { id: string; name: string }[] {
  return PROVIDERS.map((p) => ({ id: p.id, name: p.name }));
}
