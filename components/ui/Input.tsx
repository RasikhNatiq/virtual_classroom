type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, id, error, className = "", ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor={id}>
      {label}
      <input
        id={id}
        className={`h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 ${error ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100" : ""} ${className}`}
        {...props}
      />
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}