import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface TwitterFeedProps {
  handle?: string;
  maxTweets?: number;
  linkColor?: string;
}

export function TwitterFeed({
  handle = 'Ubicypher',
  maxTweets = 10,
  linkColor = '#00CFCF'
}: TwitterFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    if (containerRef.current) {
      containerRef.current.innerHTML = `<a
        class="twitter-timeline"
        data-theme="${theme}"
        data-tweet-limit="${maxTweets}"
        data-chrome="noheader nofooter noborders transparent"
        data-link-color="${linkColor}"
        href="https://x.com/${handle}?ref_src=twsrc%5Etfw"
      >
        Tweets by @${handle}
      </a>`;
    }

    const renderWidget = () => {
      if (isCancelled) return;
      // @ts-expect-error window.twttr
      if (window.twttr && window.twttr.widgets) {
        setIsLoading(true);
        // @ts-expect-error window.twttr
        window.twttr.widgets.load(containerRef.current).then(() => {
          if (!isCancelled) setIsLoading(false);
        });
      }
    };

    const loadTwitter = () => {
      if (document.getElementById('twitter-wjs')) {
        renderWidget();
        return;
      }
      
      const script = document.createElement('script');
      script.id = 'twitter-wjs';
      script.src = 'https://platform.x.com/widgets.js';
      script.async = true;
      script.onload = () => {
        if (!isCancelled) renderWidget();
      };
      document.head.appendChild(script);
    };

    loadTwitter();

    return () => {
      isCancelled = true;
    };
  }, [handle, theme, maxTweets, linkColor]);

  return (
    <div className="w-full min-h-[400px] relative">
      <div 
        ref={containerRef} 
        className="w-full relative z-10 transition-opacity duration-500"
        style={{ opacity: isLoading ? 0 : 1 }}
      ></div>
      {/* Fallback loader behind the widget */}
      {isLoading && (
        <div className="absolute inset-0 flex h-32 items-center justify-center font-mono text-sm text-animus-cyan animate-pulse z-0 -mt-8">
          SYS.SYNC:// RED_NEURONAL @{handle}...
        </div>
      )}
    </div>
  );
}

