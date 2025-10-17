import clsx from "clsx"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const Button = ({ className, children, ...props }: ButtonProps) => {
  const classes = clsx(
    // Base
    'relative isolate inline-flex items-center justify-center gap-x-2 rounded-none text-base/6 font-semibold',
    // Focus
    'focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
    // Disabled
    'data-[disabled]:opacity-50',
    // Cursor
    'cursor-pointer',
    // Transition
    'transition-all duration-100 ease-in-out',
    className,
  )

  return (
    <button className={classes} {...props}>
      <TouchTarget>{children}</TouchTarget>
    </button>
  )
}


/**
 * Expand the hit area to at least 44×44px on touch devices
 */
export function TouchTarget({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      />
      {children}
    </>
  )
}
