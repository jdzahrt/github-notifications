require('isomorphic-fetch');
const keys = require('../pw');

const getOpenPRs = async (login, repoName, dayThreshold) => {
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keys.gToken}`
        },
        body: JSON.stringify(
            {
                query: `query o {
    user(login: "${login}") {
        login
        company
        repository(name: "${repoName}") {
            name
            url
            pullRequests(states: [OPEN], first: 100) {
                nodes {
                    headRefName
                    permalink
                    state
                    createdAt
                    labels(first: 10) {
                        nodes {
                            name
                        }
                    }
                }
            }
        }
    }
}`
            }),
    });

    return response.json();
};

module.exports = getOpenPRs;
