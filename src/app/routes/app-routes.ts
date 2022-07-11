import { Routing } from "../core/interfaces/Routing";

export const appRoutes: Routing = {
    // Licorería Pensilvania
    shoppingCart: '/shopping-cart',

    // *************** INVENTARIO *************** //
    // ---- Inventario por defecto (Licores) ---- //
    inventory: '/dashboard/products',
    // Cigarrillos
    createCigarette: '/dashboard/products/create/cigarette',
    editCigarette: '/dashboard/products/cigarette/edit/',

    // Licores
    createSpirit: '/dashboard/products/create/spirit',
    editSpirit: '/dashboard/products/spirit/edit/',

    // Bebidas
    createDrink: '/dashboard/products/create/drink',
    editDrink: '/dashboard/products/drink/edit/',

    // Comestibles
    createGrocery: '/dashboard/products/create/grocery',
    editGrocery: '/dashboard/products/grocery/edit/',    

    // Cócteles y micheladas
    createCocktail: '/dashboard/products/create/cocktail',
    editCocktail: '/dashboard/products/cocktail/edit/',

    // ---- Inventario para tiendas naturistas ---- //
    // Productos Naturistas
    createNaturist: '/dashboard/products/create/naturist',
    editNaturist: '/dashboard/products/naturist/edit/',

    // sex shop
    createSexshop: '/dashboard/products/create/sexshop',
    editSexshop: '/dashboard/products/sexshop/edit/',

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