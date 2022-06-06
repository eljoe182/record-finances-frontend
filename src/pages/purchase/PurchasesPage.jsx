import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoTable } from "../../components";
import { formatDate } from "../../helpers/dateFormat";
import { edit, remove, view } from "../../helpers/icons";
import { currency } from "../../helpers/numberFormat";
import { useMenu } from "../../hooks/useMenu";
import { destroy, getAll } from "../../services/purchase.api";

const FILTER_INITIAL = {
  page: 1,
  size: 10,
};

const PurchasesPage = () => {
  const navigate = useNavigate();
  const { setMenuName } = useMenu();
  setMenuName("purchase-all");
  const [purchasesData, setPurchasesData] = useState([]);
  const [filter, setFilter] = useState(FILTER_INITIAL);
  const [infoPage, setInfoPage] = useState(1);
  const [infoSize, setInfoSize] = useState(10);
  const [infoRowsCount, setInfoRowsCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const purchases = await getAll().then((res) => res.data);
      setPurchasesData(purchases);
      setInfoRowsCount(purchases.length);
    };
    getData();
  }, []);

  const onNext = () => {};
  const onPrevious = () => {};
  const onSize = () => {};

  const handleView = (id) => {
    navigate(`/purchases/show/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this purchase?"
    );
    console.log(confirm);
    if (confirm) {
      await destroy(id).then((res) => {
        const newData = purchasesData.filter((purchase) => purchase._id !== id);
        setPurchasesData(newData);
        setInfoRowsCount(newData.length);
      });
    }
  };

  return (
    <>
      <h1 className="text-3xl font-black">Your Purchases</h1>
      <p className="text-green-600 font-thin text-sm opacity-70">
        Show all purchases here
      </p>
      <div className="mt-5 bg-white rounded-xl">
        <table className="w-full table-fixed">
          <thead className="text-green-600 border-b-2">
            <tr>
              <th className="px-4 py-2 bg-gray-200 rounded-tl-xl">
                Date Invoice
              </th>
              <th className="px-4 py-2 bg-gray-200 xs:hidden">Commerce</th>
              <th className="px-4 py-2 bg-gray-200 xs:hidden">Wallet</th>
              <th className="px-4 py-2 bg-gray-200">Description</th>
              <th className="px-4 py-2 bg-gray-200">Total</th>
              <th className="px-4 py-2 bg-gray-200 rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchasesData.map((purchase, index) => (
              <tr
                key={purchase._id}
                className={` hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-2 text-center">
                  {formatDate(purchase.dateInvoice)}
                </td>
                <td className="py-2 pl-2 xs:hidden truncate">
                  {purchase.commerceId?.description}
                </td>
                <td className="py-2 text-center xs:hidden truncate">
                  {purchase.walletId?.description}
                </td>
                <td className="py-2 text-justify">{purchase.description}</td>
                <td className="py-2 text-right pr-5">
                  {currency(purchase.total)}
                </td>
                <td className="py-2 text-center gap-2 space-x-2">
                  <button
                    className="bg-green-600 text-white p-1 rounded-full"
                    onClick={() => handleView(purchase._id)}
                  >
                    {view}
                  </button>
                  <button className="bg-blue-600 text-white p-1 rounded-full">
                    {edit}
                  </button>
                  <button
                    className="bg-red-600 text-white p-1 rounded-full"
                    onClick={() => handleDelete(purchase._id)}
                  >
                    {remove}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <InfoTable
          page={infoPage}
          rowsCount={infoRowsCount}
          size={infoSize}
          onNext={onNext}
          onPrevious={onPrevious}
          onSize={(e) => onSize(e)}
        />
      </div>
    </>
  );
};

export default PurchasesPage;
