
const Host = {
  ROOT: "http://localhost:3000",
  BACKEND: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:3000" : "https://db.cheap-shop.net" ,
  PREFIX: "/v1/api", 
}; 
  
const ApiEndpoints = { 
 
  AuthEndpoints: { 
    route: `${Host.PREFIX}/user`,
    signup: `/signup`,
    create:`/create`, 
    list: `/list`,
    login: `/login`,
    forgot: `/forgot-password`,
    confirm: `/confirm-email`,
    edit: `/edit`,
    address: `/address`,
    image: `/image`,
    me: `/me`,
    suspension:`/suspension`,
    count: `/count`,
    rule: `/rule`,

  },

  AdminEndpoints: {
    route: `${Host.PREFIX}/admin`,
    login: `/login`
    },


  ProductsEndpoints: {
    route: `${Host.PREFIX}/products`,
    list: `/list`,
    listtab: `/listtab`,
    create: `/create`,
    edit: `/edit`,
    delete: `/delete`,
    duplicate: `/duplicate`,
    review: `/review`,
    distinct: `/distinct`,
    count: `/count`,
    views: `/views`,
    aliexpress: `/aliexpress`,

  },
  OrdersEndpoints: {
    route: `${Host.PREFIX}/orders`,
    list: `/list`,
    create: `/create`,
    calculate: `/calculate`,
    edit: `/edit`,
    delete: `/delete`,
    duplicate: `/duplicate`,
    count: `/count`,
    status: `/status`,
    tracking: `/tracking`,

  },
  MainEndpoints: {
    route: `${Host.PREFIX}/main`,
    list: `/list`,
    create: `/create`,
    edit: `/edit`,
    delete: `/delete`,
    duplicate: `/duplicate`,
    count: `/count`,

  },
  WishlistEndpoints: {
    route: `${Host.PREFIX}/wishlist`,
    list: `/list`,
    create: `/create`,
    delete: `/delete`,
    count: `/count`,
  },

  ChatEndpoints: { 
    route: `${Host.PREFIX}/chat`, 
    getFriends: `/get-friends`, 
    sendMessage: `/send-message`, 
    getMessage: `/get-message`, 
    imageMessageSend: `/image-message-send` 
  },

  FileEndpoints: {
    route: `${Host.PREFIX}/file`,
    getSingleFileView: `/get-single-file`,
    getSingleFileDownload: `/get-single-file`,
    createSingleFile: `/create-single-file`,
  },
 
 
  SubscribeEndpoints: {
    route: `${Host.PREFIX}/subscribe`,
    list: `/list`,
    create: `/create`, 
    count: `/count`,

  },
  ContactEndpoints: {
    route: `${Host.PREFIX}/contact`,
    list: `/list`,
    create: `/create`, 
    count: `/count`,

  },
  
  CatyEndpoints: {
    route: `${Host.PREFIX}/caty`,
    list: `/list`,
    listtab: `/listtab`,
    create: `/create`,
    edit: `/edit`,
    delete: `/delete`,
    duplicate: `/duplicate`,
    count: `/count`,
  },

};
 
export {ApiEndpoints , Host}