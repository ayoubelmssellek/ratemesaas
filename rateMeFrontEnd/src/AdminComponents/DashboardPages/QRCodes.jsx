// QRCodes.jsx
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Copy, QrCode, Scan } from "lucide-react";
import { useTranslation } from "react-i18next";

function QRCodes() {
  const user_id = localStorage.getItem("user_id") || "defaultUserId";
  const { t } = useTranslation();
  const [qrLink, setQrLink] = useState(`http://192.168.1.42:8081/review/${user_id}`);
  const qrRef = useRef();

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "business-qrcode.png";
    a.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrLink);
    alert(t("qrCode.linkCopied"));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 text-white">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-white/20 p-2 rounded-full">
              <QrCode className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-center">{t("qrCode.title")}</h1>
          <p className="text-blue-100 text-center text-xs mt-1">
            {t("qrCode.subtitle")}
          </p>
        </div>

        {/* QR Code Display */}
        <div className="p-6">
          <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-200 flex items-center justify-center">
            <div ref={qrRef} className="p-3 bg-white rounded-lg">
              <QRCodeCanvas
                value={qrLink}
                size={180}
                fgColor="#1f2937"
                bgColor="#ffffff"
                level="H"
                includeMargin
              />
            </div>
          </div>

          {/* Link Display */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{t("qrCode.copyLink")}</span>
              <button
                onClick={copyToClipboard}
                className="text-blue-600 hover:text-blue-700 text-xs flex items-center"
              >
                <Copy className="w-3 h-3 mr-1" />
                {t("qrCode.copyLink")}
              </button>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <p className="text-xs text-gray-600 truncate">{qrLink}</p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={downloadQRCode}
            className="w-full mt-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-200"
          >
            <Download className="w-4 h-4 mr-1" />
            {t("qrCode.download")}
          </button>
        </div>

        {/* Footer Tips */}
        <div className="bg-gray-50 p-3 border-t border-gray-200">
          <div className="flex items-center justify-center text-xs text-gray-600">
            <Scan className="w-3 h-3 mr-1" />
            <span>{t("qrCode.tipsDesc")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodes;
