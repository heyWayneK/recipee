import React from "react";
import Table_Cell from "./Table_Cell";
import { formatWeight, getTextTranslation } from "@/lib/utils";
import { useRecipeData } from "@/contexts/UseRecipeData";
import MenuDynamicChildren from "./MenuPopupOnMouseOver";
import { useModalBig } from "@/hooks/UseBigModal";
import Link from "next/link";

interface Row_PlatingHeaderProps {
  viewPrices?: boolean;
}

const Row_PlatingHeader: React.FC<Row_PlatingHeaderProps> = ({ viewPrices = false }) => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();

  // COMPONENTS
  const name = getTextTranslation("components");

  // const dropDownInfo = [
  //   { name: "Option 1", handler: () => {} },
  //   { name: "Option 2", handler: () => {} },
  // ];
  const dropDownInfo = ["Option 1", "Option 2"];

  const { openModal } = useModalBig();

  const handleOpenModal = () => {
    openModal(
      <div>
        <h2 className="text-lg font-bold mb-4">Custom Modal Content</h2>
        <p>This is some variable content inside the modal.</p>
        <p>This is some variable content inside the modal.</p>
        <p>This is some variable content inside the modal.</p>
        <p>This is some variable content inside the modal.</p>
        <p>This is some variable content inside the modal.</p>
        <p>This is some variable content inside the modal.</p>
        <p>This is some variable content inside the modal.</p>
        <p>This is some variable content inside the modal.</p>
        <p>This is some variable content inside the modal.</p>
      </div>
    );
  };

  return (
    <>
      <Table_Cell firstCol={false} header={false} type="plating" iconName="category" key={name}>
        <span>
          <Link href="#" onClick={handleOpenModal}>
            {name.toUpperCase()}
          </Link>
        </span>
      </Table_Cell>
      {recipeData.portionSizes.map((portion, col) => (
        <MenuDynamicChildren key={portion} menuArray={dropDownInfo}>
          <Table_Cell firstCol={false} header={false} type="plating" key={name + "_" + col} edit="edit">
            <span>{formatWeight(portion)}</span>
          </Table_Cell>
        </MenuDynamicChildren>
      ))}
    </>
  );
};

export default Row_PlatingHeader;
