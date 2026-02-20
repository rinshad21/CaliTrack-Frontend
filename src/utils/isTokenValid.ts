

export function isTokenValid(storageKey = "token"): boolean {
    const token = localStorage.getItem(storageKey);
    if (!token) return false;

    try {

        const payloadBase64 = token.split(".")[1];
        if (!payloadBase64) return false;


        const payload = JSON.parse(atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/")));

        if (typeof payload.exp !== "number") {

            return true;
        }


        return payload.exp * 1000 > Date.now();
    } catch {
        // Malformed token
        return false;
    }
}

export function clearAuthStorage(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("level");
}
