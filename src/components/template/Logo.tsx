import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import examhubLogo from '@/assets/svg/examhub-small.png'
import logobig from '@/assets/svg//examhub-biglogo.png'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
}

const Logo = (props: LogoProps) => {
    const {
        type = 'full',
        mode = 'light',
        className,
        imgClass,
        style,
        logoWidth = '1000px',
    } = props

    const logoSrc = type === 'streamline' ? examhubLogo : logobig
    const logoClass = type === 'streamline' ? 'logo-streamline' : 'logo-full'

    return (
        <div
            className={classNames('logo', className, logoClass)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            {type === 'streamline' && (
                <img
                    className={imgClass}
                    src={logoSrc}
                    alt={`${APP_NAME} logo`}
                    style={{ width: '100px' }}
                />
            )}
            {type === 'full' && (
                <img
                    className={imgClass}
                    src={logoSrc}
                    alt={`${APP_NAME} logo`}
                    style={{
                        width: '1000px',
                        marginLeft: '0px',
                        marginRight: '100px',
                    }}
                />
            )}
        </div>
    )
}

export default Logo
