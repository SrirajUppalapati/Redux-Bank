import { useSelector } from "react-redux";
function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const balace = useSelector((state) => state.account.balance);

  return (
    <div className="balance">{formatCurrency(balace > 0 ? balace : 0)}</div>
  );
}

export default BalanceDisplay;
