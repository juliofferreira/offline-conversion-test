import { adsVariables } from './variables.js';
import { GoogleAdsApi } from 'google-ads-api';

async function main() {
	const client = new GoogleAdsApi({
		client_id: adsVariables.client_id,
		client_secret: adsVariables.client_secret,
		developer_token: adsVariables.developer_token,
	});

	const refreshToken = adsVariables.refresh_token;

	const customers = await client.listAccessibleCustomers(refreshToken);
	console.log(customers);
}

main();
