const ErrorIcon = ({ className }: { className?: string }) => (
  <svg height="24" width="24" viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33 3a2 2 0 012 2v2h5a2 2 0 012 2v34a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2h5V5a2 2 0 012-2h18zm-20 8h-3v30h28V11h-3v2a2 2 0 01-2 2H15a2 2 0 01-2-2v-2zm7.121 10.293L24 25.172l3.879-3.88a1 1 0 011.414 0l1.414 1.415a1 1 0 010 1.414L26.828 28l3.88 3.879a1 1 0 010 1.414l-1.415 1.414a1 1 0 01-1.414 0L24 30.828l-3.879 3.88a1 1 0 01-1.414 0l-1.414-1.415a1 1 0 010-1.414L21.172 28l-3.88-3.879a1 1 0 010-1.414l1.415-1.414a1 1 0 011.414 0zM31 7H17v4h14V7z"
      fill="currentColor"
    />
  </svg>
);

export default ErrorIcon;
