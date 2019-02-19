import users from './users.json';

const config = {
    storagePath: __dirname + '/../db/storage.json',
    defaultData: {
        lastProjectId: 2,
        lastReviewId: 3,
        products: [
            {
                id: 1,
                name: 'Baloon',
                properties: {
                    color: 'red',
                    size: 'medium',
                },
                review_ids: [1, 2],
            },
            {
                id: 2,
                name: 'Pen',
                properties: {
                    color: 'black',
                },
                review_ids: [3],
            },
        ],
        reviews: [
            {
                id: 1,
                content: 'This is first review of some product #1',
            },
            {
                id: 2,
                content: 'This is second review of some product #1',
            },
            {
                id: 3,
                content: 'This is first review of some product #2',
            },
        ],
        users,
    },
};

export default config;
