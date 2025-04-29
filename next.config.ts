import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // Allow any path from picsum.photos
      },
       // Add other allowed image domains here if needed
    ],
  },
   // Allow specific video domains if needed for mock data or external sources
   // Note: This doesn't directly affect <video> tags like next/image,
   // but it's good practice to keep track of external media sources.
   // For actual video hosting, use a dedicated service (like Firebase Storage, Cloudinary, AWS S3).
   experimental: {
     // Example: If using external video URLs in development
     // serverComponentsExternalPackages: ['@my-video-package'], // If using a library
   },
   // Add domains for media if necessary, primarily affects next/image but good documentation
   // images: { domains: ['sample-videos.com'] } // Already defined above, just noting context
};

export default nextConfig;
```