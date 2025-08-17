import { analyticsdata_v1beta, google } from 'googleapis';

export default class HitCounterService {

    private analytics: analyticsdata_v1beta.Analyticsdata;

    constructor(env: Env) {
        this.analytics = this.initAnalyticsClient(env);
    }
    /**
     * Initialize the Google Analytics API client
     * @param env - The environment variables
     * @returns The Google Analytics API client
     */
    initAnalyticsClient = (env: Env) => {
        if (!env.GA_CREDENTIALS) {
            throw new Error('Credentials are required');
        }
  
        const auth = new google.auth.GoogleAuth({
            keyFile: env.GA_CREDENTIALS,
            scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
        });

        const analytics = google.analyticsdata({
            version: 'v1beta',
            auth
        }) as ReturnType<typeof google.analyticsdata>;

        return analytics;
    }

    /**
     * Get all-time unique visitors
     */
    async getUniqueVisitors(env: Env): Promise<number> {

        const cachedVisitorCount = await env.HIT_COUNTER_KV.get('uniqueVisitors');
        if (cachedVisitorCount) {
            return parseInt(cachedVisitorCount);
        }

        try {
            const response = await this.analytics.properties.runReport({
                property: `properties/${env.GA4_PROPERTY_ID}`,
                requestBody: {
                    dateRanges: [{ startDate: '2016-01-01', endDate: 'today' }],
                    metrics: [{ name: 'totalUsers' }],
                },
            });

            console.log('result', response);

            const visitors = response.data.rows?.[0]?.metricValues?.[0]?.value;
            

            if (env.HIT_COUNTER_KV && visitors !== null) {
                await env.HIT_COUNTER_KV.put('uniqueVisitors', visitors ?? '0', {
                    expirationTtl: 86400, // 1 day
                });
            }
            return visitors ? parseInt(visitors) : 0;
        } catch (error) {
            console.error('❌ Failed to fetch unique visitors:', error);
            return 0;
        }
    }
}