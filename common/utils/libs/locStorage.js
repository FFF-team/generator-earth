export const supportLocalStorage = (function () {
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
})();

const supportSessionStorage = (function () {
    const test = 'test';
    try {
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
})();

export const locStorage = {
    set: function (key, value) {
        if (supportLocalStorage) {
            localStorage.setItem(key, value);
        } else if (supportSessionStorage) {
            sessionStorage.setItem(key, value);
        }
    },
    get: function (key) {
        if (supportLocalStorage) {
            return localStorage.getItem(key);
        } else if (supportSessionStorage) {
            return sessionStorage.getItem(key);
        }
    },
    removeItem: function (key) {
        if (supportLocalStorage) {
            return localStorage.removeItem(key);
        } else if (supportSessionStorage) {
            return sessionStorage.removeItem(key);
        }
    },
    isSupport: function (key) {
        return supportLocalStorage || supportSessionStorage;
    }
};
