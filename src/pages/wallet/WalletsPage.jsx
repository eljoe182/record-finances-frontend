import React, { useEffect, useState, useRef, createRef } from "react";
import { Button, Input, Label, Loading, Modal } from "../../components";
import { add, edit, trash } from "../../helpers/icons";
import { currency } from "../../helpers/numberFormat";
import { useMenu } from "../../hooks/useMenu";
import {
  addBalance,
  destroy,
  getAll,
  store,
  update,
} from "../../services/wallet.api";

const WalletsPage = () => {
  const { setMenuName } = useMenu();
  setMenuName("wallets");
  const [idWallet, setIdWallet] = useState("");
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingSaveData, setLoadingSaveData] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalAmount, setModalAmount] = useState(0);
  const [modalBalance, setModalBalance] = useState(0);
  const [modalWalletId, setModalWalletId] = useState(null);

  const formRef = useRef(null);
  const buttonDeleteRef = useRef([]);
  const rowListWalletRef = useRef([]);

  if (buttonDeleteRef.current.length !== wallets) {
    // add or remove refs
    buttonDeleteRef.current = Array(wallets)
      .fill()
      .map((_, i) => buttonDeleteRef.current[i] || createRef());
  }

  if (rowListWalletRef.current.length !== wallets) {
    // add or remove refs
    rowListWalletRef.current = Array(wallets)
      .fill()
      .map((_, i) => rowListWalletRef.current[i] || createRef());
  }

  useEffect(() => {
    const getData = async () => {
      setLoadingData(true);
      const response = await getAll();
      setWallets(response.data);
      setLoadingData(false);
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingSaveData(true);
    if (idWallet === "") {
      const response = await store({
        description,
        balance,
      });
      setWallets([...wallets, { ...response.data }]);
    } else {
      const response = await update({
        data: {
          description,
          balance,
        },
        id: idWallet,
      });
      setWallets(
        wallets.map((wallet) =>
          wallet._id === idWallet ? response.data : wallet
        )
      );
    }

    setIdWallet("");
    setDescription("");
    setBalance(0);
    setLoadingSaveData(false);
    formRef.current.reset();
  };

  const handleEdit = (wallet) => {
    const { _id, description, balance } = wallet;
    setIdWallet(_id);
    setDescription(description);
    setBalance(balance);
  };

  const handleDelete = async (id) => {
    await destroy(id);
    setWallets(wallets.filter((wallet) => wallet._id !== id));
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateBalance = async ({ _id, balance }) => {
    setModalWalletId(_id);
    setModalBalance(balance);
    setShowModal(true);
  };

  const handleUpdateBalanceModal = async (e) => {
    e.preventDefault();
    setShowModal(false);
    await addBalance({
      wallet: modalWalletId,
      amount: Number(modalAmount),
    }).then((response) => {
      const newWallets = wallets.map((wallet) => {
        if (wallet._id === modalWalletId) {
          return { ...wallet, balance: response.data.balance };
        }
        return wallet;
      });
      setWallets(newWallets);
    });
  };

  return (
    <>
      <Modal title="Add Balance" show={showModal} onClose={onCloseModal}>
        <form onSubmit={handleUpdateBalanceModal}>
          <div className="mb-4">
            <Label text="Current balance" />
            <Input
              id="balance"
              type="number"
              name="balance"
              value={modalBalance}
              readOnly={true}
              disabled={true}
            />
          </div>
          <div className="mb-4">
            <Label text="Amount" htmlFor="amount" />
            <Input
              id="amount"
              type="number"
              name="amount"
              value={modalAmount}
              placeholder="10.000"
              onChange={(e) => setModalAmount(e.target.value)}
            />
          </div>
          <div className="mb-t flex justify-end xs:justify-center space-x-2">
            <Button label="Save" type="submit" />
            <Button
              type="button"
              label="Cancel"
              color="neutral"
              onClick={() => setShowModal(false)}
            />
          </div>
        </form>
      </Modal>
      <h1 className="text-3xl font-black">Wallets</h1>
      <p className="text-green-600 font-thin text-sm opacity-70">
        Register your wallets here.
      </p>
      <div className="mx-auto lg:grid lg:grid-cols-2">
        <div className="mt-5 max-w-md  container mx-auto">
          <h1 className="text-xl text-neutral-900 text-center mb-5">
            Create/Edit
          </h1>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded-xl shadow-lg mt-2"
          >
            <div className="mb-5">
              <Label text="Description" htmlFor="description" />
              <Input
                id="description"
                type="text"
                placeholder="Credit card"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="my-5">
              <Label text="Balance" htmlFor="balance" />
              <Input
                id="balance"
                type="number"
                placeholder="Set an amount"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </div>
            {loadingSaveData ? (
              <>
                <Loading show={loadingSaveData} text="Save data" />
              </>
            ) : (
              <>
                <div className="mt-10">
                  <Button
                    type="submit"
                    label={idWallet !== "" ? "Edit" : "Add"}
                    color={idWallet !== "" ? "secondary" : "primary"}
                    block={true}
                  />
                </div>
              </>
            )}
          </form>
        </div>
        <div className="mt-5 max-w-lg container mx-auto">
          <h1 className="text-xl text-neutral-900 text-center mb-5">
            List of Wallets
          </h1>
          {loadingData ? (
            <>
              <Loading show={loadingData} />
            </>
          ) : (
            <>
              {wallets.length === 0 && (
                <div className="min-h-full flex flex-col justify-center">
                  <p className="text-neutral-400 text-sm text-center">
                    You don't have any wallets yet.
                  </p>
                </div>
              )}
              {wallets.map((wallet, index) => (
                <div
                  key={index}
                  className="bg-white py-3 px-5 rounded-xl shadow-lg my-2 hover:bg-gray-100 md:mx-20 lg:mx-auto"
                >
                  <div
                    className="hidden"
                    ref={(el) => (buttonDeleteRef.current[index] = el)}
                  >
                    <Loading show={true} />
                  </div>
                  <div
                    ref={(el) => (rowListWalletRef.current[index] = el)}
                    className="flex flex-row justify-between items-center"
                  >
                    <div className="">
                      <div className="flex gap-2">
                        <span className="font-semibold text-green-700">
                          Wallet:
                        </span>
                        <span className="font-normal text-black">
                          {wallet.description}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-green-700">
                          Balance:
                        </span>
                        <span className="font-normal text-black">
                          {currency(wallet.balance)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <Button
                        type="button"
                        label={add}
                        size="sm"
                        color="secondary"
                        onClick={() => handleUpdateBalance(wallet)}
                      />
                      <Button
                        type="button"
                        label={edit}
                        size="sm"
                        onClick={() => handleEdit(wallet)}
                      />
                      <Button
                        type="button"
                        label={trash}
                        color="danger"
                        size="sm"
                        onClick={async () => {
                          buttonDeleteRef.current[index].className = "";
                          rowListWalletRef.current[index].className = "hidden";
                          await handleDelete(wallet._id);
                          buttonDeleteRef.current[index].className = "hidden";
                          rowListWalletRef.current[index].className = "";
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WalletsPage;
