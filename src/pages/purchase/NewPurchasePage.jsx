import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import AutocompleteComponent from "../../components/AutocompleteComponent";
import { Button, Input, Label, Loading } from "../../components";

import { getAll } from "../../services/wallet.api";
import { findByDescription } from "../../services/commerce.api";
import { findByDescription as productFindByDescription } from "../../services/products.api";
import { store } from "../../services/purchase.api";
import { currency } from "../../helpers/numberFormat";
import { remove } from "../../helpers/icons";

const NewPurchasePage = () => {
  const navigate = useNavigate();
  const [loadingSave, setLoadingSave] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [items, setItems] = useState([]);
  const [purchaseInfo, setPurchaseInfo] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const [showProductAndList, setShowProductAndList] = useState(false);

  const [commerceInfo, setCommerceInfo] = useState(null);
  const [walletSelected, setWalletSelected] = useState(null);
  const [dateInvoice, setDateInvoice] = useState(null);
  const [description, setDescription] = useState(null);

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [subTotal, setSubTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [net, setNet] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const walletRef = useRef(null);
  const formProductRef = useRef(null);

  /** COMMERCE INFO */

  const handleCommerceOnSelected = (commerce) => {
    setCommerceInfo({
      commerceId: commerce?._id ?? null,
      commerceDescription: commerce?.description ?? null,
    });
  };

  const handleSaveCommerceInfo = (e) => {
    e.preventDefault();
    if (
      ![
        commerceInfo?.commerceId,
        commerceInfo?.commerceDescription,
        walletSelected?.walletId,
        walletSelected?.walletDescription,
        dateInvoice,
      ].every((item) => !!item)
    ) {
      toast.error("Commerce, wallet and date are required");
      return;
    }

    setShowProductAndList(true);
  };

  /** PRODUCT INFO */

  const handleProductOnSelected = (product) => {
    setProductInfo({
      productId: product?._id ?? null,
      productDescription: product?.description ?? null,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newItem = {
      productId: productInfo?.productId,
      description: productInfo?.productDescription,
      quantity,
      price,
      discount,
      total: quantity * price,
    };

    if (![newItem.productId, newItem.description].every((item) => !!item)) {
      toast.error("Product is required");
      return;
    }

    if (![newItem.quantity, newItem.price].every((item) => item > 0)) {
      toast.error("Quantity, and price are required");
      return;
    }

    setItems([...items, newItem]);
    calculateTotal();
    setProductInfo(null);
    setQuantity(0);
    setPrice(0);
    setDiscount(0);
    formProductRef.current.reset();
  };

  const handleRemoveProduct = (productId) => {
    setItems(items.filter((item) => item.productId !== productId));
  };

  /** ORDER */

  const calculateTotal = () => {
    let calcSubTotal = 0;
    let calcDiscount = 0;
    items.map((item) => {
      calcSubTotal += item.total;
      calcDiscount += item.discount;
    });

    const calcTotal = calcSubTotal - calcDiscount;
    const calcNet = Math.round(calcTotal / 1.19);
    const calcTax = calcTotal - calcNet;

    setSubTotal(calcSubTotal);
    setDiscountTotal(calcDiscount);
    setNet(calcNet);
    setTax(calcTax);
    setTotal(calcTotal);
  };

  const handleSavePurchase = async () => {
    setLoadingSave(true);
    const purchase = {
      commerceId: commerceInfo?.commerceId,
      commerceDescription: commerceInfo?.commerceDescription,
      walletId: walletSelected?.walletId,
      dateInvoice,
      description,
      subTotal,
      discountTotal,
      net,
      tax,
      total,
      items,
    };

    await store(purchase)
      .then((res) => {
        const { _id } = res.data;
        navigate(`/purchases/show/${_id}`);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setLoadingSave(false);
  };

  useEffect(() => {
    calculateTotal();
  }, [items]);

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
      <div className="mx-auto">
        <div className="mt-5 flex flex-row justify-center ">
          <form
            className={`bg-white px-5 py-10 rounded-xl shadow-md mt-2 ${
              showProductAndList ? "hidden" : ""
            }`}
            onSubmit={handleSaveCommerceInfo}
          >
            <AutocompleteComponent
              title="Commerce"
              placeholder="Find commerce"
              sources={[
                {
                  id: "finances-backend",
                  fnSource: findByDescription,
                },
              ]}
              onSelected={handleCommerceOnSelected}
            />
            <div className="my-5 grid grid-cols-2 gap-5">
              <div>
                <Label text="Wallet" htmlFor="walletId" />
                <select
                  ref={walletRef}
                  id="walletId"
                  name="walletId"
                  className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
                  onChange={(e) => {
                    const { options, selectedIndex } = e.target;
                    setWalletSelected({
                      walletId: options[selectedIndex].value,
                      walletDescription: options[selectedIndex].text,
                    });
                  }}
                >
                  <option value="">-- Select wallet --</option>
                  {wallets.map((wallet) => (
                    <option key={wallet._id} value={wallet._id}>
                      {wallet.description} ({wallet.balance})
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
                  onChange={(e) => setDateInvoice(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mt-10">
              <Button type="submit" label="Add" block={true} />
            </div>
          </form>
          <div
            className={
              showProductAndList ? "lg:grid lg:grid-cols-2 lg:gap-5" : "hidden"
            }
          >
            <div className="sm:mx-10 lg:mx-0">
              <form
                ref={formProductRef}
                className="bg-white p-5 rounded-xl shadow-md mt-2"
                onSubmit={handleAddProduct}
              >
                <div className="mb-5">
                  <AutocompleteComponent
                    title="Product"
                    placeholder="Find product"
                    sources={[
                      {
                        id: "finances-backend",
                        fnSource: productFindByDescription,
                      },
                    ]}
                    onSelected={handleProductOnSelected}
                  />
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <div className="my-0">
                    <Label text="Quantity" htmlFor="quantity" />
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </div>
                  <div className="my-0">
                    <Label text="Price" htmlFor="price" />
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  </div>
                  <div className="my-0">
                    <Label text="Discount" htmlFor="discount" />
                    <Input
                      id="discount"
                      name="discount"
                      type="number"
                      onChange={(e) => setDiscount(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <Button type="submit" label="Add Product" block={true} />
                </div>
              </form>
            </div>
            <div className="sm:mx-10 lg:mx-0 xs:mt-5 md:mt-10 lg:mt-0">
              <div className="grid grid-cols-2">
                <div className="text-sm uppercase text-green-600">
                  Commerce:{" "}
                  <span className="text-sm text-black normal-case">
                    {commerceInfo?.commerceDescription}
                  </span>
                </div>
                <div className="text-sm uppercase text-green-600">
                  Date Invoice:{" "}
                  <span className="text-sm text-black normal-case">
                    {dateInvoice}
                  </span>
                </div>
                <div className="text-sm uppercase text-green-600">
                  Wallet pay:{" "}
                  <span className="text-sm text-black normal-case">
                    {walletSelected?.walletDescription}
                  </span>
                </div>
                <div className="text-sm uppercase text-green-600">
                  Description:{" "}
                  <span className="text-sm text-black normal-case">
                    {description}
                  </span>
                </div>
              </div>
              <h3 className="text-base text-neutral-900 text-center my-5">
                List of products
              </h3>
              <div className="">
                <table className="table-auto xs:table-fixed w-full shadow-md">
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
                    {items.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t-2 hover:bg-neutral-100"
                      >
                        <td className="px-4 py-2 text-justify">
                          {item.description}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-2 text-right">
                          {currency(item.total)}
                        </td>
                        <td className="px-4 py-2 text-right">
                          {currency(item.discount)}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <Button
                            type="button"
                            color="danger"
                            size="xs"
                            label={remove}
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
                        {currency(subTotal)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {currency(discountTotal)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="mt-5 grid grid-cols-2">
                <div className="col-start-2 col-end-2">
                  <div className="font-bold text-sm uppercase flex justify-between">
                    <span>Sub Total:</span>
                    <span>{currency(subTotal)}</span>
                  </div>
                  {discountTotal > 0 && (
                    <div className="font-bold text-sm uppercase flex justify-between">
                      <span>Discount:</span>
                      <span>-{currency(discountTotal)}</span>
                    </div>
                  )}
                  <div className="font-bold text-sm uppercase flex justify-between">
                    <span>Net:</span> <span>{currency(net)}</span>
                  </div>
                  <div className="font-bold text-sm uppercase flex justify-between">
                    <span>Tax (19%):</span>
                    <span>{currency(tax)}</span>
                  </div>
                  <h4 className="font-bold text-sm uppercase flex justify-between text-green-600">
                    <span>Total:</span>
                    <span>{currency(total)}</span>
                  </h4>
                </div>
              </div>
              <div className="mt-10">
                {loadingSave ? (
                  <>
                    <Loading show={true} />
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      label="Save"
                      block={true}
                      onClick={handleSavePurchase}
                      disabled={items.length === 0}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPurchasePage;
