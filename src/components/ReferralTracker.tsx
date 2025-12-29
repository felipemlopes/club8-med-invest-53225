import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ReferralTracker() {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const ref = params.get("ref");

        if (ref) {
            localStorage.setItem("referral_code", ref);
        }
    }, [location.search]);

    return null;
}
