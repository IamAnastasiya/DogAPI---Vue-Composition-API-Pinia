const API_KEY = "live_pEjR3hqF2TWbuVoZZB7Sy5RV0jXLTWmCQJuLi1R2Tl7u4dGQ3gT5DS20MNb1eT8Z";
const BASE_URL = "https://api.thedogapi.com/v1/";
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'x-api-key': API_KEY
}

export const getAllFavorites = async (userId: string) => {
    const response = await fetch(`${BASE_URL}favourites?sub_id=${userId}`, {
        headers: headers
    });
    if (!response.ok) {
        return {hasError: true};
    } else {
        return await response.json();
    }
}

export const addToApiFavorites = async (imageData: {image_id: string, sub_id: string}) => {
    let newFavourite = await fetch(`${BASE_URL}favourites`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(imageData)
    });
    return await newFavourite.json();          
}

export const deleteFromApiFavorites = async (favId: number) => {
    const data = await fetch(`https://api.thedogapi.com/v1/favourites/${favId}`, {
        method: 'DELETE',
        headers: headers
    });
    return data;         
}