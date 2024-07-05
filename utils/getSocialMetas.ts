

import bscImage from "./assets/blacksheep_fb_wide.webp";


export function getSocialMetas({
    url,
    title = 'Helping people make the world a better place through quality software',
    description = 'Make the world better with software',
    image = bscImage.src,
    keywords = '',
  }: {
    image?: string
    url: string
    title?: string
    description?: string
    keywords?: string
  }) {
    return {
      title,
      description,
      keywords,
      image,
      'og:url': url,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'twitter:card': image ? 'summary_large_image' : 'summary',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:alt': title,
    }
  }