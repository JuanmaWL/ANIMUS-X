import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    // Clear container
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      
      const a = document.createElement('a');
      a.className = 'twitter-timeline';
      a.dataset.theme = theme;
      a.dataset.tweetLimit = maxTweets.toString();
      a.dataset.chrome = 'noheader nofooter noborders transparent';
      a.dataset.linkColor = linkColor;
      a.href = `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`;
      a.innerText = `Tweets by @${handle}`;
      
      containerRef.current.appendChild(a);

      const loadTwitter = () => {
        // @ts-expect-error twttr is injected by script
        if (window.twttr && window.twttr.widgets) {
          // @ts-expect-error twttr is injected by script
          window.twttr.widgets.load(containerRef.current);
          return;
        }
        
        if (!document.getElementById('twitter-wjs')) {
          const script = document.createElement('script');
          script.id = 'twitter-wjs';
          script.src = 'https://platform.twitter.com/widgets.js';
          script.async = true;
          // @ts-expect-error twttr is injected by script
          script.onload = () => window.twttr?.widgets?.load(containerRef.current);
          document.body.appendChild(script);
        }
      };
      
      loadTwitter();
    }
  }, [handle, theme, maxTweets, linkColor]);

  return (
    <div className="w-full min-h-[400px] relative">
      <div 
        ref={containerRef} 
        className="w-full relative z-10"
      ></div>
      {/* Fallback loader behind the widget */}
      <div className="absolute inset-0 flex h-32 items-center justify-center font-mono text-sm text-animus-cyan animate-pulse z-0 -mt-8">
        SYS.SYNC:// RED_NEURONAL @{handle}...
      </div>
    </div>
  );
}

