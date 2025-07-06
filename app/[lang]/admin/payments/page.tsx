import React from "react";
import { getDictionary } from "../../dictionaries";
import { getPayments } from "@/backend/queries/payments/get-payments";
import { getPaymentsCount } from "@/backend/queries/payments/get-payments-count";
import { getPaymentsPrices } from "@/backend/queries/payments/get-payments-prices";
import PaymentsDashboard from "./_components/payments-dashboard";

async function PaymentsPage({
  searchParams,
  params,
}: {
  searchParams: Record<string, string | undefined>;
  params: any;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const currentPage = searchParams.page;
  const paymentsPerPage = 8;
  const payments = await getPayments(
    Number(currentPage || "1"),
    paymentsPerPage,
    searchParams
  );
  const totalPayments = await getPaymentsCount(searchParams);
  const prices = await getPaymentsPrices(searchParams);

  return (
    <div>
      <PaymentsDashboard
        currentPage={Number(currentPage || "1")}
        dict={dict}
        payments={payments}
        paymentsPerPage={paymentsPerPage}
        totalPayments={totalPayments}
        searchParams={searchParams}
        prices={prices.map((item) => item.price || "")}
      />
    </div>
  );
}

export default PaymentsPage;
