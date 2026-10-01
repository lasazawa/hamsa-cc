import type {
  ButtonHTMLAttributes,
  ChangeEventHandler,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react'
import { Button } from '../Button/Button'
import { Icon, type IconName } from '../Icon/Icon'
import { IconButton } from '../IconButton/IconButton'
import defaultAvatar from './assets/avatar.png'
import './LogoBar.css'

export type LogoBarLogoName = 'hamsa' | 'jpm'
export type LogoBarUserVariant = 'filled' | 'outline'
export type LogoBarUserLeading = 'avatar' | 'icon' | 'wallet'

export interface LogoBarIconAction {
  id: string
  label: string
  iconName: IconName
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

export interface LogoBarProps extends HTMLAttributes<HTMLElement> {
  /**
   * Built-in wordmark. Ignored when `logo` is provided.
   * @default 'hamsa'
   */
  logoName?: LogoBarLogoName
  /** Custom brand mark. Overrides `logoName` when set. */
  logo?: ReactNode
  /** Optional secondary brand (e.g. partner lockup). */
  secondaryLogo?: ReactNode
  /** Uppercase product label after the logo divider. */
  productTitle?: string
  /**
   * Optional icon before the product label.
   * Defaults to `subaccounting`. Pass `null` to hide.
   */
  productIconName?: IconName | null
  /**
   * Section the user has navigated to (rendered to the right of product).
   * Preferred over the legacy `pageName` alias.
   */
  section?: string
  /** @deprecated Prefer `section`. */
  pageName?: string
  /** Extra content in the left brand row (module chips, etc.). */
  brandExtras?: ReactNode

  showSearch?: boolean
  searchPlaceholder?: string
  searchValue?: string
  defaultSearchValue?: string
  onSearchChange?: ChangeEventHandler<HTMLInputElement>
  onSearchClear?: () => void
  searchInputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'placeholder'
  >

  /** Utility icon buttons (language, notifications, settings, …). */
  iconActions?: LogoBarIconAction[]

  showUser?: boolean
  userName?: string
  userVariant?: LogoBarUserVariant
  userLeading?: LogoBarUserLeading
  userAvatarSrc?: string
  onUserClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']

  showActions?: boolean
  actionsLabel?: string
  actionsIconRightName?: IconName
  onActionsClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']

  /** Gradient AI circle control. */
  showAi?: boolean
  onAiClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  aiDisabled?: boolean

  /** Green split search + AI filter control (JPM). */
  showAiFilter?: boolean
  onAiFilterSearchClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  onAiFilterAiClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

function LogoBarSearch({
  placeholder,
  value,
  defaultValue,
  onChange,
  onClear,
  inputProps,
}: {
  placeholder: string
  value?: string
  defaultValue?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onClear?: () => void
  inputProps?: LogoBarProps['searchInputProps']
}) {
  const hasValue = (value ?? defaultValue ?? '') !== ''
  const showClear = hasValue || value !== undefined

  return (
    <label className="logo-bar__search">
      <span className="logo-bar__search-icon" aria-hidden="true">
        <Icon name="search" size={16} />
      </span>
      <input
        className="logo-bar__search-input"
        type="search"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        {...inputProps}
      />
      {showClear && (
        <button
          type="button"
          className="logo-bar__search-clear"
          aria-label="Clear search"
          tabIndex={hasValue ? 0 : -1}
          disabled={!hasValue}
          onClick={onClear}
        >
          <Icon name="circle-x-solid" size={16} />
        </button>
      )}
    </label>
  )
}

function LogoBarUser({
  name,
  variant,
  leading,
  avatarSrc,
  onClick,
}: {
  name: string
  variant: LogoBarUserVariant
  leading: LogoBarUserLeading
  avatarSrc: string
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}) {
  return (
    <button
      type="button"
      className={[
        'logo-bar__user',
        `logo-bar__user--${variant}`,
        `logo-bar__user--${leading}`,
      ].join(' ')}
      onClick={onClick}
    >
      {leading === 'avatar' && (
        <span className="logo-bar__user-avatar">
          <img src={avatarSrc} alt="" width={26} height={26} />
        </span>
      )}
      {leading === 'icon' && (
        <span className="logo-bar__user-glyph" aria-hidden="true">
          <Icon name="human" size={18} />
        </span>
      )}
      {leading === 'wallet' && (
        <span className="logo-bar__user-wallet" aria-hidden="true">
          <Icon name="wallet" size={14} />
        </span>
      )}
      <span className="logo-bar__user-name">{name}</span>
    </button>
  )
}

function LogoBarAiButton({
  onClick,
  disabled,
}: {
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  disabled?: boolean
}) {
  return (
    <IconButton
      className="logo-bar__ai"
      aria-label="AI"
      iconName="icon-ai"
      color="primary"
      variant="solid"
      size="md"
      disabled={disabled}
      onClick={onClick}
    />
  )
}

function LogoBarAiFilter({
  onSearchClick,
  onAiClick,
}: {
  onSearchClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  onAiClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}) {
  return (
    <div className="logo-bar__ai-filter" role="group" aria-label="Search and AI">
      <button
        type="button"
        className="logo-bar__ai-filter-btn"
        aria-label="Search"
        onClick={onSearchClick}
      >
        <Icon name="search" size={18} />
      </button>
      <span className="logo-bar__ai-filter-divider" aria-hidden="true" />
      <button
        type="button"
        className="logo-bar__ai-filter-btn"
        aria-label="AI"
        onClick={onAiClick}
      >
        <Icon name="icon-ai" size={18} />
      </button>
    </div>
  )
}

export function LogoBar({
  logoName = 'hamsa',
  logo,
  secondaryLogo,
  productTitle,
  productIconName = 'subaccounting',
  section,
  pageName,
  brandExtras,
  showSearch = true,
  searchPlaceholder = 'Search',
  searchValue,
  defaultSearchValue,
  onSearchChange,
  onSearchClear,
  searchInputProps,
  iconActions = [],
  showUser = true,
  userName = 'Elizabeth',
  userVariant = 'filled',
  userLeading = 'avatar',
  userAvatarSrc = defaultAvatar,
  onUserClick,
  showActions = false,
  actionsLabel = 'Create',
  actionsIconRightName,
  onActionsClick,
  showAi = false,
  onAiClick,
  aiDisabled = false,
  showAiFilter = false,
  onAiFilterSearchClick,
  onAiFilterAiClick,
  className,
  ...rest
}: LogoBarProps) {
  const brandLogo =
    logo ?? (logoName === 'jpm' ? <LogoBarJpmMark /> : <LogoBarHamsaMark />)

  const sectionLabel = section ?? pageName

  const classes = ['logo-bar', className ?? ''].filter(Boolean).join(' ')

  const showActionsCluster = showActions || showAi || showAiFilter

  return (
    <header className={classes} {...rest}>
      <div className="logo-bar__brand">
        <div className="logo-bar__logos">
          {brandLogo}
          {secondaryLogo}
        </div>
        {productTitle && (
          <>
            <span className="logo-bar__divider" aria-hidden="true" />
            <span className="logo-bar__product-group">
              {productIconName && (
                <Icon
                  className="logo-bar__product-icon"
                  name={productIconName}
                  size={20}
                />
              )}
              <span className="logo-bar__product">{productTitle}</span>
            </span>
          </>
        )}
        {sectionLabel && (
          <>
            <span className="logo-bar__divider" aria-hidden="true" />
            <span className="logo-bar__page">{sectionLabel}</span>
          </>
        )}
        {brandExtras}
      </div>

      <div className="logo-bar__actions">
        {showSearch && (
          <LogoBarSearch
            placeholder={searchPlaceholder}
            value={searchValue}
            defaultValue={defaultSearchValue}
            onChange={onSearchChange}
            onClear={onSearchClear}
            inputProps={searchInputProps}
          />
        )}

        {iconActions.map((action) => (
          <IconButton
            key={action.id}
            className="logo-bar__icon-btn"
            aria-label={action.label}
            iconName={action.iconName}
            color="neutral"
            variant="solid"
            size="lg"
            onClick={action.onClick}
          />
        ))}

        {showUser && (
          <LogoBarUser
            name={userName}
            variant={userVariant}
            leading={userLeading}
            avatarSrc={userAvatarSrc}
            onClick={onUserClick}
          />
        )}

        {showActionsCluster && (
          <div className="logo-bar__cta-cluster">
            {(showActions || showAi || showAiFilter) && (
              <span className="logo-bar__divider logo-bar__divider--tall" aria-hidden="true" />
            )}
            {showActions && (
              <Button
                color="primary"
                variant="solid"
                size="md"
                label={actionsLabel}
                iconRightName={actionsIconRightName}
                onClick={onActionsClick}
              />
            )}
            {showAi && <LogoBarAiButton onClick={onAiClick} disabled={aiDisabled} />}
            {showAiFilter && (
              <LogoBarAiFilter
                onSearchClick={onAiFilterSearchClick}
                onAiClick={onAiFilterAiClick}
              />
            )}
          </div>
        )}
      </div>
    </header>
  )
}

/** Themeable Hamsa horizontal wordmark (light/dark via `--logo-bar-logo`). */
export function LogoBarHamsaMark({
  className,
  title = 'Hamsa',
}: {
  className?: string
  title?: string
}) {
  return (
    <span
      className={['logo-bar__logo', 'logo-bar__logo--hamsa', className ?? '']
        .filter(Boolean)
        .join(' ')}
      role="img"
      aria-label={title}
    />
  )
}

/** Themeable J.P. Morgan wordmark (light/dark via `--logo-bar-logo`). */
export function LogoBarJpmMark({
  className,
  title = 'J.P. Morgan',
}: {
  className?: string
  title?: string
}) {
  return (
    <span
      className={['logo-bar__logo', 'logo-bar__logo--jpm', className ?? '']
        .filter(Boolean)
        .join(' ')}
      role="img"
      aria-label={title}
    />
  )
}
