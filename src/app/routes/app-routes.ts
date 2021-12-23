import { Routing } from "../core/interfaces/Routing";

export const appRoutes: Routing = {
    // Ventas
    listAllSales: '/dashboard/sales',
    createSale: '/dashboard/sales/create',

    // Compras
    listAllPurchases: '/dashboard/purchases',
    createPurchase: '/dashboard/purchases/create',
};