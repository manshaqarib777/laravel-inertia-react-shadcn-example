import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        paypal: any; // or you can try using more specific types if available
        Stripe: any; // or you can try using more specific types if available
        Pusher: any; // or you can try using more specific types if available
        Echo: any;
    }

    var route: typeof ziggyRoute;
}
