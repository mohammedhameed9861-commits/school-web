"use client";

import Script from "next/script";

import { publicEnv } from "@/env";
import { useCookieStore } from "@/components/common/Cookie";

/**
 * Loads Google Analytics (consent: analytics) and the Meta Pixel (consent:
 * marketing) only after the visitor has opted in via the cookie banner, and
 * only when the corresponding env var is configured. Renders nothing itself.
 */
export const AnalyticsScripts = () => {
  const hydrated = useCookieStore((s) => s.hydrated);
  const consent = useCookieStore((s) => s.consent);

  if (!hydrated || !consent) return null;

  return (
    <>
      {consent.analytics && publicEnv.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${publicEnv.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${publicEnv.NEXT_PUBLIC_GA_ID}');`}
          </Script>
        </>
      )}

      {consent.marketing && publicEnv.NEXT_PUBLIC_FB_PIXEL_ID && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${publicEnv.NEXT_PUBLIC_FB_PIXEL_ID}');
            fbq('track', 'PageView');`}
        </Script>
      )}
    </>
  );
};
