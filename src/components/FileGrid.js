// src/components/FileGrid.js
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { fetchImages } from '../utils/data';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card } from 'antd';

const FileGrid = () => {
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const uniqueIdsRef = useRef(new Set()); 

    const loadImages = useCallback(async () => {
        const newImages = await fetchImages(page);
        if (newImages.length === 0) {
            setHasMore(false);
        } else {
            const filteredNewImages = newImages.filter(image => {
                if (uniqueIdsRef.current.has(image.id)) {
                    return false; // Skip if ID already exists
                } else {
                    uniqueIdsRef.current.add(image.id); // Add unique ID
                    return true; // Keep the image
                }
            });
            setImages((prevImages) => [...prevImages, ...filteredNewImages]);
        }
    }, [page]);

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    return (
        <InfiniteScroll
            dataLength={images.length}
            next={() => setPage((prev) => prev + 1)}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            <div className="grid">
                {images.map((image) => (
                    <Card
                        key={image.id} // Ensure this ID is unique
                        hoverable
                        cover={<img alt={image.alt_description} src={image.urls.small} />}
                    >
                        <Card.Meta title={image.alt_description || 'No Description'} />
                    </Card>
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default FileGrid;
