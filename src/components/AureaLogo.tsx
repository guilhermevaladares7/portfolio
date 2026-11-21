import { cn } from '../lib/cn'

const A_PATH = 'M380 671 L488 443 L525 443 L633 671 L594 671 L551 581 L506 613 L443 613 L417 671 Z M458 581 L551 581 L506 483 Z'

const LETTERS = [
  { d: A_PATH },
  {
    d: 'M652 443 H689 V572 C689 614 713 640 755 640 C797 640 821 614 821 572 V443 H858 V572 C858 637 816 675 755 675 C694 675 652 637 652 572 Z',
  },
  {
    d: 'M909 443 H1022 C1074 443 1104 469 1104 512 C1104 549 1082 570 1047 579 L1115 671 H1075 L1012 583 H946 V671 H909 Z M946 478 V583 L975 553 H1020 C1051 553 1067 539 1067 515 C1067 491 1051 478 1020 478 Z',
  },
  { d: 'M1156 443 H1333 V478 H1193 V540 H1312 V572 H1193 V636 H1340 L1325 671 H1156 Z' },
  { d: A_PATH, dx: 988 },
]

export function AureaLogo({ className, title = 'Aurea' }: { className?: string; title?: string }) {
  return (
    <svg viewBox="370 430 1260 250" role="img" aria-label={title} className={cn('block h-auto w-full fill-current', className)}>
      {LETTERS.map((l, i) => (
        <path key={i} d={l.d} fillRule="evenodd" transform={l.dx ? `translate(${l.dx} 0)` : undefined} />
      ))}
    </svg>
  )
}

export function AureaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="370 430 275 250" aria-hidden="true" className={cn('block h-auto fill-current', className)}>
      <path d={A_PATH} fillRule="evenodd" />
    </svg>
  )
}
