import React, { useState } from "react";
import { Button, Input, Label } from "../../components";

const productsData = [
  {
    productId: 1,
    description: "Product 1",
    quantity: 1,
    price: 100,
    discount: 0,
    total: 100,
  },
  {
    productId: 2,
    description: "Product 2",
    quantity: 2,
    price: 300,
    discount: 0,
    total: 600,
  },
];

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [items, setItems] = useState([...productsData]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="text-3xl font-black">Purchases</h1>
      <p className="text-green-600 font-thin text-sm opacity-70">
        Register your purchases here.
      </p>
      <div className="container mx-auto lg:grid lg:grid-cols-2 gap-5">
        <div className="mt-5 container mx-auto">
          <h1 className="text-xl text-neutral-900 text-center mb-5">
            Create/Edit
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white px-5 py-10 rounded-xl shadow-md mt-2"
          >
            <div className="mb-5">
              <Label text="Commerce" htmlFor="commerce" />
              <Input id="commerce" type="text" placeholder="Commerce name" />
            </div>
            <div className="my-5 grid grid-cols-2 gap-5">
              <div>
                <Label text="Wallet" htmlFor="wallet" />
                <Input
                  id="wallet"
                  type="text"
                  placeholder="What wallet have used?"
                />
              </div>
              <div>
                <Label text="Date invoice" htmlFor="dateInvoice" />
                <Input id="dateInvoice" type="date" />
              </div>
            </div>
            <div className="my-5">
              <Label text="Description" htmlFor="description" />
              <Input
                id="description"
                type="text"
                placeholder="Purchase of products on the market"
              />
            </div>
            <div className="mt-10">
              <Button type="submit" label="Add" />
            </div>
          </form>
          <div className="bg-white px-5 py-10 rounded-xl shadow-md mt-2">
            <div className="mb-5">
              <Label text="Product" htmlFor="product" />
              <Input id="product" type="text" placeholder="Product name" />
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="my-5">
                <Label text="Quantity" htmlFor="quantity" />
                <Input id="quantity" type="number" />
              </div>
              <div className="my-5">
                <Label text="Price" htmlFor="price" />
                <Input id="price" type="number" />
              </div>
              <div className="my-5">
                <Label text="Discount" htmlFor="discount" />
                <Input id="discount" type="number" />
              </div>
            </div>
            <div className="my-5">
              <Button type="button" label="Add Product" />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-xl text-neutral-900 text-center mb-5">
            List of products
          </h1>
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead className="bg-neutral-200 text-green-600">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Discount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.productId}
                  className="border-t-2 hover:bg-neutral-100"
                >
                  <td className="px-4 py-2 text-justify">{item.description}</td>
                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">{item.price}</td>
                  <td className="px-4 py-2 text-right">{item.discount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className=" text-green-600 border-t-4">
              <tr>
                <td className="px-4 py-2" colSpan="2">
                  Total
                </td>
                <td className="px-4 py-2 text-right">
                  {items.reduce((acc, item) => acc + item.total, 0)}
                </td>
                <td className="px-4 py-2 text-right">0</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default PurchasesPage;
