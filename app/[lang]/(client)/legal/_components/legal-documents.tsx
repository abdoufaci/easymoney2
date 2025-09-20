"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Mail, MapPin, Globe } from "lucide-react";

export default function LegalDocuments() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold  mb-2">Easy Money University</h1>
          <p>Legal Documents & Policies</p>
        </div>

        {/* Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Terms and Conditions
            </CardTitle>
            <CardDescription>
              Effective Date: July 23, 2025 | Last Updated: July 23, 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none">
              {/* Terms and Conditions */}
              <div className="mb-12">
                <h1 className="text-3xl font-bold mb-6  border-b-2 border-slate-200 pb-2">
                  ✅ Terms and Conditions – Easy Money University
                </h1>

                <div className="mb-6 p-4 bg-slate-900 rounded-lg">
                  <p className="text-lg leading-relaxed">
                    These Terms and Conditions (&quot;Terms&quot;) govern your
                    access to and use of the Easy Money University website,
                    mobile application (App), and related services (together,
                    the &quot;Platform&quot;).
                  </p>
                  <p className="text-lg leading-relaxed mt-3">
                    By using any part of the Platform, including purchasing a
                    course or a follow-up plan, or accessing content, you agree
                    to be bound by these Terms.
                  </p>
                  <p className="text-lg leading-relaxed mt-3 font-semibold">
                    If you do not agree with these Terms, you must stop using
                    the Platform immediately.
                  </p>
                </div>

                <h2 className="text-2xl font-bold mb-4">
                  1. Platform Overview
                </h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Website:</strong> Accessible at
                    www.easy-money-university.com, it offers course listings,
                    plan purchases, identity verification, and support services.
                  </li>
                  <li>
                    <strong>App (Easy Money Follow-Up):</strong> Available only
                    to users who purchased a Follow-Up Plan. It provides daily
                    content and a private chat with the coach. It does not offer
                    course browsing, payment, or identity verification features.
                  </li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">
                  2. Eligibility & Registration
                </h2>
                <p className="mb-2">
                  <strong>2.1.</strong> You must be at least 18 years old to use
                  the Platform.
                </p>
                <p className="mb-2">
                  <strong>2.2.</strong> To register, you must provide accurate
                  personal information.
                </p>
                <p className="mb-2">
                  <strong>2.3.</strong> Website users must verify their identity
                  by uploading a valid, unexpired government-issued photo ID.
                </p>
                <p className="mb-4">
                  <strong>2.4.</strong> The App does not request or store any ID
                  or personal documentation.
                </p>

                <h2 className="text-2xl font-bold mb-4">
                  3. Access & Licensing
                </h2>
                <p className="mb-2">
                  <strong>3.1.</strong> Access to the Platform is personal,
                  non-transferable, and limited to the individual who completed
                  the registration and payment process.
                </p>
                <p className="mb-2">
                  <strong>3.2.</strong> Users receive login credentials after
                  purchasing a course or plan via the website.
                </p>
                <p className="mb-4">
                  <strong>3.3.</strong> You are granted a limited,
                  non-exclusive, revocable license to use the Platform for
                  personal educational purposes only.
                </p>

                <h2 className="text-2xl font-bold mb-4">
                  4. Follow-Up App Use
                </h2>
                <p className="mb-2">
                  <strong>4.1.</strong> The App is accessible only to users who
                  purchased a Follow-Up Plan on the official website.
                </p>
                <p className="mb-2">
                  <strong>4.2.</strong> The App provides:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>
                    A private Follow-Up channel with daily posts (voice notes,
                    videos, screenshots, PDFs).
                  </li>
                  <li>
                    A private chat with the coach (read-only for Follow-Up
                    posts; users can message via chat).
                  </li>
                </ul>
                <p className="mb-4">
                  <strong>4.3.</strong> The App does not include payment
                  processing, ID verification, or course browsing. These are
                  managed via the website.
                </p>

                <h2 className="text-2xl font-bold mb-4">
                  5. Payments & Access Activation
                </h2>
                <p className="mb-2">
                  <strong>5.1.</strong> All purchases must be made through the
                  website.
                </p>
                <p className="mb-2">
                  <strong>5.2.</strong> Accepted payments: cryptocurrency and
                  other methods arranged via support.
                </p>
                <p className="mb-2">
                  <strong>5.3.</strong> Course access is granted manually within
                  one (1) business day of payment confirmation.
                </p>
                <p className="mb-4">
                  <strong>5.4.</strong> Courses must be completed sequentially
                  (i.e., Course 2 requires Course 1 access).
                </p>

                <h2 className="text-2xl font-bold mb-4">6. Refund Policy</h2>
                <p className="mb-2">
                  <strong>6.1.</strong> All sales are final once access is
                  granted.
                </p>
                <p className="mb-2">
                  <strong>6.2.</strong> In rare cases of technical failure or
                  system error, we may issue a partial/full refund at our sole
                  discretion.
                </p>
                <p className="mb-4">
                  <strong>6.3.</strong> Refund requests must be submitted within
                  24 hours of access activation.
                </p>

                <h2 className="text-2xl font-bold mb-4">
                  7. User Conduct & Restrictions
                </h2>
                <p className="mb-2">
                  <strong>7.1.</strong> You may not:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Share your login credentials.</li>
                  <li>
                    Download, record, redistribute, or reproduce any content.
                  </li>
                  <li>Reverse-engineer the App or any Platform component.</li>
                  <li>Use the Platform for illegal purposes.</li>
                </ul>
                <p className="mb-4">
                  <strong>7.2.</strong> The App uses technical protections to
                  block screenshots and screen recording. Attempting to bypass
                  them is strictly prohibited.
                </p>

                <h2 className="text-2xl font-bold mb-4">
                  8. Content Ownership
                </h2>
                <p className="mb-2">
                  <strong>8.1.</strong> All Platform content (text, video,
                  voice, design, trademarks, layout) is the exclusive property
                  of Easy Money University.
                </p>
                <p className="mb-4">
                  <strong>8.2.</strong> You may not reuse, repost, or
                  redistribute any content without prior written permission.
                </p>

                <h2 className="text-2xl font-bold mb-4">
                  9. Account Suspension & Termination
                </h2>
                <p className="mb-2">
                  <strong>9.1.</strong> We reserve the right to suspend or
                  terminate your account without refund if:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>You breach any of these Terms.</li>
                  <li>You share your account or content.</li>
                  <li>You misuse the Platform in any way.</li>
                </ul>
                <p className="mb-4">
                  <strong>9.2.</strong> Upon termination, your license to use
                  the Platform ends immediately.
                </p>

                <h2 className="text-2xl font-bold mb-4">10. Disclaimers</h2>
                <p className="mb-2">
                  <strong>10.1. Educational Purposes Only:</strong> Content is
                  provided for knowledge-building. No investment or financial
                  returns are guaranteed.
                </p>
                <p className="mb-4">
                  <strong>10.2.</strong> The Platform is provided &quot;as
                  is,&quot; without warranties of any kind.
                </p>

                <h2 className="text-2xl font-bold mb-4">
                  11. Limitation of Liability
                </h2>
                <p className="mb-2">
                  <strong>11.1.</strong> We are not liable for indirect,
                  incidental, or consequential damages.
                </p>
                <p className="mb-4">
                  <strong>11.2.</strong> Our total liability is limited to the
                  fees you paid in the six (6) months preceding any claim.
                </p>

                <h2 className="text-2xl font-bold mb-4">12. Indemnification</h2>
                <p className="mb-4">
                  You agree to indemnify and hold Easy Money University harmless
                  against any claims arising from your use of the Platform or
                  violation of these Terms.
                </p>

                <h2 className="text-2xl font-bold mb-4">13. Modifications</h2>
                <p className="mb-4">
                  We may update these Terms at any time. Continued use after
                  changes constitutes acceptance of the revised Terms. The
                  latest version will always reflect the &quot;Last
                  Updated&quot; date.
                </p>

                <h2 className="text-2xl font-bold mb-4">14. Governing Law</h2>
                <p className="mb-4">
                  These Terms are governed by the laws of Algeria. Any disputes
                  will be subject to the exclusive jurisdiction of the courts of
                  Algiers.
                </p>

                <h2 className="text-2xl font-bold mb-4">15. Contact</h2>
                <p className="mb-2">For questions, issues, or support:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>
                    <strong>Email:</strong> easymoneysupport@gmail.com
                  </li>
                  <li>
                    <strong>Website:</strong> www.easy-money-university.com
                  </li>
                  <li>
                    <strong>Support Page:</strong>{" "}
                    www.easy-money-university.com/support
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
