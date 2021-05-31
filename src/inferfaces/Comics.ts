interface ComicsProps {
	title: string,
	thumbnail: { path: string, extension: string },
	description: string,
	textObject: { type: string, language: string, text: string },
	isbn: string,
	creators: { available: number, collectionURI: string, items: [{ name: string, resourceURI: string, role: string }] },
	id: number
}

export default ComicsProps;
