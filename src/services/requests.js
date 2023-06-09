import page from '../lib/page.js';
import { getToken } from '../util.js';

const baseURL = `https://clearcareer-nodejs-server.onrender.com/data/offers`;
const loginURL = `https://clearcareer-nodejs-server.onrender.com/users/login/`;
const registerURL = `https://clearcareer-nodejs-server.onrender.com/users/register/`;
const logoutURL = `https://clearcareer-nodejs-server.onrender.com/users/logout/`;
const applyURL = `https://clearcareer-nodejs-server.onrender.com/data/applications`;


export const getAllOffers = () => fetch(baseURL + `?sortBy=_createdOn%20desc`).then(res => res.json()).catch(err => alert(err));

//login request
export function loginUser(user) {
    fetch(loginURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(user => {
            if (user.code == 403) {
                alert('Cannot log in this user!');
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';

            } else {
                localStorage.setItem('user', JSON.stringify(user));
                page.redirect('/dashboard');
            }

        })
        .catch(err => {
            alert(err);
        })

}

//register request
export function registerUser(user) {
    fetch(registerURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            page.redirect('/dashboard');
        })
        .catch(err => {
            alert(err);
        })

}

//logout request
export const logoutUser = () => fetch(logoutURL, { headers: { 'X-Authorization': getToken() } }).then(() => {
    localStorage.removeItem('user');
    page.redirect('/dashboard');
});

//create offer request
export function createOffer(newOffer) {
    fetch(baseURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': getToken()
        },
        body: JSON.stringify(newOffer)

    })
        .then(() => {
            page.redirect('/dashboard');
        })
        .catch(err => alert(err));
}

//get single offer
export const getOffer = (id) => fetch(baseURL + `/${id}`).then(res => res.json()).catch(err => alert(err));

//edit offer
export function editOffer(editedOffer, id) {
    fetch(baseURL + `/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': getToken()
        },
        body: JSON.stringify(editedOffer)

    })
        .then(res => res.json())
        .then(offer => {
            page.redirect(`/details/${offer._id}`)
        })
        .catch(err => alert(err));
}

//delete offer
export function deleteOffer(id) {
    fetch(baseURL + `/${id}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': getToken()
        }
    })
        .then(() => {
            page.redirect('/dashboard');
        })
        .catch(err => alert(err));
}