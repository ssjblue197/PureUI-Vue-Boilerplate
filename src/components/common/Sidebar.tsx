import sidebar from '@/configs/sidebar';
import MenuItem from '@/components/common/MenuItem';
import { useNavigate } from 'react-router-dom';
import { SlIcon } from '@shoelace-style/shoelace/dist/react';
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
  }
  return (
    <div
      className="flex flex-col w-fit md:w-[264px] relative h-full overflow-hidden bg-[#1e1e2d] !text-[#494b74]"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="w-full py-3 px-6 flex flex-row gap-3 bg-[#1A1A27] select-none cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img
          src="/logo.png"
          alt="logo"
          className="h-12 shadow-md"
        />
        <div className="flex flex-col">
          <span className="font-medium text-xl text-white">
            LETGOAI
          </span>
          <span className="text-xs font-medium text-[var(--sl-color-primary-400)] tracking-wide uppercase">
            Affiliate center
          </span>
        </div>
      </div>
      <nav className="flex flex-1 flex-col w-full max-h-[calc(100vh-72px)] overflow-y-auto overflow-x-hidden pt-6">
        <ul role="list">
          {sidebar.map((i, index) => (
            <MenuItem key={index} data={i} 
              closeSidebar={props.onClose}
            />
          ))}
        </ul>
      </nav>
      <div className="w-full flex justify-center items-center p-4 gap-3 hover:opacity-80 active:opacity-80 active:bg-slate-50/20 border-t border-slate-50/20 cursor-pointer"
        onClick={() => {
          handleLogout();
        }}
      >
        <SlIcon
          name="box-arrow-right"
          className="text-red-500 w-5 h-5"
        ></SlIcon>
        <span className='text-white text-sm'>{t('system.sign-out')}</span>
      </div>
    </div>
  );
}
