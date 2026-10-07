import React from 'react';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

export interface SchemaOrgProps {
  type?: 'Global' | 'WebSite' | 'WebApplication' | 'Article' | 'AboutPage' | 'ContactPage' | 'WebPage';
  title?: string;
  description?: string;
  url?: string;
  datePublished?: string;
  dateModified?: string;
}

export default function SchemaOrg({
  type = 'Global',
  title = `${SITE_NAME} — Social Video & Media Downloader`,
  description = SITE_DESCRIPTION,
  url = SITE_URL,
  datePublished,
  dateModified,
}: SchemaOrgProps) {
  const schemas: Record<string, unknown>[] = [];

  if (type === 'Global') {
    // Only RootLayout emits Organization and WebSite globally once
    schemas.push(
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/favicon-512.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/favicon-512.png`,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: ['SaveNexa', 'SaveNexa Video Downloader', 'SaveNexa Media Downloader'],
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      }
    );
  } else if (type === 'WebApplication') {
    schemas.push({
      '@type': 'WebApplication',
      '@id': `${url}/#webapp`,
      name: title,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description,
      url,
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
    });
  } else if (type === 'Article') {
    schemas.push({
      '@type': 'Article',
      '@id': `${url}/#article`,
      headline: title,
      description,
      image: `${SITE_URL}/og-image.png`,
      url,
      datePublished: datePublished || '2026-01-01T00:00:00Z',
      dateModified: dateModified || new Date().toISOString(),
      mainEntityOfPage: url,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    });
  } else if (type === 'AboutPage' || type === 'ContactPage' || type === 'WebPage' || type === 'WebSite') {
    schemas.push({
      '@type': type === 'WebSite' ? 'WebPage' : type,
      '@id': `${url}/#webpage`,
      name: title,
      description,
      url,
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
    });
  }

  if (schemas.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': schemas,
        }),
      }}
    />
  );
}
