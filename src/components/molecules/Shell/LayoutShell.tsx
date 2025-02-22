import { useRouter } from 'next/router';
import ContentList from '@/components/organisms/ContentList';
import UserList from '@/components/organisms/UserList';
import { dataLayout } from '@/lib/mocks';

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
      default:
        return <ContentList />;
    }
  }

  return <ContentList />;
};

export default LayoutShell;
