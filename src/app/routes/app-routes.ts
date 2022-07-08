import { Routing } from "../core/interfaces/Routing";

export const appRoutes: Routing = {
    // Licorería Pensilvania
    shoppingCart: '/shopping-cart',

    // *************** INVENTARIO *************** //
    // ---- Inventario por defecto (Licores) ---- //
    inventory: '/dashboard/products',
    // Cigarrillos
    createCigarette: '/dashboard/products/create/cigarette',
    editCigarette: '/dashboard/products/cigarettes/edit/',

    // Licores
    createSpirit: '/dashboard/products/create/spirit',
    editSpirit: '/dashboard/products/spirits/edit/',

    // Bebidas
    createDrink: '/dashboard/products/create/drink',
    editDrink: '/dashboard/products/drinks/edit/',

    // Comestibles
    createGrocery: '/dashboard/products/create/grocery',
    editGrocery: '/dashboard/products/groceries/edit/',    

    // Cócteles y micheladas
    createCocktail: '/dashboard/products/create/cocktail',
    editCocktail: '/dashboard/products/cocktails/edit/',

    // ---- Inventario para tiendas naturistas ---- //
    // Productos Naturistas
    createNaturist: '/dashboard/products/create/naturist',
    editNaturist: '/dashboard/products/naturists/edit/',

    // sex shop
    createSexshop: '/dashboard/products/create/sexshop',
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