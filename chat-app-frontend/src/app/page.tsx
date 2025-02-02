import { GChatLogo } from "@/assets/image-exporter";
import DashboardPage from "../components/contacts/page";
import RegisterUser from "./register/page";
import LoginPage from "./login/page";

export default function Home() {
  return (
    <div>
      <header>
        <title>Chat me</title>
        <meta
          name="description"
          content="Explore Praveen Kumar R's web development portfolio, showcasing projects built with React, Next.js, and more. Contact for collaborations and inquiries."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph (OG) Meta Tags for Social Sharing */}
        <meta
          property="og:title"
          content="Praveen Kumar R | Web Developer Portfolio"
        />
        <meta
          property="og:description"
          content="Showcasing web development projects, featuring React, Next.js, and modern technologies."
        />

        <meta property="og:image" content="/path-to-social-image.jpg" />
        <meta property="og:url" content="https://your-domain.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Praveen Kumar R | Web Developer Portfolio"
        />
        <meta
          name="twitter:description"
          content="Web development projects built with cutting-edge technologies."
        />
        <meta name="twitter:image" content="/path-to-twitter-image.jpg" />

        {/* <link rel="icon" href="../../public/g-chat-logo.png" /> */}

        {/* google font - material symbol rounded */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        {/* Google fonts - Plus Jakarta sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </header>

      <DashboardPage />
      {/* <RegisterUser /> */}
      {/* <LoginPage /> */}
    </div>
  );
}
