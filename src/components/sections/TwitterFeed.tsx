import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
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
  const { resolvedTheme } = useTheme();
  // El tema por defecto es light en AnimusX
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <div className="w-full min-h-[400px]">
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={handle}
        theme={theme as 'light' | 'dark'}
        noHeader
        noFooter
        noBorders
        transparent
        options={{ tweetLimit: maxTweets, linkColor }}
        key={`${handle}-${theme}`} // Force re-render when handle or theme changes
        placeholder={
          <div className="flex h-32 items-center justify-center font-mono text-sm text-animus-cyan animate-pulse">
            Sincronizando red neuronal @{handle}...
          </div>
        }
      />
    </div>
  );
}
