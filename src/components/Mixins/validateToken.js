import jwt_decode from "jwt-decode"
export const validateToken = {
    methods: {
        validateJwt() {
            if (localStorage.getItem("authenticated") && localStorage.getItem("authenticated") !== 'false') {
                var decoded = jwt_decode(localStorage.getItem("authenticated"));
                const now = Date.now().valueOf() / 1000
                if (now <= decoded.exp) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}