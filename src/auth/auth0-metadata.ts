
export const getAuth0UserMetadata = async (token: string, userSub: string) => {
    const res = await fetch(`https://cloudyyoung.auth0.com/api/v2/users/${encodeURIComponent(userSub)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    return data.user_metadata;
};


export const updateAuth0UserMetadata = async (token: string, userSub: string, matchID: string, playerID: string, credentials: string) => {
    const res = await fetch(`https://cloudyyoung.auth0.com/api/v2/users/${encodeURIComponent(userSub)}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_metadata: {
                [matchID]: {
                    playerID,
                    credentials
                }
            }
        })
    });

    const data = await res.json();
    return data.user_metadata;
};