import React from "react";
import Table_Cell from "./Table_Cell";
import { formatWeight, getTextTranslation } from "@/libs/utils";
import { useRecipeData } from "@/contexts/useRecipeData";
import MenuDynamicChildren from "./MenuPopupOnMouseOver";
import { useModalBig } from "@/hooks/UseBigModal";
import Link from "next/link";

interface Row_PlatingHeaderProps {
  viewPrices?: boolean;
}

const Row_PlatingHeader: React.FC<Row_PlatingHeaderProps> = ({ viewPrices = false }) => {
  // INFO: Other useRecipeData vars: qty, setQty, recipeData, updateRecipeData
  const { recipeData } = useRecipeData();
  const { openModal } = useModalBig();

  // COMPONENTS
  const name = getTextTranslation("components");

  // TODO: fix this dropdown with real actions
  const dropDownInfo = [
    { jsx: <div>Option 1 - 2</div>, handler: () => console.log("Option 1 clicked - 2") },
    { jsx: <div>Option 2 - 2</div>, handler: () => console.log("Option 2 clicked - 2") },
  ];

  // POPUP MODAL
  const handleOpenModal = () => {
    openModal(
      <div>
        <h2 className="mb-4">Custom Modal Content</h2>
        <p>This is some variable content inside the modal.</p>
      </div>
    );
  };

  return (
    <>
      {/* COMPONENTS HEADING ROW */}
      <Table_Cell onClick={handleOpenModal} firstCol={false} header={false} type="plating" iconName="category" edit="edit" key={name}>
        <span>
          {/* FIRST COLUMN CELL */}
          <Link href="#">{getTextTranslation(name).toUpperCase()}</Link>
        </span>
      </Table_Cell>
      {recipeData.portionSizes.map((portion, col) => (
        <MenuDynamicChildren key={portion} menuArray={dropDownInfo}>
          {/* COMPONENT SIZE CELL/s */}
          <Table_Cell type="plating" key={name + "_" + col} edit="edit">
            <span>{formatWeight(portion)}</span>
          </Table_Cell>
        </MenuDynamicChildren>
      ))}
    </>
  );
};

export default Row_PlatingHeader;
