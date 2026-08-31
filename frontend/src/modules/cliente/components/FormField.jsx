const FormField = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  showError = true,
  onBlur,
  inputMode,
  readOnly = false,
}) => {
  const shouldShowError = showError && !!error;

  return (
    <div>
      <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
        {label}
      </label>

      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        inputMode={inputMode}
        className={`w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A] transition-colors placeholder:text-[#A28776]/40 ${
          shouldShowError ? 'border-red-300' : 'border-[#E4C7B7]/40'
        }`}
      />

      {shouldShowError && (
        <p className="text-[11px] text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;