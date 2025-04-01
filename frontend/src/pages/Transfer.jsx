import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  BiRupee,
  BiUser,
  BiSolidBank,
  BiMobile,
  BiQr,
  BiHistory,
} from "react-icons/bi";
import { FiSend, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Scanner } from "@yudiel/react-qr-scanner";
import { TRANSACTION_API_ENDPOINT } from "@/utils/constant";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "@/redux/transactionSlice";
import { updateBalance } from "@/redux/authSlice";

const Transfer = () => {
  return (
    <>
      <Header />
      <TransferMain />
      <Footer />
    </>
  );
};

const TransferMain = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [transferMethod, setTransferMethod] = useState("contact");
  const [scanResult, setScanResult] = useState(null);
  const [formData, setFormData] = useState({
    contact: "",
    amount: 0,
    account_number: "",
    mode: "contact",
    note: "",
  });

  const handleSubmit = async () => {
    if (formData.mode === "contact") formData.account_number = "";
    else if (formData.mode === "bank") formData.contact = "";
    else {
      formData.account_number = scanResult[0].rawValue;
      formData.contact = "";
    }

    try {
      const res = await axios.post(
        `${TRANSACTION_API_ENDPOINT}/create`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      dispatch(addTransaction(res.data.transaction));
      toast.success("Transaction completed");
    } catch (error) {
      console.warn(error);
      toast.error("Transacion failed");
    }
  };

  const recentRecipients = [
    { id: 1, name: "John Doe", contactId: "johndoe@okbank", image: null },
    { id: 2, name: "Sarah Smith", contactId: "sarah@okbank", image: null },
    { id: 3, name: "Alex Johnson", contactId: "alex@okbank", image: null },
    { id: 4, name: "Priya Sharma", contactId: "priya@okbank", image: null },
  ];

  const quickAmounts = [500, 1000, 2000, 5000, 10000, 50000];

  // Handle form data changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setTransferMethod(method);
    setFormData((prevState) => ({
      ...prevState,
      mode: method,
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#000428] to-[#004e92] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white">Transfer Money</h1>
          <p className="text-gray-300">
            Send money to friends, family, or businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Transfer Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Transfer Methods */}
            <div className="rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Transfer Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  className={`p-3 h-auto flex flex-col items-center gap-2 ${
                    transferMethod === "contact"
                      ? "bg-white/20"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                  onClick={() => handlePaymentMethodChange("contact")}
                >
                  <BiMobile className="h-6 w-6" />
                  <span className="text-sm">UPI</span>
                </Button>
                <Button
                  className={`p-3 h-auto flex flex-col items-center gap-2 ${
                    transferMethod === "bank"
                      ? "bg-white/20"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                  onClick={() => handlePaymentMethodChange("bank")}
                >
                  <BiSolidBank className="h-6 w-6" />
                  <span className="text-sm">Bank</span>
                </Button>

                <Button
                  className={`p-3 h-auto flex flex-col items-center gap-2 ${
                    transferMethod === "qr"
                      ? "bg-white/20"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                  onClick={() => handlePaymentMethodChange("qr")}
                >
                  <BiQr className="h-6 w-6" />
                  <span className="text-sm">Scan QR</span>
                </Button>
              </div>
            </div>

            {/* Transfer Details */}
            <div className="rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Transfer Details
              </h2>

              {transferMethod === "contact" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-200"
                      htmlFor="contact"
                    >
                      UPI ID / Mobile Number
                    </label>
                    <div className="relative">
                      <BiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        className="w-full pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                        id="contact"
                        placeholder="Enter UPI ID or mobile number"
                        value={formData.contact}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {transferMethod === "bank" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-200"
                      htmlFor="account_number"
                    >
                      Account Number
                    </label>
                    <Input
                      className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      id="account_number"
                      placeholder="Enter account number"
                      value={formData.account_number}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              {transferMethod === "qr" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-200">
                    Scan Payee QR
                  </h3>
                  {/* QR SCANNER */}
                  {!scanResult ? (
                    <div className="QR-Scanner size-40">
                      <Scanner
                        classNames=""
                        onScan={(result) => {
                          console.log(result[0].rawValue);
                          setScanResult(result);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2 w-full">
                      <label
                        className="text-sm font-medium text-gray-200"
                        htmlFor="account_number"
                      >
                        Account Number
                      </label>
                      <div className="relative">
                        <BiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="account_number"
                          className="w-full pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                          value={scanResult[0].rawValue}
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-200"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <div className="relative">
                  <BiRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    className="w-full pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    id="amount"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      className="border-white/10 text-black hover:bg-gray-200"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, amount }))
                      }
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-200"
                  htmlFor="note"
                >
                  Note (Optional)
                </label>
                <Textarea
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  id="note"
                  placeholder="Add a note"
                  rows={2}
                  value={formData.note}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Transfer Button */}
            <Button
              className="w-full py-6 text-lg bg-white/10 hover:bg-white/20 text-white gap-2"
              onClick={handleSubmit}
            >
              <FiSend className="h-5 w-5" />
              Transfer Money
            </Button>
          </div>

          {/* Right Column - Recent Recipients & Info */}
          <div className="space-y-6">
            {/* Recent Recipients */}
            <div className="rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Recent</h2>
                <Button
                  variant="ghost"
                  className="text-sm text-gray-300 hover:text-white p-1 h-auto"
                >
                  <BiHistory className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {recentRecipients.map((recipient) => (
                  <div
                    key={recipient.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <BiUser className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {recipient.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {recipient.contactId}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Info */}
            <div className="rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Transfer Info
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FiClock className="h-5 w-5 text-blue-400 mt-0.5" />
                  <p className="text-sm text-gray-300">
                    UPI transfers are processed instantly. Bank transfers may
                    take up to 24 hours.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <p className="text-sm text-gray-300">
                    No fees for UPI transfers. Bank transfers may incur charges.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FiAlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  <p className="text-sm text-gray-300">
                    Double-check recipient information to avoid errors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Transfer;
