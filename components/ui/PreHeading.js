
const PreHeading = ({ children }) => {
  return (
    <div className="px-5 capitalize text-sm tracking-wide py-1.5 font-medium text-primary bg-white/20 border border-primary-light shadow-[inset_0_4px_16px] shadow-primary/25 rounded-[20px] font-satoshi">
      {children}
    </div>
  );
};

export default PreHeading;
