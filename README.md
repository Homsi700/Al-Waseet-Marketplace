# Al-Waseet Marketplace

This is a Next.js application designed as an intermediary marketplace connecting sellers and buyers.

## Core Features:

- **Customer View:** Browse products across various categories. View product details and seller contact information for direct communication.
- **Seller View (Authenticated):** Log in to manage products. Sellers can list up to 50 products, each with up to 3 images and one optional 10-second video. Product details include name, description, condition, location, contact number, and price in both USD and SYP.

## Getting Started:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) (or the specified port) in your browser.

3.  **Build for Production:**
    ```bash
    npm run build
    ```
4.  **Start Production Server:**
    ```bash
    npm run start
    ```

## Technology Stack:

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ShadCN UI Components
- Lucide Icons

## Compatibility:

- Designed to be responsive for web browsers.
- **Android Compatibility:** While this is a web application, if packaged as an Android app (e.g., using a WebView wrapper like Capacitor or PWA), it should target **Android 10 (API level 29) and above** due to modern web features and dependencies.

## Key Files:

- `src/app/page.tsx`: The main landing page with Customer/Seller choices.
- `src/app/browse/`: Customer browsing routes (categories and products).
- `src/app/product/[productId]/page.tsx`: Individual product details page.
- `src/app/seller/`: Seller-specific routes (login, dashboard, add/edit product).
- `src/components/`: Reusable UI components.
- `src/components/seller/`: Seller-specific form components.
- `src/app/globals.css`: Global styles and Tailwind CSS/ShadCN theme configuration.
- `tailwind.config.ts`: Tailwind CSS configuration.
- `next.config.ts`: Next.js configuration.

## Placeholder Data:

The application currently uses mock data for products and categories located within the page components (`src/app/browse/`, `src/app/product/`, `src/app/seller/`). Replace this with actual database fetching logic (e.g., using Firebase Firestore, Supabase, or another backend).

## Authentication:

Seller authentication logic in `src/components/seller/seller-login-form.tsx` is currently simulated. Implement a secure authentication mechanism (e.g., Firebase Auth, NextAuth.js). Seller credentials should be managed by the application administrator.

## Media Storage:

Image and video uploads in `src/components/seller/add-product-form.tsx` and `src/components/seller/edit-product-form.tsx` are simulated. Integrate a cloud storage solution (like Firebase Storage, AWS S3, Cloudinary) to handle file uploads and retrievals.
```