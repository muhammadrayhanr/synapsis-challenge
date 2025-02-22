import { useRouter } from 'next/router';
import ContentList from '@/components/organisms/ContentList';
import UserList from '@/components/organisms/UserList';
import { dataLayout } from '@/lib/mocks';
import Profile from '@/components/organisms/Profile';

const LayoutShell = () => {
  const router = useRouter();

  const findLayout = dataLayout.find(
    (layout) => layout.path === router.pathname
  );

  if (findLayout) {
    switch (findLayout.layout) {
      case 'home':
        return <ContentList />;
      case 'users':
        return <UserList />;
      case 'profile':
        return <Profile />;
      default:
        return <ContentList />;
    }
  }

  return <ContentList />;
};

export default LayoutShell;
