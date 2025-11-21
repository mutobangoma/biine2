// src/components/OtpInput.jsx
import React from "react";

export default function OtpInput({ value, onChange, length = 6 }) {
  const boxes = [];

  for (let i = 0; i < length; i++) {
    boxes.push(
      <input
        key={i}
        maxLength={1}
        value={value[i] || ""}
        onChange={(e) => {
          const val = e.target.value.replace(/[^0-9]/g, "");
          if (!val) return;
          const newOtp = value.split("");
          newOtp[i] = val;
          onChange(newOtp.join(""));
          // auto-focus next
          const next = document.getElementById(`otp-${i + 1}`);
          if (next) next.focus();
        }}
        id={`otp-${i}`}
        className="w-12 h-12 text-xl border rounded-xl text-center"
      />
    );
  }

  return <div className="flex justify-center gap-3">{boxes}</div>;
}
