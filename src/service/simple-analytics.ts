import fs from 'fs';
import { google } from 'googleapis';

export default class AnalyticsService {
  private analytics: any;
  private propertyId: string;

  constructor(propertyId: string, credentialsPath: string) {
    this.propertyId = propertyId;
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    this.analytics = google.analyticsdata({
      version: 'v1beta',
      auth,
    });
  }

  /**
   * Get all-time unique visitors
   */
  async getUniqueVisitors(): Promise<number> {
    try {
      console.log('getting visitors...')
      const response = await this.analytics.properties.runReport({
        property: `properties/${this.propertyId}`,
        requestBody: {
          dateRanges: [{ startDate: '2016-01-01', endDate: 'today' }],
          metrics: [{ name: 'totalUsers' }],
        },
      });
      
      const visitors = response.data.rows?.[0]?.metricValues?.[0]?.value;

      await fs.writeFileSync('response.json', JSON.stringify(response.data, null, 2));

      return visitors ? parseInt(visitors, 10) : 0;
    } catch (error) {
      console.error('❌ Failed to fetch unique visitors:', error);
      return 0;
    }
  }
}
