export interface Routing
{
    // Licorería Pensilvania
    shoppingCart: string;

    // *************** INVENTARIO *************** //
    // Cigarrillos
    createCigarette: string;
    editCigarette: string;

    // Licores
    createSpirit: string;
    editSpirit: string;

    // Bebidas
    createDrink: string;
    editDrink: string;

    // Comestibles
    createGrocery: string;
    editGrocery: string;

    // Cócteles
    createCocktail: string;
    editCocktail: string;

    // Naturistas
    createNaturist: string;
    editNaturist: string;

    // Sex-Shop
    createSexshop: string;
    editSexshop: string;
    // *************** INVENTARIO *************** //

    // Ventas
    listAllSales: string;
    createSale: string;

    // Compras
    listAllPurchases: string;
    createPurchase: string;

    // Inventario
    inventory: string;

    // Proveedores
    listAllProviders: string;

    // Clientes
    listAllClients: string;

    // Caja
    box: string;

    // Ajustes
    settings: string;
}