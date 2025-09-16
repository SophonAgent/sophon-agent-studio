const UserIcon = ({ className }: { className?: string }) => (
  <svg height="24" width="24" viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 3c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10S18.477 3 24 3zm18 35c0-7.714-6.477-12-12-12H18c-5.523 0-12 4.292-12 12v6a2 2 0 002 2h32a2 2 0 002-2v-6zm-12-8c3.742 0 8 2.956 8 8v4H10v-4c0-5.188 4.34-8 8-8h12zM18 13a6 6 0 1112 0 6 6 0 01-12 0z"
      fill="currentColor"
    />
  </svg>
);

export default UserIcon;
