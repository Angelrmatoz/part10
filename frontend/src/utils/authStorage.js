import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        try {
            const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
            return token;
        } catch {
            return null;
        }
    }

    async setAccessToken(accessToken) {
        try {
            await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
        } catch {
            // ignore
        }
    }

    async removeAccessToken() {
        try {
            await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
        } catch {
            // ignore
        }
    }
}

export default AuthStorage;