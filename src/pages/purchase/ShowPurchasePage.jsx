import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { currency } from "../../helpers/numberFormat";
import { useMenu } from "../../hooks/useMenu";
import { show } from "../../services/purchase.api";

const ShowPurchasePage = () => {
  const { setMenuName } = useMenu();
  setMenuName("purchase-all");
  const navigate = useNavigate();
  const params = useParams();
  const [purchaseInfo, setPurchaseInfo] = useState({});

  useEffect(() => {
    const getData = async () => {
      await show(params.id).then((res) => {
        setPurchaseInfo(res.data);
      });
    };
    getData();
  }, []);

  const handleNewPurchase = () => {
    navigate("/purchases/new");
  };

  const handleShowPurchases = () => {
    navigate("/purchases");
  };

  return (
    <div className="mt-5 flex flex-col items-center justify-center ">
      <div className="bg-white p-5 rounded-xl shadow-md mt-2 w-96">
        <h1 className="text-center font-bold text-2xl">
          {purchaseInfo?.commerceId?.description}
        </h1>
        <div className="my-5 gap-2">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col items-start text-sm">
              <span>Payment:</span>
              <span>{purchaseInfo?.walletId?.description}</span>
            </div>
            <div className="flex flex-col items-end text-sm">
              <span>Date invoice</span>
              <span>
                {Intl.DateTimeFormat("es-CL").format(
                  new Date(purchaseInfo?.dateInvoice || Date.now())
                )}
              </span>
            </div>
          </div>
          <div className="mt-2 text-justify px-5">
            {purchaseInfo.description}
          </div>
        </div>

        <div className="border-b-2 pb-2">
          <div className="grid grid-cols-5 text-xs font-bold mb-2 border-t-2 py-2 border-b-2 uppercase">
            <div className="truncate col-span-3">
              Description
              <div className="text-center">Quantity x Price</div>
            </div>
            <div className="text-right mr-2">Value</div>
            <div className="text-right">Discount</div>
          </div>
          {purchaseInfo?.items &&
            purchaseInfo?.items.map((item) => (
              <div
                key={item.productId._id}
                className="grid grid-cols-5 text-sm"
              >
                <div className="truncate col-span-3">
                  {item.productId.description}
                  {item.quantity > 1 && (
                    <div className="text-xs text-center">
                      {item.quantity} x {currency(item.price)}
                    </div>
                  )}
                </div>
                <div className="text-right">{currency(item.total)}</div>
                <div className="text-right">
                  {item.discount > 0 && currency(item.discount)}
                </div>
              </div>
            ))}
        </div>

        <div className="mt-5 font-bold text-sm">
          <div className="grid grid-cols-5">
            <div className="col-start-3 col-end-3">Sub Total</div>
            <div className="col-auto text-right">
              {currency(purchaseInfo.subTotal)}
            </div>
          </div>
          {purchaseInfo.discount > 0 && (
            <div className="grid grid-cols-5">
              <div className="col-start-3 col-end-3">Discount</div>
              <div className="col-auto text-right">
                {currency(purchaseInfo.discount)}
              </div>
            </div>
          )}
          <div className="grid grid-cols-5">
            <div className="col-start-3 col-end-3">Net</div>
            <div className="col-auto text-right">
              {currency(purchaseInfo.net)}
            </div>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-start-3 col-end-3">Tax (2%)</div>
            <div className="col-auto text-right">
              {currency(purchaseInfo.tax)}
            </div>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-start-3 col-end-3">Total</div>
            <div className="col-auto text-right">
              {currency(purchaseInfo.total)}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 my-5 gap-5">
        <Button label="Create new" onClick={handleNewPurchase} />
        <Button label="Show all" onClick={handleShowPurchases} />
      </div>
    </div>
  );
};

export default ShowPurchasePage;
