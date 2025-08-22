"use client";
import type { PropsWithChildren } from "react";
import { Protect, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import DottedBorder from "@/components/DottedBorder";
import TextEditable from "@/components/TextEditable";
import MenuOption1 from "@/components/MenuOption1";
import { getTextTranslation } from "@/utils/utils";
import MenuOption2 from "@/components/MenuOption2";
import Pill from "@/components/Pill";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import Table_Cell from "@/components/Table_Cell";
import SvgSprite from "@/components/SvgSprite";

// export default function ProtectPage() {
//   return (
//     <Protect permission="org:invoices:create" fallback={<p>You do not have the permissions to access Ingredient Management.</p>}>
//       {/* {children} */}
//     </Protect>
//   );
// }

// export default function ProtectPage() {
//   return (
//     <Protect role="org:billing" fallback={<p>Only a member of the Billing department can access this content.</p>}>
//       {children}
//     </Protect>
//   );
// }

let searchTimeout: any = null;

export default function SettingsLayout(props: PropsWithChildren) {
  const { recipeData } = useRecipeDataStore();

  return (
    <>
      <SignedOut>
        <div> Unprotected content</div>
      </SignedOut>
      <SignedIn>
        <DottedBorder
          className="grid grid-cols-1 gap-y-6 justify-items-center
        "
        >
          <div className="flex justify-stretch items-stretch  gap-5">
            <span className=" text-3xl ">Ingredient Hub </span>
            <Table_Cell className="text-1xl flex w-80 items-center" header={false} type="clear" key={"search"} iconName="search">
              search
            </Table_Cell>
          </div>

          <div className="flex justify-center gap-4 items-center">
            <Table_Cell className="text-1xl flex bg-primary-200" header={false} type="clear" key={"xxx"} iconName="visibility">
              carrot
            </Table_Cell>
            <Table_Cell className="text-1xl flex " header={false} type="clear" key={"xxx1"} iconName="">
              Result 1
            </Table_Cell>
            <Table_Cell className="text-1xl flex " header={false} type="clear" key={"xxx2"} iconName="">
              Result 1
            </Table_Cell>
            <Table_Cell className="text-1xl flex " header={false} type="clear" key={"xxx3"} iconName="">
              Result 1
            </Table_Cell>
            <Table_Cell className="text-1xl flex " header={false} type="clear" key={"xxx4"} iconName="">
              Result 1
            </Table_Cell>
          </div>

          <Table_Cell type="controls">
            <Pill tone="dark" iconName="add_circle">
              Add Ingredient
            </Pill>
          </Table_Cell>

          <div className="text-5xl font-medium flex">
            <span>Carrot</span> <SvgSprite iconName="lock" size={12} />
          </div>

          <div className="text-lg">Raw Medium-Large Carrot - Washed</div>
          <div>Alternative names: carotte, zanahoria Your Spelling: n\a</div>
          <div>
            <Protect condition={(has) => has({ role: "org:admin" })} fallback={<p>Admin Only</p>}>
              <Table_Cell type="admin" className="border-black">
                Ai Admin Confidence: 0.95 | T: 9.707 s | 16/12/25 11h33
              </Table_Cell>
              {props.children}
            </Protect>
          </div>

          <div>
            <div className="flex text-primary-content">
              <span>Carrots Contain Other Ingredients</span>
              <SvgSprite iconName="settings" size={20} className="fill-success" />
            </div>

            <div className="bg-success">None</div>
          </div>

          <div>Carrots Contain Other Ingredients none none none none </div>
          <div>Vegetables Primary Classification</div>
          <div>Root Vegetable Secondary Classification</div>
          <div>Religious Certification Halal Likely Kosher No </div>
          <div>Dietary Classification Vegan Vegetarian Animal Product</div>
          <div>Allergies None</div>
          <div></div>
        </DottedBorder>
      </SignedIn>
    </>
  );
}
