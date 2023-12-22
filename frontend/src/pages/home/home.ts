import './home.scss';

/**
 * Get available products from api
 * @returns {}
 */
const products = async () => {
    try {
        const url = '/api/';
        const options = {}

        const response = await fetch(url, options);
        
        if(!response.ok) {
            throw new Error(`\n Status:${response?.status} \n Text: ${response?.statusText}`);
        }

        return await response.json();

    } catch (error) {
        console.error(error);
    }
}

export const init = async () => {
    // window.location.href = '/home';
    document.title = 'Homepage | E-Commerce'

    // get products
   const data = await products()

   console.log(data);
};