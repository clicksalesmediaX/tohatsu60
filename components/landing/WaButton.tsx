import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

type WaButtonProps = {
  /** Prefilled WhatsApp message for this specific call-to-action. */
  message?: string;
  children: React.ReactNode;
  /** Maps to the existing .btn-wa / .btn-ghost / .btn-red styles. */
  variant?: "wa" | "ghost" | "red";
  className?: string;
};

export function WaButton({
  message,
  children,
  variant = "wa",
  className = "",
}: WaButtonProps) {
  return (
    <a
      className={`btn btn-${variant} ${className}`.trim()}
      href={waLink(message)}
      target="_blank"
      rel="noopener"
    >
      <WhatsAppIcon />
      {children}
    </a>
  );
}
