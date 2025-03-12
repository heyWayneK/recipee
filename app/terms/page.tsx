import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto  text-base-content">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6 ">Terms and Conditions for {config.appName}</h1>

        <pre className="leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "sans-serif" }}>
          {`1. Introduction

By using Recipee you confirm your acceptance of, and agree to be bound by, these terms and conditions.

2. Agreement to Terms and Conditions

This Agreement takes effect on the date on which you first use the Recipee software.

3. Unlimited Access Software License with Termination Rights

The Recipee Software License facilitates the acquisition of Recipee software through a single purchase, granting users unrestricted and perpetual access to its comprehensive functionalities. 

This license entails a straightforward and flexible arrangement, exempting users from recurring fees or subscriptions. However, it is important to acknowledge that the licensor retains the right to terminate the license without conditions or prerequisites. This termination provision enables the licensor to exercise control over software distribution and utilization.

Opting for the Recipee Software License enables users to enjoy the benefits of the software while recognizing the licensor's unrestricted termination rights, which provide adaptability and address potential unforeseen circumstances.

4. Refunds

Due to the nature of digital products, the Recipee boilerplate cannot be refunded or exchanged once access is granted.

5. Disclaimer

It is not warranted that Recipee will meet your requirements or that its operation will be uninterrupted or bug-free. All express and implied warranties or conditions not stated in this Agreement (including without limitation, loss of profits, loss or corruption of data, business interruption or loss of contracts), so far as such exclusion or disclaimer is permitted under the applicable law are excluded and expressly disclaimed. This Agreement does not affect your statutory rights.

6. Warranties and Limitation of Liability

Recipee does not give any warranty, guarantee or other term as to the quality, fitness for purpose or otherwise of the software. Recipee shall not be liable to you by reason of any representation (unless fraudulent), or any implied warranty, condition or other term, or any duty at common law, for any loss of profit or any indirect, special or consequential loss, damage, costs, expenses or other claims (whether caused by Recipee's negligence or the negligence of its servants or agents or otherwise) which arise out of or in connection with the provision of any goods or services by Recipee. Recipee shall not be liable or deemed to be in breach of contract by reason of any delay in performing, or failure to perform, any of its obligations if the delay or failure was due to any cause beyond its reasonable control. Notwithstanding contrary clauses in this Agreement, in the event that Recipee are deemed liable to you for breach of this Agreement, you agree that Recipee's liability is limited to the amount actually paid by you for your services or software, which amount calculated in reliance upon this clause. You hereby release Recipee from any and all obligations, liabilities and claims in excess of this limitation.

7. Responsibilities

Recipee is not responsible for what the user does with the user-generated content.

8. Price Adjustments

As we continue to improve Recipee and expand our offerings, the price may increase. The discount is provided to help customers secure the current price without being surprised by future increases.

9. General Terms and Law

This Agreement is governed by the laws of the United Kingdom. You acknowledge that no joint venture, partnership, employment, or agency relationship exists between you and Recipee as a result of your use of these services. You agree not to hold yourself out as a representative, agent or employee of Recipee. You agree that Recipee will not be liable by reason of any representation, act or omission to act by you.

Last updated: 20 August 2024.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
