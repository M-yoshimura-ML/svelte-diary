import { writable } from "svelte/store";
import Cookies from 'js-cookie';


const cookie = Cookies.get('uid');
console.log('Cookie in uid =' + cookie);
// JSではcamel caseを使うことが多い
export const userId = writable(cookie ? cookie : null);

