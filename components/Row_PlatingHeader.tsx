import React from "react";
import Table_Cell from "./Table_Cell";
import { formatWeight, getTextTranslation } from "@/libs/utils";
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

  // const dropDownInfo = ["Option 1", "Option 2"];
  const dropDownInfo = [
    { jsx: <div>Option 1 - 2</div>, handler: () => console.log("Option 1 clicked - 2") },
    { jsx: <div>Option 2 - 2</div>, handler: () => console.log("Option 2 clicked - 2") },
  ];

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
      <Table_Cell onClick={handleOpenModal} firstCol={false} header={false} type="plating" iconName="category" key={name}>
        <span>
          <Link href="#">{name.toUpperCase()}</Link>
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
