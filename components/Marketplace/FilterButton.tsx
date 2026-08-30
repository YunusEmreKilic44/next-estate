"use client";
import React from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Button from "../ui/Button";
import { useFilterModalStore } from "@/store/useFilterModalStore";

const FilterButton = () => {
  const { open } = useFilterModalStore();
  return (
    <Button
      variant="outline"
      icon={<HiOutlineAdjustmentsHorizontal size={20} />}
      onClick={open}
    >
      Filter
    </Button>
  );
};

export default FilterButton;
