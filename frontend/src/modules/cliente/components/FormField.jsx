const FormField = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A] transition-colors placeholder:text-[#A28776]/40"
      />
    </div>
  );
};

export default FormField;