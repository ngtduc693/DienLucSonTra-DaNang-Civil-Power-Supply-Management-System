import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Tài khoản',
  //   group: true,
  // },
  // {
  //   title: 'Quản lý',
  //   icon: 'lock-outline',
  //   children: [
      // {
      //   title: 'Login',
      //   link: '/auth/login',
      // },
      // {
      //   title: 'Register',
      //   link: '/auth/register',
      // },
      // {
      //   title: 'Request Password',
      //   link: '/auth/request-password',
      // },
  //     {
  //       title: 'Thay đổi mật khẩu',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
  {
    title: 'Nghiệp vụ',
    group: true,
  },
  {
    title: 'Khách hàng',
    icon: 'grid-outline',
    children: [
      {
        title: 'Tìm kiếm',
        link: '/pages/timkiem/khachhang',
      }
    ],
   
   },
   {
    title: 'Cấp điện mới',
    icon: 'grid-outline',
    children: [
      {
        title: 'Lấy thông tin',
        link: '/pages/timkiem/thongtintrenmaychu',
      },
      {
        title: 'Danh mục',
        link: '/pages/timkiem/danhmuc',
      },
      {
        title: 'Báo cáo',
        link: '/pages/timkiem/baocao',
      },
      {
        title: 'Danh sách Đăng ký lắp đặt điện',
        link: '/pages/timkiem/danhsachdangkylapdatdien',
      },
    ],
   
   },
];
