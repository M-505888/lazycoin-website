
export default async function handler(request, response) {
    const ASSET_ID = '6p5Ej1f3G8DT7bjL6iW2Uqnhh5pRfzgPof9iCkf6BAGS';
    const BAGS_API_URL = `https://public-api-v2.bags.fm/api/v1/assets/${ASSET_ID}`;
    const API_KEY = process.env.BAGS_API_KEY;

    if (!API_KEY) {
        return response.status(500).json({ error: 'Server misconfiguration: API Key missing' });
    }

    try {
        const apiResponse = await fetch(BAGS_API_URL, {
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json',
            },
        });

        if (!apiResponse.ok) {
            return response.status(apiResponse.status).json({ error: 'Failed to fetch from Bags.fm' });
        }

        const data = await apiResponse.json();

        // Set Cache-Control to be lazy (cache for 1 hour)
        response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

        return response.status(200).json(data);

    } catch (error) {
        return response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
