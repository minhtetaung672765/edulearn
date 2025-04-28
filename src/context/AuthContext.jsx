import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // const login = (userData) => {
    //     setUser(userData);
    //     localStorage.setItem('user', JSON.stringify(userData));
    //     localStorage.setItem('token', userData.access);  // Save JWT token separately
    // };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
                email,
                password
            });

            const { access, refresh } = response.data;
            localStorage.setItem('token', access);

            // ✅ Fetch user profile now
            const profileResponse = await axios.get('http://127.0.0.1:8000/api/auth/profile/', {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            });

            const userProfile = profileResponse.data;

            const userData = {
                token: access,
                refreshToken: refresh,
                user: userProfile, // Save name, email, role
            };

            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
