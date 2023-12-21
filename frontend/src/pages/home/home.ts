import './home.scss';

const products = async () => {
    try {
        const url = 'https://w4fduc83wb.execute-api.us-east-1.amazonaws.com/';
        const options = {

        }

        const response = await fetch(url, options);

    
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export const init = async () => {
    // window.location.href = '/home';
    document.title = 'Homepage | E-Commerce'

    // get products
   const data = await products()
};