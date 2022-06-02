import React, { useEffect, useMemo, useRef, useState } from "react";

import { Button, Input, Label } from "../../components";
import { getAll } from "../../services/wallet.api";
import { findByDescription, store } from "../../services/commerce.api";
import AutocompleteComponent from "../../components/AutocompleteComponent";

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [commerceSelected, setCommerceSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [purchaseInfo, setPurchaseInfo] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const [showProductAndList, setShowProductAndList] = useState(false);

  const handleSaveCommerceInfo = () => {
    setShowProductAndList(true);
  };

  const handleChangePurchaseInfo = (e) => {
    const { name, value } = e.target;
    setPurchaseInfo({ ...purchaseInfo, [name]: value });
  };

  const handleChangeInfoProduct = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handOnSelected = (commerce) => {
    console.log({ commerce });
    // setProductInfo({
    //   ...productInfo,
    //   commerceId: _id,
    //   commerceDescription: description,
    // });
  };

  const handleAutoSave = async (commerce) => {
    // const response = await store(commerce);
    // console.log({ response });
  };

  const handleAddProduct = () => {
    const { productId, product, description, quantity, price, discount } =
      productInfo;
    const newItem = {
      productId: Math.random() * 100,
      description: product,
      quantity,
      price,
      discount,
      total: quantity * price,
    };
    setItems([...items, newItem]);
    setProductInfo(null);
  };

  const handleRemoveProduct = (productId) => {
    setItems(items.filter((item) => item.productId !== productId));
  };

  const handleSavePurchase = () => {
    console.log("save purchase");
    const purchase = {
      ...commerceInfo,
      items,
    };
    console.log(purchase);
  };

  useEffect(() => {
    const getWallets = async () => {
      const response = await getAll();
      setWallets(response.data);
    };
    getWallets();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-black">Purchases</h1>
      <p className="text-green-600 font-thin text-sm opacity-70">
        Register your purchases here.
      </p>
      <div className="container mx-auto">
        <div className="mt-5 flex flex-row justify-center ">
          <div
            className={`bg-white px-5 py-10 rounded-xl shadow-md mt-2 ${
              showProductAndList ? "hidden" : ""
            }`}
          >
            <AutocompleteComponent
              title="Commerce"
              placeholder="Find commerce"
              sourceId="finances-backend"
              source={findByDescription}
              onSelected={handOnSelected}
              onAutoSave={handleAutoSave}
            />
            <div className="my-5 grid grid-cols-2 gap-5">
              <div>
                <Label text="Wallet" htmlFor="wallet" />
                <select
                  id="wallet"
                  name="wallet"
                  className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
                  onChange={handleChangePurchaseInfo}
                >
                  <option value="">-- Select wallet --</option>
                  {wallets.map((wallet) => (
                    <option key={wallet._id} value={wallet._id}>
                      {wallet.description}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label text="Date invoice" htmlFor="dateInvoice" />
                <Input
                  id="dateInvoice"
                  name="dateInvoice"
                  type="date"
                  onChange={handleChangePurchaseInfo}
                />
              </div>
            </div>
            <div className="my-5">
              <Label text="Description" htmlFor="description" />
              <Input
                id="description"
                name="description"
                type="text"
                placeholder="Purchase of products on the market"
                value={purchaseInfo?.description ?? ""}
                onChange={handleChangePurchaseInfo}
              />
            </div>
            <div className="mt-10">
              <Button
                type="button"
                label="Add"
                onClick={handleSaveCommerceInfo}
              />
            </div>
          </div>
          <div
            className={showProductAndList ? "grid grid-cols-2 gap-5" : "hidden"}
          >
            <div className="">
              <div className="bg-white px-5 py-10 rounded-xl shadow-md mt-2">
                <div className="mb-5">
                  <Label text="Product" htmlFor="product" />
                  <Input
                    id="product"
                    name="product"
                    type="text"
                    placeholder="Product name"
                    value={productInfo?.product ?? ""}
                    onChange={handleChangeInfoProduct}
                  />
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <div className="my-5">
                    <Label text="Quantity" htmlFor="quantity" />
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={productInfo?.quantity ?? ""}
                      onChange={handleChangeInfoProduct}
                    />
                  </div>
                  <div className="my-5">
                    <Label text="Price" htmlFor="price" />
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={productInfo?.price ?? ""}
                      onChange={handleChangeInfoProduct}
                    />
                  </div>
                  <div className="my-5">
                    <Label text="Discount" htmlFor="discount" />
                    <Input
                      id="discount"
                      name="discount"
                      type="number"
                      value={productInfo?.discount ?? ""}
                      onChange={handleChangeInfoProduct}
                    />
                  </div>
                </div>
                <div className="my-5">
                  <Button
                    type="button"
                    label="Add Product"
                    onClick={handleAddProduct}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2">
                <div className="text-sm uppercase text-green-600">
                  Commerce:{" "}
                  <span className="text-sm text-black normal-case">
                    {purchaseInfo?.commerce}
                  </span>
                </div>
                <div className="text-sm uppercase text-green-600">
                  Date Invoice:{" "}
                  <span className="text-sm text-black normal-case">
                    {purchaseInfo?.dateInvoice}
                  </span>
                </div>
                <div className="text-sm uppercase text-green-600">
                  Wallet pay:{" "}
                  <span className="text-sm text-black normal-case">
                    {purchaseInfo?.wallet}
                  </span>
                </div>
                <div className="text-sm uppercase text-green-600">
                  Description:{" "}
                  <span className="text-sm text-black normal-case">
                    {purchaseInfo?.description}
                  </span>
                </div>
              </div>
              <h3 className="text-base text-neutral-900 text-center my-5">
                List of products
              </h3>
              <table className="table-auto w-full shadow-md">
                <thead className=" text-green-600">
                  <tr>
                    <th className="px-4 py-2 bg-neutral-200 rounded-tl-lg ">
                      Product
                    </th>
                    <th className="px-4 py-2 bg-neutral-200">Quantity</th>
                    <th className="px-4 py-2 bg-neutral-200">Price</th>
                    <th className="px-4 py-2 bg-neutral-200">Discount</th>
                    <th className="px-4 py-2 bg-neutral-200 rounded-tr-lg"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {items.map((item) => (
                    <tr
                      key={item.productId}
                      className="border-t-2 hover:bg-neutral-100"
                    >
                      <td className="px-4 py-2 text-justify">
                        {item.description}
                      </td>
                      <td className="px-4 py-2 text-center">{item.quantity}</td>
                      <td className="px-4 py-2 text-right">{item.price}</td>
                      <td className="px-4 py-2 text-right">{item.discount}</td>
                      <td className="px-4 py-2 text-right">
                        <Button
                          type="button"
                          size="small"
                          label="X"
                          onClick={() => handleRemoveProduct(item.productId)}
                        />
                      </td>
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
              <div className="mt-10">
                <Button
                  type="button"
                  label="Save"
                  onClick={handleSavePurchase}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchasesPage;
