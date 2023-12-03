const API_KEY = "live_pEjR3hqF2TWbuVoZZB7Sy5RV0jXLTWmCQJuLi1R2Tl7u4dGQ3gT5DS20MNb1eT8Z";
const BASE_URL = "https://api.thedogapi.com/v1/";

export const sendNewImage = async (file: File, sub_id: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sub_id", sub_id || "");
    let response = await fetch(`${BASE_URL}images/upload`, {
        method: 'POST',
        headers: {
            'x-api-key': API_KEY
        },
        body: formData
    });

    return response;
}