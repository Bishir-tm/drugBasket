import { HealthboxClient, HealthboxCountry, HealthboxLanguage } from '@flushbg/myhealthbox-sdk';

export const client = new HealthboxClient({
   apiKey: '120b92b74cmsha4a1c332ac01dd5p12d348jsn539af1adfca3',
   defaultCountry: HealthboxCountry.USA,
   defaultLanguage: HealthboxLanguage.English
});

