import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
    username: string;
    email: string;
    image?: string;
}

const Home: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            const parsedUser = JSON.parse(user);
            setUserData(parsedUser);
        } catch (error) {
            console.error('Error parsing user data:', error);
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-container">
            <div className="profile-card">
                <h2>Welcome, {userData.username}!</h2>
                {userData.image && (
                    <div className="profile-image">
                        <img 
                            src={userData.image} 
                            alt={`${userData.username}'s profile`}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/150';
                            }}
                        />
                    </div>
                )}
                <div className="user-details">
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
            <style>{`
                .home-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f5f5f5;
                    padding: 20px;
                }
                .profile-card {
                    background: white;
                    padding: 2rem;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    max-width: 400px;
                    width: 100%;
                }
                .profile-image {
                    margin: 20px 0;
                }
                .profile-image img {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid #3498db;
                }
                .user-details {
                    margin: 20px 0;
                    text-align: left;
                }
                .logout-button {
                    background-color: #e74c3c;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .logout-button:hover {
                    background-color: #c0392b;
                }
            `}</style>
        </div>
    );
};

export default Home;