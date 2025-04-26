async function getAlbumDetails(artist, album) {
	const query = `artist:${artist} AND release:${album}`;
	const url = `https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(query)}&fmt=json`;

	try {
		// Fetch release data with a custom User-Agent
		const response = await fetch(url, {
			headers: {
				'User-Agent': 'mikestreety/1.0 ( mikestreety@gmail.com )'
			}
		});
		const data = await response.json();
		const releases = data.releases;

		if (releases && releases.length > 0) {
			const release = releases[0]; // Take the first matching release
			console.log(release);
			const releaseId = release.id; // Get the Release ID
			// const releaseDate = release.date?.split('-'); // Get the release date
			const year = release.date; // Extract the year

			// Construct cover art URL
			const coverArtUrl = `https://coverartarchive.org/release/${releaseId}/front-500`;

			return {
				year: year,
				coverArtUrl: coverArtUrl
			};
		} else {
			console.log('No release found');
			return null;
		}
	} catch (error) {
		console.error('Error fetching album details:', error.message);
		return null;
	}
}

// Example usage
getAlbumDetails('Taylor Swift', 'Evermore').then(details => {
	if (details) {
		console.log('Details:', details);
	}
});
