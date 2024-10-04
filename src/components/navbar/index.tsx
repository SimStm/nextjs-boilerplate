import {
  Center,
  Tooltip,
  UnstyledButton,
  Stack,
  rem,
  useMantineTheme,
  getGradient,
  Image,
  Loader,
  Group,
  Text
} from '@mantine/core'
import {
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconAd2,
  IconUser,
  IconUserCircle,
  IconLogout,
  IconList,
  IconUserPlus,
  IconSettings,
  IconUsers,
  IconUserStar,
  IconEdit
} from '@tabler/icons-react'
import classes from './navbar.module.css'
import { useRouter } from 'next/router'

import NextImage from 'next/image'

import ImageLogo from '@/assets/images/ReactLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { useDisclosure } from '@mantine/hooks'

import { IState } from '@/store'
import { first } from 'lodash'
import { setSignedIn } from '@/store/reducers/auth.reducer'

interface NavbarLinkProps {
  icon: typeof IconHome2
  label: string
  active?: boolean
  onClick?(e: any): void
  href?: string
  loading?: boolean
}

const NavbarLink = ({
  icon: Icon,
  label,
  active,
  onClick,
  href,
  loading = false
}: NavbarLinkProps) => {
  return (
    <a
      className={classes.link}
      data-active={active || undefined}
      href={href}
      key={label}
      onClick={onClick}
    >
      {loading && <Loader color={'white'} size={'sm'} speed={'0.75s'} />}
      {!loading && <Icon className={classes.linkIcon} stroke={1.5} />}
      <span>{label}</span>
    </a>
  )
}

const menuList = [
  // {
  //   icon: IconUser,
  //   label: 'Influencers',
  //   href: '/influencers',
  //   parent: '/influencers'
  // },
  {
    icon: IconUsers,
    label: 'Access Manager',
    href: '/users/manage',
    parent: '/users',
    role: 'owner'
  },
  {
    icon: IconEdit,
    label: 'My account',
    href: '/my-account',
    parent: '/my-account'
  }
]

export default function Navbar({ onClick }: any) {
  const { replace, push, pathname } = useRouter()
  const dispatch = useDispatch()
  const theme = useMantineTheme()

  const [isLogoutActive, logoutToggle] = useDisclosure()

  const onLogout = () => {
    logoutToggle.open()

    dispatch(setSignedIn(false))
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('feathers-jwt')
    }

    setTimeout(() => {
      replace('/login')
      logoutToggle.close()
    }, 1000)
  }

  const links = menuList.map((link) => {
    const isAuthorized = !link.role
    return (
      isAuthorized && (
        <NavbarLink
          {...link}
          key={link.label}
          active={
            link.href === pathname ||
            (link.parent && pathname.includes(link.parent) ? true : false)
          }
          onClick={onClick}
        />
      )
    )
  })

  return (
    <nav className={classes.navbar}>
      <Group className={classes.header}>
        <Image
          component={NextImage}
          src={ImageLogo}
          alt="BoilerplatePortal"
          fit="contain"
          h={'30px'}
          radius={'sm'}
          bg={'white'}
        />
        <Text size="24px">BoilerplatePortal</Text>
      </Group>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={10}>
          {links}
        </Stack>
      </div>

      <div className={classes.footer}>
        {/* <NavbarLink icon={IconSwitchHorizontal} label="Change account" /> */}
        {/* <NavbarLink
          icon={IconUserCircle}
          label="My Profile"
          href="/my-profile"
        /> */}
        <NavbarLink
          icon={IconLogout}
          label="Logout"
          onClick={onLogout}
          loading={isLogoutActive}
        />
      </div>
    </nav>
  )
}
