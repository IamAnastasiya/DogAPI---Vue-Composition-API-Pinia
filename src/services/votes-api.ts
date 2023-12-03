const API_KEY = "live_pEjR3hqF2TWbuVoZZB7Sy5RV0jXLTWmCQJuLi1R2Tl7u4dGQ3gT5DS20MNb1eT8Z";
const BASE_URL = "https://api.thedogapi.com/v1/";
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'x-api-key': API_KEY
}

export const getAllVotes = async (userId: string) => {
    return await fetch(`${BASE_URL}votes?api_key=${API_KEY}&sub_id=${userId}`);
}

export const getRandomImage = async () => {
    return await fetch(`${BASE_URL}images/search`);
}

export const sendImageVote = async (imageData: {image_id: string, sub_id: string, value: number}) => {
    let response = await fetch(`${BASE_URL}votes`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(imageData)
    });
    await response.json();
}