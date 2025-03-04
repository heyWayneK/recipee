import { Protect } from "@clerk/nextjs";

export default function ProtectPage() {
  return (
    <Protect permission="org:invoices:create" fallback={<p>You do not have the permissions to access Ingredient Management.</p>}>
      {/* {children} */}
    </Protect>
  );
}

// export default function ProtectPage() {
//     return (
//       <Protect
//         role="org:billing"
//         fallback={<p>Only a member of the Billing department can access this content.</p>}
//       >
//         {children}
//       </Protect>
//     )
//   }

// import type { PropsWithChildren } from 'react'
// import { Protect } from '@clerk/nextjs'

// export default function SettingsLayout(props: PropsWithChildren) {
//   return (
//     <Protect
//       condition={(has) => has({ role: 'org:admin' }) || has({ role: 'org:billing_manager' })}
//       fallback={<p>Only an Admin or Billing Manager can access this content.</p>}
//     >
//       {props.children}
//     </Protect>
//   )
// }
