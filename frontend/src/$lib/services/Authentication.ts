/**
 * Methods for authentication
 */

/**
 * 
 * @param email 
 * @param password 
 */
export const register = async (email: string, password: string) => {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    };
    const response = await fetch('/api/register', options);
    return await response.json();
}