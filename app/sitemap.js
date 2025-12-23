const WORDPRESS_API_URL = 'https://primary-production-bf78.up.railway.app/wp-json/wp/v2';

export default async function sitemap() {
  const currentDate = new Date().toISOString();
  
  // Static URLs
  const staticUrls = [
    {
      url: 'https://middler.com/',
      lastModified: currentDate,
      priority: 1.00,
    },
    {
      url: 'https://middler.com/blog',
      lastModified: currentDate,
      priority: 0.80,
    },
    {
      url: 'https://middler.com/interior-painting-cost-calculator',
      lastModified: currentDate,
      priority: 0.90,
    },
    {
      url: 'https://middler.com/exterior-painting-cost-calculator',
      lastModified: currentDate,
      priority: 0.90,
    },
    {
      url: 'https://middler.com/paint-estimator',
      lastModified: currentDate,
      priority: 0.80,
    },
    {
      url: 'https://middler.com/contact-us',
      lastModified: currentDate,
      priority: 0.50,
    },
    {
      url: 'https://middler.com/privacy-policy',
      lastModified: currentDate,
      priority: 0.50,
    },
    {
      url: 'https://middler.com/terms-of-service',
      lastModified: currentDate,
      priority: 0.50,
    }
  ];

  // Fetch blog posts for dynamic URLs
  let blogUrls = [];
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?per_page=100`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const posts = await response.json();
      blogUrls = posts.map(post => ({
        url: `https://middler.com/blog/${post.slug}`,
        lastModified: post.modified || post.date,
        priority: 0.70,
      }));
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [...staticUrls, ...blogUrls];
}