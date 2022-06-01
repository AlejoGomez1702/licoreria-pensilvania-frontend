import { Routing } from "../core/interfaces/Routing";

export const appRoutes: Routing = {
    // Licorería Pensilvania
    shoppingCart: '/shopping-cart',

    // *************** INVENTARIO *************** //
    // ---- Inventario por defecto (Licores) ---- //
    inventory: '/dashboard/products',
    // Cigarrillos
    createCigarette: '/dashboard/products/create/cigarettes',
    editCigarette: '/dashboard/products/cigarettes/edit/',

    // Licores
    createSpirit: '/dashboard/products/create/spirits',
    editSpirit: '/dashboard/products/spirits/edit/',

    // Bebidas
    createDrink: '/dashboard/products/create/drinks',
    editDrink: '/dashboard/products/drinks/edit/',

    // Comestibles
    createGrocery: '/dashboard/products/create/groceries',
    editGrocery: '/dashboard/products/groceries/edit/',    

    // ---- Inventario para tiendas naturistas ---- //
    // Productos Naturistas
    createNaturist: '/dashboard/products/create/naturists',
    editNaturist: '/dashboard/products/naturists/edit/',

    // sex shop
    createSexshop: '/dashboard/products/create/sexshops',
    editSexshop: '/dashboard/products/sexshops/edit/',

    // *************** INVENTARIO *************** //

    // Ventas
    listAllSales: '/dashboard/sales',
    createSale: '/dashboard/sales/create',

    // Compras
    listAllPurchases: '/dashboard/purchases',
    createPurchase: '/dashboard/purchases/create',

    // Proveedores
    listAllProviders: '/dashboard/providers',

    // Clientes
    listAllClients: '/dashboard/clients',

    // Caja
    box: '/dashboard/box',

    // Ajustes
    settings: 'dashboard/settings'
};