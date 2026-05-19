type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

const styles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-400 text-white hover:bg-brand-500",
  secondary:
    "border border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-700",
  outline:
    "border border-brand-300 text-brand-400 hover:bg-brand-400 hover:text-white",
};

const base = "text-base px-7 py-2.5 rounded-full transition-colors inline-block";

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  type = "button",
}: ButtonProps) {
  const cls = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return <a href={href} className={cls}>{children}</a>;
  }

  return (
    <button type={type} className={cls}>
      {children}
    </button>
  );
}
