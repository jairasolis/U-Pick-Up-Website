import React from 'react';

const useAuth = () => {
    let user;
    const _user = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    const id = localStorage.getItem('studentId');

    if (_user) {
        user = JSON.parse(_user);
        // console.log('user', user);
    }

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        localStorage.removeItem('studentId');
    };

    if (user) {
        return {
            auth: true,
            role: user.role,
            token: token,
            id: id,
            logout: logout
        };
    } else {
        return {
            auth: false,
            role: null,
            token: null,
            id: null,
            logout: logout
        };
    }
};

export default useAuth;
