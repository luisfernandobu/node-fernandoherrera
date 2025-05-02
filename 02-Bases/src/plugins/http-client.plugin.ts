import axios from 'axios';

export const httpClient = {
    get: async(url: string) => {
        const { data } = await axios.get(url);
        return data;
    },
    post: async(url: string, body: any) => {
        throw new Error('Not implemented yet');
    },
    put: async(url: string, body: any) => {
        throw new Error('Not implemented yet');
    },
    delete: async(url: string) => {
        throw new Error('Not implemented yet');
    }
};
