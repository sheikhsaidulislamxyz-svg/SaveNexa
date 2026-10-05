import React from 'react';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

interface SchemaOrgProps {
  type?: 'WebSite' | 'WebApplication' | 'Article' | 'FAQPage';
  title?: string;
  description?: string;
  url?: string;
  faqs?: { question: string; answer: string }[];
  datePublished?: string;
  dateModified?: string;
}

export default function SchemaOrg({
  type = 'WebSite',
  title = `${SITE_NAME} — Social Video & Media Downloader`,
  description = SITE_DESCRIPTION,
  url = SITE_URL,
  faqs,
  datePublished,
  dateModified,
}: SchemaOrgProps) {
  const schemas: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: ['SaveNexa Media Tools', 'SaveNexa Video Downloader'],
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    },
  ];

  if (type === 'WebApplication') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
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
    });
  }

  if (faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas.length === 1 ? schemas[0] : { '@context': 'https://schema.org', '@graph': schemas }),
      }}
    />
  );
}
