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
  // El tema por defecto es light en AnimusX
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    containerRef.current!.innerHTML = '';

    const a = document.createElement('a');
    a.className = 'twitter-timeline';
    a.dataset.theme = theme;
    a.dataset.tweetLimit = maxTweets.toString();
    a.dataset.chrome = 'noheader nofooter noborders transparent';
    a.dataset.linkColor = linkColor;
    a.href = `https://twitter.com/${handle}`;
    a.innerText = `Tweets by @${handle}`;
    
    containerRef.current!.appendChild(a);

    const loadTwitter = () => {
      // @ts-expect-error twttr is injected by the script
      if (window.twttr) {
        // @ts-expect-error twttr is injected by the script
        window.twttr.widgets.load(containerRef.current);
        return;
      }
      
      if (!document.getElementById('twitter-wjs')) {
        const script = document.createElement('script');
        script.id = 'twitter-wjs';
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        // @ts-expect-error twttr is injected by the script
        script.onload = () => window.twttr?.widgets?.load(containerRef.current);
        document.body.appendChild(script);
      }
    };
    
    loadTwitter();
  }, [handle, theme, maxTweets, linkColor]);

  return (
    <div ref={containerRef} className="w-full min-h-[400px]">
      {/* Loading state before twitter widget loads */}
      <div className="flex h-32 items-center justify-center font-mono text-sm text-animus-cyan animate-pulse">
        Sincronizando red neuronal @{handle}...
      </div>
    </div>
  );
}
