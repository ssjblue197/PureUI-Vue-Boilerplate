import sidebar from '@/configs/sidebar';
import MenuItem from '@/components/common/MenuItem';
import { useNavigate } from 'react-router-dom';
import { PIcon } from 'pure-uikit/dist/react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/features/auth/store';

interface ISidebarProps {
  onClose?: () => void;
}

export default function Sidebar(props: ISidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/sign-in');
  };
  return (
    <div
      className="relative flex h-full w-fit flex-col overflow-hidden bg-[#1e1e2d] !text-[#494b74] md:w-[264px]"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="flex w-full cursor-pointer select-none flex-row gap-3 bg-[#1A1A27] px-6 py-3"
        onClick={() => navigate('/')}
      >
        <img
          src="/logo.png"
          alt="logo"
          className="h-12 shadow-md"
        />
        <div className="flex flex-col">
          <span className="text-xl font-medium text-white">
            LETGOAI
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--p-color-primary-400)]">
            Affiliate center
          </span>
        </div>
      </div>
      <nav className="flex max-h-[calc(100vh-72px)] w-full flex-1 flex-col overflow-y-auto overflow-x-hidden pt-6">
        <ul role="list">
          {sidebar.map((i, index) => (
            <MenuItem
              key={index}
              data={i}
              closeSidebar={props.onClose}
            />
          ))}
        </ul>
      </nav>
      <div
        className="flex w-full cursor-pointer items-center justify-center gap-3 border-t border-slate-50/20 p-4 hover:opacity-80 active:bg-slate-50/20 active:opacity-80"
        onClick={() => {
          handleLogout();
        }}
      >
        <PIcon
          name="box-arrow-right"
          className="h-5 w-5 text-red-500"
        ></PIcon>
        <span className="text-sm text-white">
          {t('system.sign-out')}
        </span>
      </div>
    </div>
  );
}
