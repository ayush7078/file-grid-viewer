import React, { useState } from 'react';
import { Layout, Menu, Input } from 'antd';
import { HashRouter  as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import FileGrid from './components/FileGrid'; // Adjust the path as necessary
import ClusterView from './components/ClusterView';
import './App.css';

const { Header, Content } = Layout;

const App = () => {
    const [filter, setFilter] = useState([]);
    const location = useLocation(); // Get the current location

    const menuItems = [
        {
            key: 'files',
            label: <Link to="/">Files View</Link>,
        },
        {
            key: 'clusters',
            label: <Link to="/clusters">Cluster View</Link>,
        },
    ];

    const handleFilterChange = (e) => {
        const value = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
        setFilter(value);
    };

    // Determine the selected key based on the current location
    const selectedKey = location.pathname === '/clusters' ? 'clusters' : 'files';

    return (
        <Layout>
            <Header>
                <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} items={menuItems} />
            </Header>
            <Content style={{ padding: '20px' }}>
                {location.pathname === '/clusters' && ( // Show filter only for Cluster View
                    <Input
                        placeholder="Search for Images"
                        onChange={handleFilterChange}
                        style={{ marginBottom: '20px', width: '300px' }}
                    />
                )}
                <Routes>
                    <Route path="/" element={<FileGrid />} />
                    <Route path="/clusters" element={<ClusterView filter={filter} />} />
                </Routes>
            </Content>
        </Layout>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
