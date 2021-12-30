import { Routing } from "../core/interfaces/Routing";

export const appRoutes: Routing = {
    // Licorería Pensilvania
    shoppingCart: '/shopping-cart',

    // Ventas
    listAllSales: '/dashboard/sales',
    createSale: '/dashboard/sales/create',

    // Compras
    listAllPurchases: '/dashboard/purchases',
    createPurchase: '/dashboard/purchases/create',

    // Inventario
    inventory: '/dashboard/products',

    // Proveedores
    listAllProviders: '/dashboard/providers',

    // Clientes
    listAllClients: '/dashboard/clients',

    // Caja
    box: '/dashboard/box',

    // Ajustes
    settings: 'dashboard/settings'
};