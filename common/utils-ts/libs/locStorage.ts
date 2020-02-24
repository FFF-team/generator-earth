export const supportLocalStorage: boolean = (function () {
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
})();

const supportSessionStorage: boolean = (function () {
    const test = 'test';
    try {
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
})();

export const locStorage: object = {
    set: function (key: string, value: any): void {
        if (supportLocalStorage) {
            localStorage.setItem(key, value);
        } else if (supportSessionStorage) {
            sessionStorage.setItem(key, value);
        }
    },
    get: function (key: string): any {
        if (supportLocalStorage) {
            return localStorage.getItem(key);
        } else if (supportSessionStorage) {
            return sessionStorage.getItem(key);
        }
    },
    removeItem: function (key: string) {
        if (supportLocalStorage) {
            return localStorage.removeItem(key);
        } else if (supportSessionStorage) {
            return sessionStorage.removeItem(key);
        }
    },
    isSupport: function () {
        return supportLocalStorage || supportSessionStorage;
    }
};
