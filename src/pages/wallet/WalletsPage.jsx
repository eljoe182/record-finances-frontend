import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "../../components";
import { destroy, getAll, store, update } from "../../services/wallet.api";

const WalletsPage = () => {
  const [idWallet, setIdWallet] = useState("");
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(0);
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getAll();
      setWallets(response.data);
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.log(response);
      setWallets(
        wallets.map((wallet) =>
          wallet._id === idWallet ? response.data : wallet
        )
      );
    }

    setIdWallet("");
    setDescription("");
    setBalance(0);
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

  return (
    <>
      <h1 className="text-3xl font-black">Wallets</h1>
      <p className="text-green-600 font-thin text-sm opacity-70">
        Register your wallets here.
      </p>
      <div className="container mx-auto lg:grid lg:grid-cols-2 gap-5">
        <div className="mt-5 max-w-sm container mx-auto">
          <h1 className="text-xl text-neutral-900 text-center mb-5">
            Create/Edit
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white px-5 py-10 rounded-xl shadow-lg mt-2"
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
            <div className="mt-10">
              <Button
                type="submit"
                label={idWallet !== "" ? "Edit" : "Add"}
                color={idWallet !== "" ? "secondary" : "primary"}
              />
            </div>
          </form>
        </div>
        <div className="mt-5">
          <h1 className="text-xl text-neutral-900 text-center mb-5">
            List of Wallets
          </h1>
          {wallets.length === 0 && (
            <div className="min-h-full flex flex-col justify-center">
              <p className="text-neutral-400 text-sm text-center">
                You don't have any wallets yet.
              </p>
            </div>
          )}
          {wallets.map((wallet, index) => (
            <div
              className="flex items-center justify-between bg-white px-5 py-5 rounded-xl shadow-lg my-2 hover:bg-gray-100"
              key={index}
            >
              <div className="flex items-center container mx-auto justify-around ">
                <div className="font-semibold text-green-700">
                  Wallet:{" "}
                  <span className="font-normal text-black">
                    {wallet.description}
                  </span>
                </div>
                <div className="font-semibold text-green-700">
                  Balance:{" "}
                  <span className="font-normal text-black">
                    {wallet.balance}
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <Button
                  type="button"
                  label="Edit"
                  size="small"
                  onClick={() => handleEdit(wallet)}
                />
                <Button
                  type="button"
                  label="Delete"
                  color="danger"
                  size="small"
                  onClick={() => handleDelete(wallet._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WalletsPage;
