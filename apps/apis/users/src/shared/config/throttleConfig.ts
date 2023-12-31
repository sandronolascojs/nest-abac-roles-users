import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const throttleConfig: ThrottlerModuleOptions = {
  ttl: 60,
  limit: 30,
  ignoreUserAgents: [
    // Don't throttle request that have 'googlebot' defined in them.
    // Example user agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
    /googlebot/gi,

    // Don't throttle request that have 'bingbot' defined in them.
    // Example user agent: Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)
    new RegExp('bingbot', 'gi'),
  ],
};
