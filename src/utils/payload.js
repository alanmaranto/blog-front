export default () => {
    const token = localStorage.getItem('blogToken'); //trae el token a traves del nombre "blogtoken"

    if (token) {
        const baseUri = token.split('.')[1]; //lo encuentra y lo splitea en la posicion 1 (encuentra el payload que estaba en la parte de en medio)
        const base64 = baseUri.replace('-','+').replace('_','/'); //si tiene * lo reemplaza por + etc, osea nos aseguramos que tenga base 64 pura
        return JSON.parse(window.atob(base64)); //convierte un strign base64 a un string normal y en ese string normal viene el payload del jwt y lo convertirmo en parse(objeto que podamos acceder)
    }
}