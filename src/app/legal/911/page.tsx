import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/constants";

// DRAFT for the owner's review.
export const metadata: Metadata = pageMetadata({
  title: "911 Notice",
  description: `Important information about calling 911 on ${COMPANY.name}'s internet-based phone service.`,
  path: "/legal/911",
  noindex: true,
});

export default function NineOneOnePage() {
  return (
    <LegalPage
      title="911 Notice"
      path="/legal/911"
      intro={
        <>
          <strong>Please read this carefully and share it with everyone who uses your phones.</strong> {COMPANY.name}{" "}
          phone service runs over the internet. Calling 911 works differently than on a traditional landline in some
          situations.
        </>
      }
    >
      <LegalSection title="Keep each phone's address up to date">
        <p>
          When you call 911, the emergency center receives the address registered for that phone line. If a phone is
          moved to a different address, building, floor or suite, contact us before using it there so we can update its
          registered location. If the address is wrong, help may be sent to the wrong place.
        </p>
      </LegalSection>

      <LegalSection title="When 911 may not work">
        <p>911 calls may not go through, or may be delayed, if:</p>
        <ul>
          <li>your internet connection is down or very slow;</li>
          <li>there is a power outage and your phones, router or network equipment have no backup power;</li>
          <li>your account is suspended or your phone is not set up correctly;</li>
          <li>the phone or app is used in a place where its registered address is not accurate.</li>
        </ul>
        <p>Consider keeping another way to call 911, such as a cell phone, available.</p>
      </LegalSection>

      <LegalSection title="Mobile and desktop apps">
        <p>
          When you use the ConnectUC app or a softphone on a laptop or cell phone, the location sent with a 911 call may
          not reflect where you actually are. On a cell phone, use your phone&apos;s regular dialer for 911 when you can.
        </p>
      </LegalSection>

      <LegalSection title="Dialing 911">
        <p>
          Dial 911 directly. You do not need to dial a prefix such as 9 first. Stay on the line and give the dispatcher
          your exact location.
        </p>
      </LegalSection>

      <LegalSection title="Questions or address changes">
        <p>
          Call <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a> or email{" "}
          <a href={COMPANY.emailHref}>{COMPANY.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
