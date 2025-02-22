export const dataLayout = [
  { path: '/', layout: 'home' },
  { path: '/users', layout: 'users' },
  { path: '/profile', layout: 'profile' },
];

export const cardContentStyle: React.CSSProperties = {
  width: '100%',
  minWidth: 400,
  maxWidth: 600,
  border: '3px solid #f0f0f0',
};

export const cardUserStyle: React.CSSProperties = {
  width: '100%',
  minWidth: 260,
  maxWidth: '40%',
  border: '3px solid #f0f0f0',
};

export const menuStyle: React.CSSProperties = {
  width: 200,
  backgroundColor: '#F5F5F5',
  borderRight: '0',
};

export const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #f0f0f0',
  boxShadow: '0 2px #f0f0f0',
};

export const genderList = [
  [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ],
];

export const statusList = [
  [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ],
];
