import { useRouter } from 'next/router';
import Content from '../Content';
import Users from '@/pages/users';

const LayoutShell = () => {
  const router = useRouter();

  const dataLayout = [
    { path: '/', layout: 'home' },
    { path: '/users', layout: 'users' },
    { path: '/post/:id', layout: 'post' },
  ];

  const findLayout = dataLayout.find(
    (layout) => layout.path === router.pathname
  );

  if (findLayout) {
    switch (findLayout.layout) {
      case 'home':
        return <Content />;
      case 'users':
        return <Users />;
      default:
        return <Content />;
    }
  }

  return <Content />;
};

export default LayoutShell;
