import { createContext, useState, useEffect, ReactNode, FC, useContext, useCallback } from 'react';
import axios from 'axios';

interface AuthContextValue {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    checkAdmin: () => Promise<void>;
    isAdmin: boolean;
    userRole: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token')); //  Инициализируем token из localStorage
    const [isAdmin, setIsAdmin] = useState(false);
    const [userRole, setUserRole] = useState('user');

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const logout = useCallback(() => { // Добавили useCallback
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setIsAdmin(false);
        setUserRole('user');
    }, []); // Добавили зависимости для useCallback

    const checkAdmin = useCallback(async () => {
        if (!token) {
            setIsAdmin(false);
            return;
        }
    
        try {
            const response = await axios.get('http://127.0.0.1/myApiLaravel/my-app/public/api/user', {
                headers: { Authorization: `Bearer ${token}` } //  Обязательно обратные кавычки!
            });
    
            const role = response.data.role;  //  Теперь role - это строка
    
            const isAdmin = role === 'admin'; //  Сравниваем строку role напрямую с 'admin'
    
            setIsAdmin(isAdmin);
            setUserRole(role); //  Просто сохраняем role
            localStorage.setItem('userRole', role);
    
        } catch (error) {
            console.error("Error checking admin:", error);
            setIsAdmin(false);
            setUserRole('user');

            if (error.response) {
                console.error("Server Error:", error.response.status, error.response.data); // Логируем ошибку сервера
                if (error.response.status === 401) {
                  logout(); // Вызываем logout() при 401 ошибке
                
                } else if (error.response.status === 429) {
                    alert("Too many requests. Please try again later.");
                } else {
                    // Для всех остальных ошибок
                    alert(error.response.data.message || "Server error");
                }
            
            }  else if (error.request) {
                console.log("Network error:", error.request)
                alert("Network error")
            }
            else {
                console.log(error.message)
                alert(error.message)
            }
        }
    }, [token, logout]); // Добавили зависимости для useCallback


    useEffect(() => {
        if (token) {
        checkAdmin();
        } else {
        // Если token null (например, после logout), сбросить isAdmin
            setIsAdmin(false)
            setUserRole("user")
        }

    }, [token, checkAdmin]);


    const value = { token, login, logout, checkAdmin: checkAdmin, isAdmin, userRole }; // checkAdmin без debounce
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


export { AuthProvider, useAuth };