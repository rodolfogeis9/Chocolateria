import { ReactNode } from 'react';

interface Props {
  number: string;
  message: string;
  label?: string;
  icon?: ReactNode;
  variant?: 'solid' | 'outline';
}

const WhatsAppButton: React.FC<Props> = ({ number, message, label, icon, variant = 'solid' }) => {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const baseStyles =
    'inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition';
  const styles =
    variant === 'outline'
      ? `${baseStyles} border-2 border-green-600 text-green-700 hover:bg-green-50`
      : `${baseStyles} bg-green-600 text-white shadow-md hover:bg-green-700`;

  return (
    <a href={url} target="_blank" rel="noreferrer" className={styles}>
      {icon}
      {label && <span>{label}</span>}
    </a>
  );
};

export default WhatsAppButton;
