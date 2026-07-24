import React from "react";

interface ProfileInfoItemProps {
  label: string;
  value: React.ReactNode;
}

const ProfileInfoItem = ({ label, value }: ProfileInfoItemProps) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wide text-[#0f1f1c]/50">
        {label}
      </span>
      <span className="text-sm font-medium text-[#0f1f1c]">{value ?? "—"}</span>
    </div>
  );
};

export default ProfileInfoItem;
