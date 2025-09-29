const ToolIcon = ({ className }: { className?: string }) => (
  <svg height="24" width="24" viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 6.18V2.133c-.82.11-1.62.285-2.394.522C13.466 4.532 9 10.244 9 17c0 6.15 3.702 11.437 9 13.752V44a2 2 0 002 2h8a2 2 0 002-2V30.75c5.298-2.315 9-7.6 9-13.751 0-7.606-5.661-13.89-13-14.868V15h-4V6.18zM13 17c0-3.81 1.954-7.24 5-9.224v8.3C18 17.578 19.028 19 20.667 19h6.666C28.973 19 30 17.577 30 16.077V7.779c3.01 1.963 5 5.36 5 9.22 0 4.416-2.624 8.35-6.6 10.087L26 28.134V42H22V28.134l-2.398-1.048A11.002 11.002 0 0113 17z"
      fill="currentColor"
    />
  </svg>
);

export default ToolIcon;
