const API_KEY = "live_pEjR3hqF2TWbuVoZZB7Sy5RV0jXLTWmCQJuLi1R2Tl7u4dGQ3gT5DS20MNb1eT8Z";
const BASE_URL = "https://api.thedogapi.com/v1/";
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'x-api-key': API_KEY
}

export const getImagesByBreed = async (breedId: string) => {
    try {
        const response = await fetch(`${BASE_URL}images/search?limit=5&breed_ids=${breedId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch')
        }
        return await response.json();
    } catch(error) {
        return { error: 'Failed to fetch images' };
    }
}

export const getAllBreeds = async () => {
    const data = await fetch(`${BASE_URL}breeds`);
    return await data.json();
}

export const getImageDetails = async (id: string) => {
    const data = await fetch(`${BASE_URL}images/${id}`);
    return await data.json();
}

export const getSetOfImages = async (path: string) => {
    return await fetch(`${BASE_URL}${path}`, {
        headers: headers
    });
}