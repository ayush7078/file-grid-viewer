import axios from 'axios';

const ACCESS_KEY = 'YaAA0hPwNoumqwRlu5YSkzLRK15qzWOd5D5QEV4TdTA';

export const fetchImages = async (page = 1, perPage = 20) => {
    const response = await axios.get(
        `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&client_id=${ACCESS_KEY}`
    );
    return response.data;
};

// Function to fetch images based on search keywords
export const fetchClusteredImages = async () => {
    const categories = [
        'vehicles', 'people', 'nature', 'architecture', 
        'food', 'sports', 'technology', 'travel', 
        'animals', 'fashion', 'art'
    ];
    
    const allImages = {};

    for (const category of categories) {
        const response = await axios.get(
            `https://api.unsplash.com/search/photos`, {
                params: {
                    query: category,
                    page: 1,  // You can modify the page and per_page as needed
                    per_page: 30, // Adjust the number of images per category as needed
                    client_id: ACCESS_KEY,
                },
            }
        );

        allImages[category] = response.data.results; // Store images under the respective category
    }

    return allImages; // Return the grouped images
};
