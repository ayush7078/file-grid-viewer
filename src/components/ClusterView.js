// React component to display clustered images
import React, { useEffect, useState } from 'react';
import { fetchClusteredImages } from '../utils/data'; // Ensure the correct path to data.js
import { Card } from 'antd';

const ClusterView = ({ filter }) => {
    const [clusters, setClusters] = useState({});

    useEffect(() => {
        const loadClusters = async () => {
            const data = await fetchClusteredImages();
            console.log("Fetched Clusters:", data); // Log fetched clusters
            setClusters(data);
        };
        loadClusters();
    }, []);

    const matchesObjectFilter = (image, cluster) => {
        if (!Array.isArray(filter) || filter.length === 0) return true; // Show all if no filter
        if (!image.alt_description) return false; // Skip images without a description

        const altDescription = image.alt_description?.toLowerCase();
        const clusterLower = cluster.toLowerCase(); // Get the cluster name in lowercase
       
        // Check if the cluster name matches any of the filters
        const categoryMatch = filter.some(obj => clusterLower.includes(obj.toLowerCase()));

        // Check if the alt_description matches any of the filters
        const descriptionMatch = altDescription && filter.some(obj => altDescription.includes(obj.toLowerCase()));

        console.log(`Image: ${image.alt_description}, Cluster: ${cluster}, Matches Filter: ${descriptionMatch || categoryMatch}`); // Debug output
        return descriptionMatch || categoryMatch; // Return true if either matches
    };

    return (
        <div>
            {Object.entries(clusters).map(([cluster, images]) => {
                if (!images || !Array.isArray(images)) return null;

                const filteredImages = images.filter(image => matchesObjectFilter(image, cluster));
                console.log(`Filtered Images for ${cluster}:`, filteredImages); // Log filtered images

                if (filteredImages.length === 0 && filter.length > 0) return null; // Only skip if there's a filter

                return (
                    <div key={cluster}>
                        <h2>{cluster}</h2>
                        <div className="grid">
                            {filteredImages.map((image) => (
                                <Card 
                                    key={image.id} 
                                    hoverable 
                                    cover={<img alt={image.alt_description} src={image.urls.small} />}
                                >
                                    <Card.Meta title={image.alt_description || 'No Description'} />
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ClusterView;