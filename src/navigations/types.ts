export type ProducttackParamsList = {
  ProductList: undefined;
  ProductUpdate: { id: string };
  ProductRegister: undefined;
};

export interface IOrderItem {
  id_order_item: string;
  id_order: string;
  id_product: string;
  quantity: string;
  unit_price: string;
  subtotal: string;
}

// navigations/types.ts
export type RootTabParamList = {
  Products: undefined;
  Categories: undefined;
  Suppliers: undefined;
  Clients: undefined;
  Orders: undefined;
};

export type ProductStackParamList = {
  ProductList: undefined;
  ProductRegister: undefined;
  ProductUpdate: { id: string };
};

export type CategoryStackParamList = {
  CategoryList: undefined;
  CategoryRegister: undefined;
  CategoryUpdate: { id: string };
};

export type SupplierStackParamList = {
  SupplierList: undefined;
  SupplierRegister: undefined;
  SupplierUpdate: { id: string };
};

export type ClientStackParamList = {
  ClientList: undefined;
  ClientRegister: undefined;
  ClientUpdate: { id: string };
};

export type OrderStackParamList = {
  OrderList: undefined;
  OrderRegister: undefined;
  OrderUpdate: { id: string };
  OrderDetail: { id: string };
};